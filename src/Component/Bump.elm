module Component.Bump
    exposing
        ( Config
        , Model
        , Msg
        , init
        , update
        , bump
        )

import Process
import Time exposing (Time)
import Tuple exposing (..)
import Dict exposing (Dict)
import Task exposing (Task)
import Json.Decode as JD exposing (field)
import Json.Encode as JE exposing (..)
import StringUtils exposing (..)
import AppUtils exposing (..)
import Utils.Ops exposing (..)
import ElmJson exposing (..)
import NpmJson exposing (..)
import Node.Error as Node exposing (Error(..), Code(..))
import Node.FileSystem as FileSystem
import Node.Encoding as Encoding exposing (Encoding(..))
import Package exposing (..)
import Output exposing (..)
import Git exposing (..)
import Version exposing (..)
import Common exposing (..)
import Console exposing (..)


type alias Config msg =
    { testing : Bool
    , dryRun : Bool
    , major : Bool
    , minor : Bool
    , patch : Bool
    , allowUncommitted : Bool
    , allowOldDependencies : Bool
    , routeToMe : Msg msg -> msg
    , operationComplete : Int -> msg
    , elmVersion : Int
    , cwd : String
    , pathSep : String
    }


type alias Model =
    { exactDependencies : Dict PackageName VersionStr
    , elmJson : Maybe ElmJson
    , npmJsonStr : Maybe String
    , linkCheckCount : Int
    , linkedPackages : List PackageName
    , newVersionCheckCountDown : Int
    , newVersionCheckFailed : Bool
    , elmJsonIndent : Maybe Int
    }


pathJoin : Config msg -> List String -> String
pathJoin config pathParts =
    AppUtils.pathJoin config.pathSep config.cwd pathParts


decodeExactDependencies : Path -> String -> Result String (Dict PackageName VersionStr)
decodeExactDependencies path exactDependenciesJson =
    (JD.decodeString (JD.dict JD.string) exactDependenciesJson)
        |??> Ok
        ??= (\error -> Err ("Cannot decode JSON in" +-+ exactDependenciesFileName +-+ "location:" +-+ path +-+ "Error:" +-+ error))


type InitError
    = GettingTags Git.Error
    | ReadingExactDependencies Node.Error
    | ReadingElmPackage Node.Error
    | ReadingNpmPackage Node.Error


init : Config msg -> msg -> ( Model, Maybe (Cmd msg) )
init config initializedMsg =
    ( { exactDependencies = Dict.empty
      , elmJson = Nothing
      , npmJsonStr = Nothing
      , linkCheckCount = 0
      , linkedPackages = []
      , newVersionCheckCountDown = 0
      , newVersionCheckFailed = False
      , elmJsonIndent = Nothing
      }
    , Just <|
        Task.attempt (config.routeToMe << PackagesRead initializedMsg) <|
            (Git.getRepo config.cwd
                |> Task.andThen Git.getTags
                |> Task.mapError GettingTags
                |> Task.andThen
                    (\tags ->
                        FileSystem.readFileAsString (pathJoin config [ elmStuff config.testing, exactDependenciesFileName ]) Utf8
                            |> Task.mapError ReadingExactDependencies
                            |> Task.andThen
                                (\exactDependencies ->
                                    FileSystem.readFileAsString elmJsonFilename Utf8
                                        |> Task.mapError ReadingElmPackage
                                        |> Task.andThen (\elm -> Task.succeed ( elm, exactDependencies, tags ))
                                )
                    )
                |> Task.andThen
                    (\( elm, exactDependencies, tags ) ->
                        FileSystem.readFileAsString npmJsonFilename Utf8
                            |> Task.mapError ReadingNpmPackage
                            |> Task.andThen (\npm -> Task.succeed ( tags, exactDependencies, elm, Just npm ))
                            |> Task.onError
                                (\initError ->
                                    case initError of
                                        ReadingNpmPackage nodeError ->
                                            case nodeError of
                                                SystemError code _ ->
                                                    (code == NoSuchFileOrDirectory)
                                                        ? ( Task.succeed ( tags, exactDependencies, elm, Nothing )
                                                          , Task.fail initError
                                                          )

                                                _ ->
                                                    Task.fail initError

                                        _ ->
                                            (bug "Bad initError") <| (always Task.fail initError)
                                )
                    )
            )
    )


checkGitStatus : Config msg -> Model -> ( ( Model, Cmd (Msg msg) ), List msg )
checkGitStatus config model =
    ( model
        ! [ Git.getRepo config.cwd
                |> Task.andThen Git.getFileStatuses
                |> Task.attempt GitStatusCheckComplete
          ]
    , []
    )


checkForNewVersions : Config msg -> Model -> ( ( Model, Cmd (Msg msg) ), List msg )
checkForNewVersions config model =
    model.elmJson
        |?!->
            ( bugMissing "elmJson"
            , \elmJson ->
                elmJson.dependencies
                    |> Dict.keys
                    |> List.map
                        (\packageName ->
                            getRepoLocation elmJson.dependencySources packageName
                                |> (\repoLocation ->
                                        Git.clone repoLocation
                                            |> Task.andThen
                                                (\repo ->
                                                    Git.getTags repo
                                                        |> Task.andThen (\tags -> Task.succeed ( repoLocation, repo, tags ))
                                                )
                                   )
                                |> Task.andThen
                                    (\( repoLocation, repo, tags ) ->
                                        (sortedVersions tags |> List.head)
                                            |?->
                                                ( Err ("no valid versions in repo:" +-+ packageName +-+ parens repoLocation)
                                                , \latestVersion ->
                                                    Dict.get packageName model.exactDependencies
                                                        |?!->
                                                            ( bugMissing ("package:" +-+ packageName +-+ "in exactDependencies")
                                                            , \versionStr ->
                                                                versionFromString versionStr
                                                                    |?->
                                                                        ( Err ("invalid version in exactDependencies for:" +-+ packageName +-+ parens versionStr)
                                                                        , \version -> Ok ((latestVersion /= version) ? ( Just ( versionToString latestVersion, packageName ), Nothing ))
                                                                        )
                                                            )
                                                )
                                            |> Task.succeed
                                    )
                                |> Task.attempt GitNewerVersionCheckComplete
                        )
            )
        |> (\cmds -> ( { model | newVersionCheckCountDown = List.length cmds } ! cmds, [] ))


doBump : Config msg -> Model -> ( Model, Cmd (Msg msg) )
doBump config model =
    -- Modify elmJson file
    model.elmJson
        |?!->
            ( bugMissing "elmJson"
            , \elmJson ->
                versionFromString elmJson.version
                    |?!->
                        ( bug ("bad version in elmJson:" +-+ elmJson.version)
                        , \oldVersion ->
                            ([ ( config.major, nextMajor oldVersion )
                             , ( config.minor, nextMinor oldVersion )
                             , ( config.patch, nextPatch oldVersion )
                             ]
                                |> List.filter first
                                |> List.map second
                                |> List.head
                            )
                                |?!->
                                    ( bug "major/minor/patch are all False"
                                    , \newVersion ->
                                        { elmJson | version = versionToString newVersion }
                                            |> elmJsonEncoder
                                            |> JE.encode (model.elmJsonIndent ?!= bugMissing "elmJsonIndent")
                                            |> writeFile (pathJoin config [ config.cwd, config.testing ? ( "test", "" ), elmJsonFilename ])
                                            |> (,,) newVersion (BumpComplete oldVersion newVersion)
                                    )
                        )
            )
        -- Modify npmJson file (IFF it exists)
        |> (\( newVersion, msg, bumpTask ) ->
                bumpTask
                    |> Task.andThen
                        (\_ ->
                            model.npmJsonStr
                                |?->
                                    ( Task.succeed ()
                                    , \npmJsonStr ->
                                        npmJsonStr
                                            |> flip replaceVersion (versionToString newVersion)
                                            |> writeFile (pathJoin config [ config.cwd, config.testing ? ( "test", "" ), npmJsonFilename ])
                                    )
                        )
                    |> (,,) newVersion msg
           )
        -- Commit json files to repo
        |> (\( newVersion, msg, bumpTask ) ->
                config.testing
                    ? ( ( pathJoin config [ config.cwd, "test" ]
                        , bumpTask
                            |> Task.andThen (\_ -> FileSystem.remove (pathJoin config [ config.cwd, "test", ".git" ]))
                            |> Task.mapError Node.message
                            |> Task.andThen (\_ -> Git.initRepo <| pathJoin config [ config.cwd, "test", ".git" ])
                            |> Task.andThen (\_ -> Task.succeed ())
                        )
                      , ( config.cwd
                        , bumpTask
                            |> Task.mapError Node.message
                            |> Task.andThen (\_ -> Task.succeed ())
                        )
                      )
                    |> (\( repoPath, bumpTask ) ->
                            bumpTask
                                |> Task.andThen (\_ -> Git.getRepo repoPath)
                                |> Task.andThen
                                    (\repo ->
                                        ( model.elmJson, model.npmJsonStr )
                                            |?!**>
                                                ( bugMissing "elmJsonStr"
                                                , always [ elmJsonFilename ]
                                                , always [ elmJsonFilename, npmJsonFilename ]
                                                )
                                            |> (\filesToAdd -> Git.commit repo filesToAdd ("Bumped version to" +-+ versionToString newVersion))
                                            |> Task.andThen (\_ -> Task.succeed repo)
                                    )
                       )
                    |> (,,) newVersion msg
           )
        -- Tag commit with new version
        |> (\( newVersion, msg, bumpTask ) ->
                bumpTask
                    |> Task.andThen (\repo -> Git.createLightweightTag repo (versionToString newVersion))
                    |> Task.andThen (\_ -> Task.succeed ())
                    |> (,) msg
           )
        |> (\( msg, bumpTask ) -> model ! [ Task.attempt msg bumpTask ])


operationError : Model -> Task Never String -> ( ( Model, Cmd (Msg msg) ), List msg )
operationError model task =
    ( model ! [ Task.perform (\_ -> OperationComplete -1) task ], [] )


operationSuccessful : Model -> Task Never String -> ( ( Model, Cmd (Msg msg) ), List msg )
operationSuccessful model task =
    ( model ! [ Task.perform (\_ -> OperationComplete 0) task ], [] )


delayUpdateMsg : Msg msg -> Time -> Cmd (Msg msg)
delayUpdateMsg msg delay =
    Task.perform (\_ -> msg) <| Process.sleep delay


delayCmd : Cmd (Msg msg) -> Time -> Cmd (Msg msg)
delayCmd cmd =
    delayUpdateMsg <| DoCmd cmd


type Msg msg
    = DoCmd (Cmd (Msg msg))
    | OutputComplete String
    | OperationComplete Int
    | PackagesRead msg (Result InitError ( List TagName, String, String, Maybe String ))
    | IsSymLinkCheckComplete PackageName Path (Result String Bool)
    | GitStatusCheckComplete (Result Git.Error Git.FileStatuses)
    | GitNewerVersionCheckComplete (Result Git.Error (Result String (Maybe ( VersionStr, PackageName ))))
    | BumpComplete Version Version (Result Git.Error ())


update : Config msg -> Msg msg -> Model -> ( ( Model, Cmd (Msg msg) ), List msg )
update config msg model =
    case msg of
        DoCmd cmd ->
            ( model ! [ cmd ], [] )

        OutputComplete _ ->
            ( model ! [], [] )

        OperationComplete exitCode ->
            ( model ! [], [ config.operationComplete exitCode ] )

        PackagesRead _ (Err step) ->
            (\filename nodeError -> "Unable to read" +-+ filename +-+ "Error:" +-+ (Node.message nodeError))
                |> (\fileError ->
                        case step of
                            GettingTags error ->
                                "Unable to get tags in current repo Error:" +-+ error

                            ReadingExactDependencies nodeError ->
                                fileError exactDependenciesFileName nodeError

                            ReadingElmPackage nodeError ->
                                fileError elmJsonFilename nodeError

                            ReadingNpmPackage nodeError ->
                                fileError npmJsonFilename nodeError
                   )
                |> errorLog
                |> operationError model

        PackagesRead initializedMsg (Ok ( tags, exactDependencies, elm, maybeNpm )) ->
            decodeExactDependencies exactDependenciesFileName exactDependencies
                |??->
                    ( operationError model << errorLog
                    , \exactDependencies ->
                        { model | exactDependencies = exactDependencies, elmJsonIndent = Just <| determineJsonIndent elm }
                            |> (\model ->
                                    decodeElmJson elmJsonFilename elm
                                        |??->
                                            ( Err << errorLog
                                            , \elmJson ->
                                                versionFromString elmJson.version
                                                    |?> (\currentElmVersion ->
                                                            (sortedVersions tags
                                                                |> List.head
                                                            )
                                                                ?= (versionFromString "0.0.0" ?!= bug "Bad version string")
                                                                |> (\currentRepoVersion ->
                                                                        (versionCompare currentRepoVersion currentElmVersion /= EQ)
                                                                            ? ( Err <|
                                                                                    errorLog (elmJsonFilename +-+ "version:" +-+ parens (versionToString currentElmVersion) +-+ "must equal current repo's version" +-+ parens (versionToString currentRepoVersion))
                                                                              , Ok ( { model | elmJson = Just elmJson }, elmJson, currentElmVersion )
                                                                              )
                                                                   )
                                                        )
                                                    ?= Err (errorLog ("Missing version in:" +-+ elmJsonFilename))
                                            )
                                        |> (,) model
                               )
                            |> (\( model, versionCheckResult ) ->
                                    versionCheckResult
                                        |??->
                                            ( Err
                                            , \( model, elmJson, currentElmVersion ) ->
                                                maybeNpm
                                                    |?->
                                                        ( Ok model
                                                        , \npmJsonStr ->
                                                            validateNpmJson npmJsonStr (versionToString currentElmVersion) elmJson.repository
                                                                |??->
                                                                    ( \errors -> Err <| errorLog (npmJsonFilename +-+ "has the following errors:\n\t" ++ (String.join "\n\t" errors))
                                                                    , \_ ->
                                                                        decodeNpmJsonVersion npmJsonStr
                                                                            |??->
                                                                                ( \error -> Err <| errorLog ("Cannot extract version from" +-+ npmJsonFilename +-+ "Error:" +-+ error)
                                                                                , \( version, npmJsonStr ) ->
                                                                                    (versionCompare version currentElmVersion /= EQ)
                                                                                        ? ( Err <| errorLog (elmJsonFilename +-+ "version:" +-+ parens (versionToString currentElmVersion) +-+ "must equal" +-+ npmJsonFilename +-+ "version:" +-+ parens (versionToString version))
                                                                                          , Ok { model | npmJsonStr = Just npmJsonStr }
                                                                                          )
                                                                                )
                                                                    )
                                                        )
                                            )
                                        |??-> ( operationError model, \model -> ( model ! [], [ initializedMsg ] ) )
                               )
                    )

        IsSymLinkCheckComplete _ path (Err error) ->
            errorLog ("Unable to check:" +-+ "for symbolic links Error:" +-+ error)
                |> operationError model

        IsSymLinkCheckComplete packageName _ (Ok isSymlink) ->
            (model.elmJson ?!= bugMissing "elmJson")
                |> (\elmJson ->
                        { model | linkCheckCount = model.linkCheckCount + 1 }
                            |> (\model ->
                                    isSymlink
                                        ? ( { model | linkedPackages = packageName :: model.linkedPackages }, model )
                                        |> (\model ->
                                                (model.linkCheckCount == Dict.size elmJson.dependencies)
                                                    ? ( (model.linkedPackages == [])
                                                            ? ( checkGitStatus config model
                                                              , errorLog ("The following packages are linked locally and should be released first:\n\t" ++ (String.join "\n\t" model.linkedPackages))
                                                                    |> operationError model
                                                              )
                                                      , ( model ! [], [] )
                                                      )
                                           )
                               )
                   )

        GitStatusCheckComplete (Err error) ->
            errorLog ("Unable to check repository git status Error:" +-+ error)
                |> operationError model

        GitStatusCheckComplete (Ok statuses) ->
            fileStatusAccessors
                |> List.map (\accessor -> ( (first accessor) statuses, second accessor ))
                |> List.filterMap
                    (\( paths, status ) ->
                        (paths == [])
                            ? ( Nothing
                              , Just ( paths, status )
                              )
                    )
                |> (\errors ->
                        (errors == [] || config.allowUncommitted)
                            ? ( checkForNewVersions config model
                              , (errors
                                    |> List.map (\( paths, status ) -> "Status:" +-+ status ++ "\n\t" +-+ String.join ", " paths)
                                )
                                    |> (\errors ->
                                            errorLog ("Not all files have been checked in to git\n\n" ++ String.join "\n" errors)
                                                |> operationError model
                                       )
                              )
                   )

        GitNewerVersionCheckComplete (Err error) ->
            errorLog ("Unable to check for newer versions Error:" +-+ error)
                |> operationError model

        GitNewerVersionCheckComplete (Ok result) ->
            ( { model | newVersionCheckCountDown = model.newVersionCheckCountDown - 1 }, operationError model (Task.succeed "") |> (\( ( model, cmd ), msgs ) -> ( model ! [ delayCmd cmd 100 ], msgs )) )
                |> (\( model, ( ( _, errorCmd ), _ ) ) ->
                        result
                            |??->
                                ( \error -> errorLog error |> operationError model
                                , \maybePackageInfo ->
                                    maybePackageInfo
                                        |?->
                                            ( ( model ! [], [] )
                                            , \( versionStr, packageName ) ->
                                                config.allowOldDependencies
                                                    ? ( ( model, warnLog )
                                                      , ( { model | newVersionCheckFailed = True }, errorLog )
                                                      )
                                                    |> (\( model, log ) -> ( model ! [ log ("Newer version exists for:" +-+ packageName +-+ parens versionStr) |> Task.perform OutputComplete ], [] ))
                                            )
                                        |> (\( ( model, cmd ), msgs ) ->
                                                (model.newVersionCheckCountDown == 0)
                                                    ? ( model.newVersionCheckFailed
                                                            ? ( ( model ! [ cmd, errorCmd ], msgs )
                                                              , config.dryRun
                                                                    ? ( Console.log ("Bump validation passed, skipping operation due to --dry-run parameter specified")
                                                                            |> operationSuccessful model
                                                                      , ( doBump config model, [] )
                                                                      )
                                                                    |> (\( ( model, bumpCmd ), bumpMsgs ) -> ( model ! [ cmd, delayCmd bumpCmd 100 ], List.append msgs bumpMsgs ))
                                                              )
                                                      , ( model ! [ cmd ], msgs )
                                                      )
                                           )
                                )
                   )

        BumpComplete _ _ (Err error) ->
            errorLog ("Unable to bump Error:" +-+ error)
                |> operationError model

        BumpComplete oldVersion newVersion (Ok ()) ->
            Console.log
                (("Bumped version from:" +-+ versionToString oldVersion +-+ "to:" +-+ versionToString newVersion)
                    ++ "\t(use \"git push && git push --tags\" to release package)"
                )
                |> operationSuccessful model


bump : Config msg -> Model -> ( Model, Cmd msg )
bump config model =
    (model.exactDependencies
        |> Dict.toList
        |> List.map
            (\( packageName, versionStr ) ->
                pathJoin config [ elmPackagesRoot config.testing config.pathSep, packageName, versionStr ]
                    |> (\path ->
                            FileSystem.isSymlink path
                                |> Task.mapError Node.message
                                |> Task.attempt (config.routeToMe << IsSymLinkCheckComplete packageName path)
                       )
            )
    )
        |> (\cmds -> { model | linkCheckCount = 0 } ! cmds)
