module Component.Rewriter
    exposing
        ( RewriteCompletionStatus(..)
        , Config
        , Model
        , Msg
        , initModel
        , update
        , rewrite
        )

import Set exposing (Set)
import Task exposing (Task)
import Regex exposing (..)
import StringUtils exposing (..)
import AppUtils exposing (..)
import Node.Error as Node exposing (Error(..))
import Node.FileSystem as FileSystem
import Node.Encoding as Encoding exposing (Encoding(..))
import Utils.Ops exposing (..)
import Utils.Regex exposing (..)
import Utils.Match exposing (..)
import Common exposing (..)
import Package exposing (..)
import Output exposing (..)
import Console exposing (..)
import Glob


type RewriteCompletionStatus
    = RewriteSuccess
    | RewriteFailed


type alias Config msg =
    { linkedRepos : Set PackageName
    , testing : Bool
    , routeToMe : Msg -> msg
    , operationComplete : Int -> RewriteCompletionStatus -> msg
    , cwd : String
    , pathSep : String
    }


type alias Model =
    { rewriteCountDown : Int
    , rewriteCount : Int
    }


pathJoin : Config msg -> List String -> String
pathJoin config pathParts =
    AppUtils.pathJoin config.pathSep config.cwd pathParts


initModel : Config msg -> Model
initModel config =
    { rewriteCountDown = 0
    , rewriteCount = 0
    }


operationError : Model -> Task Never String -> ( ( Model, Cmd Msg ), List msg )
operationError model task =
    ( model ! [ Task.perform (\_ -> OperationComplete model.rewriteCount RewriteFailed) task ], [] )


operationSuccessful : Model -> Task Never String -> ( ( Model, Cmd Msg ), List msg )
operationSuccessful model task =
    ( model ! [ Task.perform (\_ -> OperationComplete model.rewriteCount RewriteSuccess) task ], [] )


endOfLine : String
endOfLine =
    "†"


linkedRepoRewriteError : Config msg -> PackageName -> List PackageName -> String
linkedRepoRewriteError config packageName packagesConflicts =
    "\n\nUnable to rewrite code for a Linked Repo. The following npm libraries are in conflict:\n\t"
        ++ (String.join "\n\t" packagesConflicts)
        ++ "\n\nResolve these conflicts by changing '"
        ++ packageName
        ++ "' to use a version that's compatible with the versions used by other Elm packages that your program is dependent on."
        ++ ("\n\nOr you can change the other packages to match the version that '" ++ packageName ++ "' is using.")
        ++ ("\n\nFor each conflicting library, compare the version that's in your program's node_modules directory with the version used by '"
                ++ packageName
                ++ "' which is located at:"
                +-+ pathJoin config [ "node_modules", "@" ++ (replaceAll "/" config.pathSep packageName), "node_modules" ]
           )
        ++ ("\n\nOr you can NOT link to '" ++ packageName ++ "' by simply removing the link option when running grove.\n\n")


rewriteContents : Config msg -> String -> PackageName -> List ( PackageName, String ) -> Result String ( Bool, String )
rewriteContents config contents packageName conflictLibs =
    (conflictLibs == [])
        ?! ( always <| Ok ( False, contents )
           , \_ ->
                conflictLibs
                    |> List.filterMap
                        (\( conflictPackageName, conflictLib ) ->
                            (conflictPackageName == packageName) ? ( Just conflictLib, Nothing )
                        )
                    |> (\packagesConflicts ->
                            packagesConflicts
                                |> String.join "|"
                                |> (++) "(?:"
                                |> flip (++) ")"
                                |> (\conflicLibsRegex ->
                                        (contents
                                            |> replaceAll "\n" endOfLine
                                            |> (\oldContents ->
                                                    oldContents
                                                        |> Regex.replace All
                                                            (regex ("(require\\s*" ++ endOfLine ++ "*)\\(['\"](" ++ conflicLibsRegex ++ ")['\"]\\)([\\.\t ;" ++ endOfLine ++ "])"))
                                                            (parametricReplacer ("$1('./node_modules/@" ++ packageName ++ "/node_modules/$2')$3"))
                                                        |> (\newContents ->
                                                                (oldContents /= newContents && Set.member packageName config.linkedRepos)
                                                                    ? ( Err <| linkedRepoRewriteError config packageName packagesConflicts
                                                                      , Ok ( oldContents /= newContents, newContents )
                                                                      )
                                                           )
                                               )
                                        )
                                            |??->
                                                ( Err
                                                , (\( changesOccurred, newContents ) ->
                                                    Ok ( changesOccurred, replaceAll endOfLine "\n" newContents )
                                                  )
                                                )
                                   )
                       )
           )


getPackageAndPath : Config msg -> Path -> ( PackageName, Path )
getPackageAndPath config path =
    (path
        |> find (AtMost 1)
            (regex
                ("^"
                    ++ pathJoin config
                        [ elmPackagesRoot config.testing config.pathSep
                        , "([a-zA-Z0-9\\-]+/[a-zA-Z0-9\\-]+)/\\d+\\.\\d+\\.\\d+/(.+\\.js$)"
                        ]
                    |> ((config.pathSep == "\\") ? ( replaceAll "/" "\\", identity ))
                )
            )
        |> List.head
    )
        |?!->
            ( bugMissing "match"
            , getSubmatches2
            )


type Msg
    = OperationComplete Int RewriteCompletionStatus
    | FilesToRewriteFound (List PackageName) (Result Node.Error (List Path))
    | ConflictLibsFound (List Path) (Result Node.Error (List String))
    | FileReadComplete Path (List ( PackageName, String )) (Result Node.Error String)
    | FileWrittenComplete Path (Result Node.Error Bool)


update : Config msg -> Msg -> Model -> ( ( Model, Cmd Msg ), List msg )
update config msg model =
    case msg of
        OperationComplete count status ->
            ( model ! [], [ config.operationComplete count status ] )

        FilesToRewriteFound _ (Err error) ->
            errorLog ("Unable to retrieve Native Code for rewriting Error:" +-+ (Node.message error))
                |> operationError model

        FilesToRewriteFound packages (Ok paths) ->
            ( model
                ! [ (Glob.find (conflictLibsPattern config packages) Nothing True)
                        |> Task.attempt (ConflictLibsFound paths)
                  ]
            , []
            )

        ConflictLibsFound _ (Err error) ->
            errorLog ("Unable to retrieve Conflict Libs for rewriting Error:" +-+ (Node.message error))
                |> operationError model

        ConflictLibsFound paths (Ok conflictLibPaths) ->
            conflictLibPaths
                |> List.map
                    (\path ->
                        (path
                            |> find All
                                (regex
                                    (("^" ++ config.cwd ++ "/node_modules/@(.+?)/node_modules/(.+?)$")
                                        |> ((config.pathSep == "\\") ? ( replaceAll "/" "\\", identity ))
                                    )
                                )
                            |> List.head
                        )
                            |?!->
                                ( bug "bad regex"
                                , getSubmatches2
                                )
                    )
                |> (\conflictLibs ->
                        paths
                            |> List.map
                                (\path ->
                                    FileSystem.readFileAsString path Encoding.Utf8
                                        |> Task.attempt (FileReadComplete path conflictLibs)
                                )
                            |> (\cmds ->
                                    (List.length paths)
                                        |> (\numFilesToRewrite ->
                                                (numFilesToRewrite == 0)
                                                    ? ( ( model ! [], [ config.operationComplete model.rewriteCount RewriteSuccess ] )
                                                      , ( { model | rewriteCountDown = numFilesToRewrite } ! cmds, [] )
                                                      )
                                           )
                               )
                   )

        FileReadComplete path _ (Err error) ->
            errorLog ("Unable to read file:" +-+ path +-+ " for rewriting Error:" +-+ (Node.message error))
                |> operationError model

        FileReadComplete path conflictLibs (Ok contents) ->
            getPackageAndPath config path
                |> (\( packageName, relativeFilePath ) ->
                        rewriteContents config contents packageName conflictLibs
                            |??->
                                ( Task.fail << flip Node.Error ""
                                , (\( changesOccurred, content ) ->
                                    changesOccurred
                                        ? ( Console.log ("Rewriting" +-+ colorize cyan (packageName +-+ parens relativeFilePath) ++ "")
                                                |> Task.mapError (\_ -> Node.Error "should never happen" "")
                                                |> Task.andThen (\_ -> writeFile path content)
                                                |> Task.andThen (\_ -> Task.succeed True)
                                          , Task.succeed False
                                          )
                                  )
                                )
                            |> Task.attempt (FileWrittenComplete path)
                            |> (\cmd -> ( model ! [ cmd ], [] ))
                   )

        FileWrittenComplete path (Err error) ->
            errorLog ("Unable to write file:" +-+ path +-+ "for rewriting Error:" +-+ (Node.message error))
                |> operationError model

        FileWrittenComplete _ (Ok changesOccurred) ->
            { model | rewriteCountDown = model.rewriteCountDown - 1, rewriteCount = model.rewriteCount + (changesOccurred ? ( 1, 0 )) }
                |> (\model ->
                        ( model ! []
                        , (model.rewriteCountDown == 0) ? ( [ config.operationComplete model.rewriteCount RewriteSuccess ], [] )
                        )
                   )


conflictLibsPattern : Config msg -> List PackageName -> String
conflictLibsPattern config packages =
    packages
        |> List.map (\packageName -> config.cwd ++ "/node_modules/@" ++ packageName ++ "/node_modules/*")
        |> String.join ","
        |> ((config.pathSep == "\\") ? ( replaceAll "/" "\\", identity ))
        |> (\s -> (List.length packages == 1) ? ( s, "{" ++ s ++ "}" ))


rewriteFilesPatern : Config msg -> List PackageName -> String
rewriteFilesPatern config packages =
    packages
        |> List.map (\packageName -> pathJoin config [ elmPackagesRoot config.testing config.pathSep, packageName, "**/*.js" ])
        |> String.join ","
        |> ((config.pathSep == "\\") ? ( replaceAll "/" "\\", identity ))
        |> (\s -> (List.length packages == 1) ? ( s, "{" ++ s ++ "}" ))


rewriteFilesIgnorePattern : Config msg -> String
rewriteFilesIgnorePattern config =
    [ "**/elm-stuff/**", "**/node_modules/**" ]
        |> List.map (\pattern -> pathJoin config [ elmPackagesRoot config.testing config.pathSep, pattern ])
        |> String.join ","
        |> ((config.pathSep == "\\") ? ( replaceAll "/" "\\", identity ))
        |> (\s -> "{" ++ s ++ "}")


rewrite : Config msg -> Model -> List PackageName -> ( Model, Cmd msg )
rewrite config model packages =
    model
        ! [ (Glob.find (rewriteFilesPatern config packages) (Just <| rewriteFilesIgnorePattern config) True)
                |> Task.attempt (config.routeToMe << FilesToRewriteFound packages)
          ]
