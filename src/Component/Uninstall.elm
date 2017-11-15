module Component.Uninstall
    exposing
        ( Config
        , Model
        , Msg
        , init
        , update
        , uninstall
        , installComplete
        )

import Set
import Task exposing (Task)
import Dict exposing (Dict)
import Json.Encode as JE
import Regex exposing (..)
import StringUtils exposing (..)
import AppUtils exposing (..)
import Output exposing (..)
import Node.Error as Node exposing (Error(..))
import Node.FileSystem as FileSystem
import Node.Encoding exposing (..)
import Node.ChildProcess exposing (..)
import Utils.Ops exposing (..)
import Utils.Task as Task exposing (..)
import Utils.Match exposing (..)
import Package exposing (..)
import ElmJson exposing (..)
import NpmJson exposing (..)
import Common exposing (..)
import Console exposing (..)


type alias Config msg =
    { testing : Bool
    , npmProduction : Bool
    , npmSilent : Bool
    , noRewrite : Bool
    , routeToMe : Msg msg -> msg
    , installMsg : msg
    , operationComplete : Int -> msg
    , cwd : String
    , pathSep : String
    , packages : Maybe (List PackageName)
    }


type alias Model =
    { elmNpmDependencies : Maybe NpmDependencies
    }


init : Config msg -> msg -> ( Model, Maybe (Cmd msg) )
init config initializedMsg =
    ( { elmNpmDependencies = Nothing
      }
    , Just <| Task.attempt (config.routeToMe << NpmPackageRead initializedMsg) <| FileSystem.readFileAsString npmJsonFilename Utf8
    )


pathJoin : Config msg -> List String -> String
pathJoin config pathParts =
    AppUtils.pathJoin config.pathSep config.cwd pathParts


operationError : Model -> Task Never String -> ( ( Model, Cmd (Msg msg) ), List msg )
operationError model task =
    ( model ! [ Task.perform (\_ -> ExitApp -1) task ], [] )


operationSuccessful : Model -> Task Never String -> ( ( Model, Cmd (Msg msg) ), List msg )
operationSuccessful model task =
    ( model ! [ Task.perform (\_ -> ExitApp 0) task ], [] )


type Step
    = DeletePackages
    | DeleteElmStuff


type Msg msg
    = OutputComplete String
    | ElmJsonFileRead Path (Result Node.Error String)
    | NpmPackageRead msg (Result Node.Error String)
    | PreInstallDone (Result ( Step, String ) ())
    | ExitApp Int
    | NpmUninstallComplete (Result String ())


update : Config msg -> Msg msg -> Model -> ( ( Model, Cmd (Msg msg) ), List msg )
update config msg model =
    case msg of
        OutputComplete _ ->
            ( model ! [], [] )

        ExitApp exitCode ->
            ( model ! [], [ config.operationComplete exitCode ] )

        NpmPackageRead initializedMsg (Err error) ->
            ( model ! [], [ initializedMsg ] )

        NpmPackageRead initializedMsg (Ok npmJsonStr) ->
            decodeNpmJsonDependencies npmJsonStr
                |??->
                    ( \error -> errorLog error |> operationError model
                    , \( npmDependencies, npmJsonStr ) ->
                        npmDependencies
                            |> Dict.filter (\key _ -> String.left 1 key == "@")
                            |> (\elmNpmDependencies -> ( { model | elmNpmDependencies = Just elmNpmDependencies } ! [], [ initializedMsg ] ))
                    )

        ElmJsonFileRead path (Err error) ->
            errorLog ("Unable to read:" +-+ elmJsonFilename +-+ "location:" +-+ path +-+ "Error:" +-+ error)
                |> operationError model

        ElmJsonFileRead path (Ok elmJsonStr) ->
            let
                -- CANNOT use pipes to define this function due to limitations of the compiler and type inference
                -- because it's being used on two different types of dictionaries which causes the type inference engine
                -- to infer that the anonymous function expects a dictionary of the first type which doesn't match the second type
                -- https://github.com/elm-lang/elm-compiler/issues/1590
                filterPackages packages packageName _ =
                    not (List.member packageName packages)
            in
                ((config.packages ?= [])
                    |> List.foldl
                        (\packageName ( packages, errors ) ->
                            (packageName
                                |> find (AtMost 1) (regex "([a-zA-Z0-9\\-]+/[a-zA-Z0-9\\-]+)(?:\\.git)?$")
                                |> List.head
                            )
                                |?!->
                                    ( always ( packages, ("Invalid package specification:" +-+ packageName) :: errors )
                                    , getSubmatches1
                                        >> (\repo -> ( repo :: packages, errors ))
                                    )
                        )
                        ( [], [] )
                )
                    |> (\( packages, errors ) ->
                            (errors /= [])
                                ? ( errors
                                        |> String.join "\n"
                                        |> errorLog
                                        |> operationError model
                                  , decodeElmJson path elmJsonStr
                                        |??>
                                            (\elmJson ->
                                                elmJson.dependencies
                                                    |> Dict.filter (filterPackages packages)
                                                    |> (\dependencies ->
                                                            elmJson.dependencySources
                                                                |?> Dict.filter (filterPackages packages)
                                                                |> (\dependencySources -> { elmJson | dependencies = dependencies, dependencySources = dependencySources })
                                                       )
                                                    |> (\elmJson ->
                                                            Task.attempt PreInstallDone <|
                                                                (Console.log ("Removing packages from Elm Package Json:" +-+ (String.join ", " packages) ++ "\n\n")
                                                                    |> Task.onError (bug "Cannot happen")
                                                                    |> Task.andThen
                                                                        (\_ ->
                                                                            (writeFile (pathJoin config [ config.cwd, config.testing ? ( "test", "" ), elmJsonFilename ]) <|
                                                                                JE.encode (determineJsonIndent elmJsonStr) <|
                                                                                    elmJsonEncoder elmJson
                                                                            )
                                                                                |> Task.mapError (\error -> ( DeletePackages, Node.message error ))
                                                                        )
                                                                    |> Task.andThen
                                                                        (\_ ->
                                                                            (FileSystem.remove <| pathJoin config [ elmStuff config.testing ])
                                                                                |> Task.mapError (\error -> ( DeleteElmStuff, Node.message error ))
                                                                        )
                                                                )
                                                       )
                                                    |> (\cmd -> ( model ! [ cmd ], [] ))
                                            )
                                        ??= (\error ->
                                                errorLog ("Unable to decode:" +-+ path +-+ "Error:" +-+ error)
                                                    |> operationError model
                                            )
                                  )
                       )

        PreInstallDone (Err ( step, error )) ->
            (case step of
                DeletePackages ->
                    errorLog ("Unable to write:" +-+ elmJsonFilename +-+ "Error:" +-+ error)

                DeleteElmStuff ->
                    errorLog ("Unable to delete:" +-+ pathJoin config [ elmPackagesRoot config.testing config.pathSep ] +-+ "Error:" +-+ error)
            )
                |> operationError model

        PreInstallDone (Ok ()) ->
            ( model ! [], [ config.installMsg ] )

        NpmUninstallComplete (Err error) ->
            errorLog ("Npm uninstall failed:" +-+ error)
                |> operationError model

        NpmUninstallComplete (Ok ()) ->
            Console.log "\n\n***** Npm Uninstall Complete *****"
                |> operationSuccessful model


uninstall : Config msg -> Model -> ( Model, Cmd msg )
uninstall config model =
    config.packages
        |?> (\_ -> model ! [ Task.attempt (config.routeToMe << ElmJsonFileRead config.cwd) <| FileSystem.readFileAsString elmJsonFilename Utf8 ])
        ?= (errorLog "Packages must be defined for uninstall operation"
                |> (\task -> (model ! [ Task.perform (config.routeToMe << (\_ -> ExitApp -1)) task ]))
           )


copyFile : String -> String -> Task Error (Dict String (Result Error ()))
copyFile old new =
    FileSystem.copy True new old


installComplete : Config msg -> Model -> List PackageName -> ( Model, Cmd msg )
installComplete config model installedElmNpmDependencies =
    model.elmNpmDependencies
        |?->
            ( warnLog ("Skipping Npm uninstall since" +-+ npmJsonFilename +-+ "does not exist")
                |> (\task -> model ! [ Task.perform (\_ -> config.routeToMe <| ExitApp 0) task ])
            , \elmNpmDependencies ->
                installedElmNpmDependencies
                    |> List.map ((++) "@")
                    |> Set.fromList
                    |> Set.diff (Set.fromList <| Dict.keys elmNpmDependencies)
                    |> Set.toList
                    |> (\installedElmNpmDependencies ->
                            ( pathJoin config [ npmJsonFilename ], pathJoin config [ "test", npmJsonFilename ], pathJoin config [ "SAVE" ++ npmJsonFilename ] )
                                |> (\( packageFilename, testPackageFilename, savePackageFilename ) ->
                                        (Console.log ("\n***** Npm Uninstall *****\n\nUninstalling packages:" +-+ (String.join ", " installedElmNpmDependencies) ++ "\n\n")
                                            |> Task.mapError (always "")
                                            |> Task.andThenIf config.testing
                                                ( \_ ->
                                                    FileSystem.remove savePackageFilename
                                                        |> Task.andThen (\_ -> copyFile packageFilename savePackageFilename)
                                                        |> Task.andThen (\_ -> FileSystem.rename testPackageFilename packageFilename)
                                                        |> Task.mapError Node.message
                                                , always <| Task.succeed ()
                                                )
                                            |> Task.andThen
                                                (\_ ->
                                                    spawn ("npm uninstall" +-+ (config.npmProduction ? ( "-production", "" )) +-+ (String.join " " installedElmNpmDependencies)) (spawnOutput config)
                                                        |> Task.mapError Node.message
                                                        |> Task.andThen (spawnSuccessCheck 0)
                                                )
                                            |> Task.andThenIf config.testing
                                                ( \_ ->
                                                    FileSystem.rename packageFilename testPackageFilename
                                                        |> Task.andThen (\_ -> FileSystem.rename savePackageFilename packageFilename)
                                                        |> Task.mapError Node.message
                                                , always <| Task.succeed ()
                                                )
                                        )
                                            |> (\task -> (model ! [ Task.attempt (config.routeToMe << NpmUninstallComplete) task ]))
                                   )
                       )
            )
