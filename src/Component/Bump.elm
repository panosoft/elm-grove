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
import Regex
import Json.Decode as JD exposing (field)
import Json.Encode as JE exposing (..)
import StringUtils exposing (..)
import AppUtils exposing (..)
import Utils.Ops exposing (..)
import Utils.Regex exposing (..)
import Utils.Task as Task
import Utils.Tuple as Tuple
import ElmJson exposing (..)
import NpmJson exposing (..)
import Node.Error as Node exposing (Error(..), Code(..))
import Node.FileSystem as FileSystem exposing (FileType(..))
import Node.Encoding as Encoding exposing (Encoding(..))
import Node.OperatingSystem exposing (..)
import Node.ChildProcess exposing (..)
import Package exposing (..)
import Output exposing (..)
import Git exposing (..)
import Version exposing (..)
import Common exposing (..)
import Console exposing (..)
import DocGenerator exposing (..)
import Component.Config exposing (..)
import Docs.Generator as Docs exposing (..)
import ApiChanges exposing (..)
import Glob


type alias Path =
    Common.Path


type alias Config msg =
    { testing : Bool
    , dryRun : Bool
    , verbose : Bool
    , major : Bool
    , minor : Bool
    , patch : Bool
    , allowRebasedRelease : Bool
    , allowLegacyRelease : Bool
    , allowMajorRebasedRelease : Bool
    , allowUncommitted : Bool
    , allowOldDependencies : Bool
    , routeToMe : Msg msg -> msg
    , operationComplete : Int -> msg
    , elmVersion : Int
    , cwd : String
    , pathSep : String
    , generateDocs : GenerateDocs
    }


type BumpVersionType
    = MajorVersion
    | MinorVersion
    | PatchVersion
    | UnknownVersionApp
    | InitVersion


type alias Model =
    { exactDependencies : Dict PackageName VersionStr
    , elmJson : Maybe ElmJson
    , npmJsonStr : Maybe String
    , linkCheckCount : Int
    , linkedPackages : List PackageName
    , newVersionCheckCountDown : Int
    , newVersionCheckFailed : Bool
    , elmJsonIndent : Maybe Int
    , newVersion : Maybe Version
    }


bumpVersionToString : BumpVersionType -> String
bumpVersionToString bumpVersionType =
    case bumpVersionType of
        MajorVersion ->
            "Major"

        MinorVersion ->
            "Minor"

        PatchVersion ->
            "Patch"

        UnknownVersionApp ->
            "Unknown (no public interface)"

        InitVersion ->
            "Unknown (initial release)"


pathJoin : Config msg -> List String -> String
pathJoin config pathParts =
    AppUtils.pathJoin config.pathSep config.cwd pathParts


decodeExactDependencies : Path -> String -> Result String (Dict PackageName VersionStr)
decodeExactDependencies path exactDependenciesJson =
    (JD.decodeString (JD.dict JD.string) exactDependenciesJson)
        |??> Ok
        ??= (\error -> Err ("Cannot decode JSON in" +-+ exactDependenciesFileName +-+ "location:" +-+ path +-+ "Error:" +-+ error))


type InitError
    = InitGettingTags Git.Error
    | InitReadingExactDependencies Node.Error
    | InitReadingElmPackage Node.Error
    | InitReadingNpmPackage Node.Error


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
      , newVersion = Nothing
      }
    , Git.getRepo config.cwd
        |> Task.andThen Git.getTags
        |> Task.mapError InitGettingTags
        |> Task.andThen
            (\tags ->
                FileSystem.readFileAsString (pathJoin config [ elmStuff config.testing, exactDependenciesFileName ]) Utf8
                    |> Task.mapError InitReadingExactDependencies
                    |> Task.andThen
                        (\exactDependencies ->
                            FileSystem.readFileAsString elmJsonFilename Utf8
                                |> Task.mapError InitReadingElmPackage
                                |> Task.andThen (\elm -> Task.succeed ( elm, exactDependencies, tags ))
                        )
            )
        |> Task.andThen
            (\( elm, exactDependencies, tags ) ->
                FileSystem.readFileAsString npmJsonFilename Utf8
                    |> Task.mapError InitReadingNpmPackage
                    |> Task.andThen (\npm -> Task.succeed ( tags, exactDependencies, elm, Just npm ))
                    |> Task.onError
                        (\initError ->
                            case initError of
                                InitReadingNpmPackage nodeError ->
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
        |> Task.attempt (config.routeToMe << PackagesRead initializedMsg)
        |> Just
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
                                        Git.clone repoLocation tempDirectory
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


type TaskProcessing a b
    = Continue a
    | Complete b


getLatestReleaseTagName : List TagName -> TagName
getLatestReleaseTagName tags =
    (tags
        |> sortedVersions
        |> List.head
    )
        |?-> ( initVersionStr, versionToString )


getLatestHeadLineageReleaseTagName : TagName -> List TagName -> TagName
getLatestHeadLineageReleaseTagName headLineageVersionStr tags =
    versionFromString headLineageVersionStr
        |?!->
            ( bug "bad versionStr"
            , \headLineageVersion ->
                (tags
                    |> sortedVersions
                    |> List.filter (\version -> version.major == headLineageVersion.major)
                    |> List.head
                )
                    |?-> ( initVersionStr, versionToString )
            )


getLatestAndHeadLineageTags : Repo -> Task Git.Error ( Sha, TagName, TagName, TagName )
getLatestAndHeadLineageTags repo =
    ( -- get historical SHAs for HEAD commit
      Git.getHeadCommit repo
        |> Task.andThen
            (\headCommit ->
                Git.getCommitSha headCommit
                    |??->
                        ( Task.fail
                        , \headSha ->
                            Git.getCommitTagHistory repo headCommit
                                |> Task.andThen
                                    (\commits ->
                                        commits
                                            |> List.map Git.getCommitSha
                                            |> List.map Result.toMaybe
                                            |> List.filterMap identity
                                            |> (\shas ->
                                                    (List.length shas /= List.length commits)
                                                        ? ( Task.fail "Unable to get SHAs for commits from getCommitTagHistory", Task.succeed ( headSha, shas ) )
                                               )
                                    )
                        )
            )
    , -- get all SHAs for all tags
      Git.getTags repo
        |> Task.andThen (Git.getTagShas repo)
    , -- get all tags
      Git.getTags repo
    )
        |> Task.sequence3
        |> Task.andThen
            (\( ( headSha, historyShas ), tagShaDict, tags ) ->
                tagShaDict
                    |> Dict.filter (\_ -> flip List.member historyShas)
                    |> Dict.keys
                    |> getLatestReleaseTagName
                    |> (\headTagName ->
                            tags
                                |> getLatestHeadLineageReleaseTagName headTagName
                                |> (\latestHeadLineageVersionTagName -> ( headSha, getLatestReleaseTagName tags, latestHeadLineageVersionTagName, headTagName ))
                       )
                    |> Task.succeed
            )


type ReleaseScenario
    = NormalReleaseScenario Version
    | RebasedReleaseScenario Version Version
    | LegacyReleaseScenario Version Version


determineReleaseScenario : Config msg -> Repo -> Task String ReleaseScenario
determineReleaseScenario config repo =
    getLatestAndHeadLineageTags repo
        |> Task.andThen
            (\( headSha, latestVersionStr, latestHeadLineageVersionStr, headLineageVersionStr ) ->
                (latestVersionStr == initVersionStr)
                    ? ( Task.succeed ""
                      , Git.getTagShas repo [ latestVersionStr ]
                            |> Task.andThen
                                (\shas ->
                                    (((shas |> Dict.values) !! 0 ?!= bugMissing "shas") == headSha)
                                        ? ( Task.fail "No commits since last Bump", Task.succeed "" )
                                )
                      )
                    |> Task.andThen
                        (\_ ->
                            Tuple.map3 versionFromString ( latestVersionStr, latestHeadLineageVersionStr, headLineageVersionStr )
                                |?!***>
                                    ( bug "invalid latestVersionStr"
                                    , bug "invalid latestHeadLineageVersionStr"
                                    , bug "invalid headLineageVersionStr"
                                    , \( latestVersion, latestHeadLineageVersion, headLineageVersion ) ->
                                        (latestVersionStr == headLineageVersionStr)
                                            ? ( Task.succeed <| NormalReleaseScenario latestVersion
                                              , (latestVersion.major == headLineageVersion.major && (latestVersion.minor /= headLineageVersion.minor || latestVersion.patch /= headLineageVersion.patch))
                                                    ? ( config.allowRebasedRelease
                                                            ? ( Task.succeed <| RebasedReleaseScenario latestVersion headLineageVersion
                                                              , Task.fail
                                                                    ("HEAD is based on a Previous release"
                                                                        +-+ parens headLineageVersionStr
                                                                        +-+ "which is different than the latest release"
                                                                        +-+ parens latestVersionStr
                                                                        +-+ "If you want to make a Rebased release, you must use --allow-rebased-release"
                                                                    )
                                                              )
                                                      , config.allowLegacyRelease
                                                            ? ( (latestHeadLineageVersionStr == headLineageVersionStr || config.allowRebasedRelease)
                                                                    ? ( Task.succeed <| LegacyReleaseScenario latestHeadLineageVersion headLineageVersion
                                                                      , Task.fail
                                                                            ("HEAD is based on a Previous release"
                                                                                +-+ parens headLineageVersionStr
                                                                                +-+ "which is different than the Major version of latest release"
                                                                                +-+ parens latestVersionStr
                                                                                +-+ "AND is also different than the latest version of that Legacy release"
                                                                                +-+ parens latestHeadLineageVersionStr
                                                                                +-+ "If you want to make a Rebased release, you must use --allow-rebased-release"
                                                                            )
                                                                      )
                                                              , Task.fail
                                                                    ("HEAD is based on a Previous release"
                                                                        +-+ parens headLineageVersionStr
                                                                        +-+ "which is different than the Major version of latest release"
                                                                        +-+ parens latestVersionStr
                                                                        +-+ "If you want to make a Legacy release, you must use --allow-legacy-release"
                                                                    )
                                                              )
                                                      )
                                              )
                                    )
                        )
                    |> Task.andThen
                        (\releaseScenario ->
                            (case releaseScenario of
                                NormalReleaseScenario headLineageVersion ->
                                    ( "Normal", "Latest release:", headLineageVersion, headLineageVersion )

                                RebasedReleaseScenario latestVersion headLineageVersion ->
                                    ( "Rebased", "Latest release:", latestVersion, headLineageVersion )

                                LegacyReleaseScenario latestHeadLineageVersion headLineageVersion ->
                                    ( "Legacy", "Latest" +-+ headLineageVersion.major ++ ".x.x release:", latestHeadLineageVersion, headLineageVersion )
                            )
                                |> (\( releaseScenarioStr, latestPrefix, latestVersion, headLineageVersion ) ->
                                        Console.log
                                            ("Release Scenario:"
                                                +-+ colorize cyan releaseScenarioStr
                                                +-+ parens ("HEAD based on:" +-+ colorize cyan (versionToString headLineageVersion))
                                                +-+ parens (latestPrefix +-+ colorize cyan (versionToString latestVersion))
                                            )
                                            |> Task.mapError (\_ -> "should never get here")
                                            |> Task.andThen (\_ -> Task.succeed releaseScenario)
                                   )
                        )
            )


traverseChangesToDetermineVersion : PackageApiChanges -> BumpVersionType
traverseChangesToDetermineVersion packageApiChanges =
    packageApiChanges
        |> Dict.foldl
            (\moduleName moduleApiChanges bumpVersionType ->
                -- short circuit if already Major (must use lazy operator ?!)
                (bumpVersionType == MajorVersion)
                    ?! ( \_ -> MajorVersion
                       , \_ ->
                            moduleApiChanges
                                |> Dict.foldl
                                    (\name apiChange bumpVersionType ->
                                        case apiChange of
                                            Addition _ ->
                                                (bumpVersionType == PatchVersion) ? ( MinorVersion, bumpVersionType )

                                            Change _ ->
                                                MajorVersion

                                            Deletion _ ->
                                                MajorVersion
                                    )
                                    bumpVersionType
                       )
            )
            PatchVersion


determineVersionTypeBasedOnChanges : Filename -> Filename -> VersionStr -> Task String ( BumpVersionType, Maybe PackageApiChanges )
determineVersionTypeBasedOnChanges headFile latestVersionFile latestVersionStr =
    FileSystem.readFileAsString headFile Utf8
        |> Task.mapError Node.message
        |> Task.andThen (\headJson -> JD.decodeString (JD.list Docs.moduleDecoder) headJson |??-> ( Task.fail, Task.succeed ))
        |> Task.andThen
            (\headModules ->
                FileSystem.readFileAsString latestVersionFile Utf8
                    |> Task.mapError Node.message
                    |> Task.andThen (\latestVersionJson -> JD.decodeString (JD.list Docs.moduleDecoder) latestVersionJson |??-> ( Task.fail, Task.succeed ))
                    |> Task.andThen
                        (\latestVersionModules ->
                            -- determine BumpVersionType based on PackageApiChanges
                            compareModuleDicts (moduleListToDict headModules) (moduleListToDict latestVersionModules)
                                |> (\packageApiChanges ->
                                        (List.length headModules == 0 && List.length latestVersionModules == 0)
                                            ? ( ( UnknownVersionApp, Nothing )
                                              , ( traverseChangesToDetermineVersion packageApiChanges, Just packageApiChanges )
                                              )
                                            |> Task.succeed
                                   )
                        )
            )


determineVersionType : Config msg -> ReleaseScenario -> Task String ( BumpVersionType, Maybe PackageApiChanges )
determineVersionType config releaseScenario =
    -- get latest version of repo and tags
    Git.getRepo config.cwd
        |> Task.andThen
            (\repo ->
                Git.getTags repo
                    |> Task.andThen
                        (\tags ->
                            (sortedVersions tags !! 0)
                                |?-> ( initVersionStr, versionToString )
                                |> (Task.succeed << ((,) repo))
                        )
            )
        |> Task.andThen
            (\( repo, latestVersionStr ) ->
                (case releaseScenario of
                    LegacyReleaseScenario latestHeadLineageVersion _ ->
                        versionToString latestHeadLineageVersion

                    _ ->
                        latestVersionStr
                )
                    |> (,) repo
                    |> Task.succeed
            )
        -- checkout latest release version
        |> Task.andThen
            (\( repo, latestVersionStr ) ->
                (latestVersionStr == initVersionStr)
                    ? ( Task.succeed ( InitVersion, Nothing )
                      , ( pathJoin config [ tempDirectory, "head" ], pathJoin config [ tempDirectory, "latestVersion" ] )
                            |> (\( headPath, latestVersionPath ) ->
                                    ( pathJoin config [ headPath, docsJsonFilename ], pathJoin config [ latestVersionPath, docsJsonFilename ] )
                                        |> (\( headFile, latestVersionFile ) ->
                                                -- checkout code
                                                FileSystem.remove headPath
                                                    |> Task.mapError Node.message
                                                    |> Task.andThen
                                                        (\_ ->
                                                            FileSystem.remove latestVersionPath
                                                                |> Task.mapError Node.message
                                                        )
                                                    |> Task.andThen
                                                        (\_ ->
                                                            Console.log ("Checking out HEAD and" +-+ latestVersionStr ++ "...")
                                                                |> Task.mapError (\_ -> "should never get here")
                                                        )
                                                    |> Task.andThen (\_ -> Git.getHeadCommit repo)
                                                    |> Task.andThen (\headCommit -> Git.checkoutCommit repo headCommit headPath)
                                                    |> Task.andThen (\_ -> Git.checkout repo latestVersionStr latestVersionPath)
                                                    -- generate documentation JSON file for head and latest version
                                                    |> Task.andThen
                                                        (\_ ->
                                                            Console.log "Installing packages and generating Public Interface JSON for HEAD..."
                                                                |> Task.mapError (\_ -> "should never get here")
                                                        )
                                                    |> Task.andThen (\_ -> DocGenerator.generateDocsJsonTask headPath docsJsonFilename GeneratePrepInstallPackages)
                                                    |> Task.andThen
                                                        (\_ ->
                                                            Console.log ("Installing packages and generating Public Interface JSON for" +-+ latestVersionStr ++ "...")
                                                                |> Task.mapError (\_ -> "should never get here")
                                                        )
                                                    |> Task.andThen (\_ -> DocGenerator.generateDocsJsonTask latestVersionPath docsJsonFilename GeneratePrepInstallPackages)
                                                    |> Task.andThen (\_ -> determineVersionTypeBasedOnChanges headFile latestVersionFile latestVersionStr)
                                                    |> Task.andThen
                                                        (\( bumpVersionTypeBasedOnInterfaceChanges, maybePackageApiChanges ) ->
                                                            Console.log ("Version Type:" +-+ colorize cyan (bumpVersionToString bumpVersionTypeBasedOnInterfaceChanges))
                                                                |> Task.mapError (\_ -> "should never get here")
                                                                |> Task.andThen (\_ -> Task.succeed ( bumpVersionTypeBasedOnInterfaceChanges, maybePackageApiChanges ))
                                                        )
                                                    -- compare Elm versions between HEAD and latest version
                                                    |> Task.andThen
                                                        (\( bumpVersionTypeBasedOnInterfaceChanges, maybePackageApiChanges ) ->
                                                            FileSystem.readFileAsString (pathJoin config [ config.cwd, elmJsonFilename ]) Utf8
                                                                |> Task.mapError Node.message
                                                                |> Task.andThen (\headJsonStr -> JD.decodeString elmJsonDecoder headJsonStr |??-> ( Task.fail, Task.succeed ))
                                                                |> Task.andThen
                                                                    (\headJson ->
                                                                        FileSystem.readFileAsString (pathJoin config [ latestVersionPath, elmJsonFilename ]) Utf8
                                                                            |> Task.mapError Node.message
                                                                            |> Task.andThen
                                                                                (\latestJsonStr ->
                                                                                    JD.decodeString elmJsonDecoder latestJsonStr
                                                                                        |??-> ( Task.fail, \latestJson -> Task.succeed ( bumpVersionTypeBasedOnInterfaceChanges, maybePackageApiChanges, headJson.elmVersion == latestJson.elmVersion ) )
                                                                                )
                                                                    )
                                                        )
                                           )
                               )
                            -- check to make sure Elm versions match (otherwise it's a MAJOR release)
                            |> Task.andThen
                                (\( bumpVersionTypeBasedOnInterfaceChanges, maybePackageApiChanges, elmVersionsMatch ) ->
                                    not elmVersionsMatch
                                        ? ( Console.log ("Elm Version change forcing Major release!")
                                                |> Task.mapError (\_ -> "should never get here")
                                                |> Task.andThen (\_ -> Task.succeed MajorVersion)
                                          , Task.succeed bumpVersionTypeBasedOnInterfaceChanges
                                          )
                                        |> Task.map (flip (,) maybePackageApiChanges)
                                )
                      )
            )


getBumpAndOldVersion : Config msg -> Model -> Task String ( BumpVersionType, Maybe PackageApiChanges, Version )
getBumpAndOldVersion config model =
    Git.getRepo config.cwd
        |> Task.andThen (determineReleaseScenario config)
        |> Task.andThen
            (\releaseScenario ->
                determineVersionType config releaseScenario
                    |> Task.andThen
                        (\( bumpVersionType, maybePackageApiChanges ) ->
                            (maybePackageApiChanges
                                |?->
                                    ( Task.succeed ""
                                    , \packageApiChanges ->
                                        packageApiChangesToString packageApiChanges
                                            |> (\changes -> (not config.verbose || changes == "") ? ( Task.succeed "", Console.log changes ))
                                            |> Task.mapError (\_ -> "should never get here")
                                    )
                            )
                                |> Task.andThen
                                    (\_ ->
                                        (case releaseScenario of
                                            NormalReleaseScenario headLineageVersion ->
                                                headLineageVersion

                                            RebasedReleaseScenario _ headLineageVersion ->
                                                headLineageVersion

                                            LegacyReleaseScenario _ headLineageVersion ->
                                                headLineageVersion
                                        )
                                            |> (\headLineageVersion ->
                                                    model.elmJson
                                                        |?!->
                                                            ( bugMissing "model.elmJson"
                                                            , \elmJson ->
                                                                (elmJson.version /= versionToString headLineageVersion)
                                                                    ? ( Task.fail ("Package version in" +-+ elmJsonFilename +-+ parens elmJson.version +-+ "must match the release that HEAD is based on" +-+ parens (versionToString headLineageVersion))
                                                                      , Task.succeed ()
                                                                      )
                                                            )
                                               )
                                    )
                                |> Task.andThen
                                    (\_ ->
                                        case releaseScenario of
                                            NormalReleaseScenario oldVersion ->
                                                Task.succeed ( bumpVersionType, maybePackageApiChanges, oldVersion )

                                            RebasedReleaseScenario oldVersion _ ->
                                                (bumpVersionType == MajorVersion && not config.allowMajorRebasedRelease)
                                                    ? ( Task.fail
                                                            ("This release is a Major release but it's also based on a release that is NOT the latest, i.e. a Rebased Release.\n"
                                                                ++ "If you are sure that you want to do this, then use --allow-major-rebased-release"
                                                            )
                                                      , Task.succeed ( bumpVersionType, maybePackageApiChanges, oldVersion )
                                                      )

                                            LegacyReleaseScenario oldVersion _ ->
                                                (bumpVersionType == MajorVersion)
                                                    ? ( Task.fail
                                                            ("This is a Major release but it's based on a Legacy release which is NOT possible since bumping the Major version would conflict with an existing release.\n"
                                                                ++ "Legacy releases should only be bug fixes (Patch) or additional functionality (Minor)."
                                                            )
                                                      , Task.succeed ( bumpVersionType, maybePackageApiChanges, oldVersion )
                                                      )
                                    )
                        )
                    |> Task.andThen
                        (\( bumpVersionType, maybePackageApiChanges, oldVersion ) ->
                            (\msg ->
                                (not (config.major || config.minor || config.patch))
                                    ? ( Task.fail msg
                                      , Task.succeed <| config.major ? ( MajorVersion, config.minor ? ( MinorVersion, PatchVersion ) )
                                      )
                            )
                                |> (\enforceExplicitBumpVersionType ->
                                        (case bumpVersionType of
                                            UnknownVersionApp ->
                                                enforceExplicitBumpVersionType
                                                    ("This package has NO Public Interface which means you MUST do one of the following:\n\n"
                                                        ++ "\t1. If the package is an Application, then specify either --major, --minor or --patch\n"
                                                        ++ "\t2. If the package is a Library, then add modules to 'exposed-modules', recompile and test before releasing.\n"
                                                        ++ "\t   This library should be tested before releasing by installing this library into a Test App using Grove's --link option.\n"
                                                    )

                                            InitVersion ->
                                                enforceExplicitBumpVersionType "Since this is the first release for this package, you must specify either --major, --minor or --patch"

                                            _ ->
                                                (config.major || config.minor || config.patch)
                                                    ? ( Task.fail
                                                            ("This package has a Public Interface and therefore you must NOT specify --major, --minor or --patch.\n"
                                                                ++ "The type of release (Major/Minor/Patch) will be automatically determined based on the changes made to the public interface and following the rules of semver (http://semver.org/)"
                                                            )
                                                      , Task.succeed bumpVersionType
                                                      )
                                        )
                                   )
                                |> Task.map (\bumpVersionType -> ( bumpVersionType, maybePackageApiChanges, oldVersion ))
                        )
            )


doBump : Config msg -> Model -> ( Model, Cmd (Msg msg) )
doBump config model =
    -- determine version type
    getBumpAndOldVersion config model
        |> Task.andThen
            (\( bumpVersionType, _, oldVersion ) ->
                -- Generate docs
                DocGenerator.generateDocs
                    { testing = config.testing
                    , cwd = config.cwd
                    , pathSep = config.pathSep
                    , generateDocs = config.generateDocs
                    }
                    |> Task.mapError Node.message
                    |> Task.andThen
                        (\_ ->
                            (config.generateDocs == GenerateDocsOn)
                                ? ( Console.log "Documentation generated", Task.succeed "" )
                                |> Task.mapError (\_ -> "Should never happen")
                        )
                    |> Task.andThen (\_ -> Task.succeed ( bumpVersionType, oldVersion ))
            )
        -- Modify elmJson file
        |> (\bumpTask ->
                bumpTask
                    |> Task.andThen
                        (\( bumpVersionType, oldVersion ) ->
                            (\config ->
                                ([ ( config.major, nextMajor oldVersion )
                                 , ( config.minor, nextMinor oldVersion )
                                 , ( config.patch, nextPatch oldVersion )
                                 ]
                                    |> List.filter first
                                    |> List.map second
                                    |> List.head
                                )
                                    |?!-> ( bug "major/minor/patch are all False", identity )
                            )
                                |> (\nextVersionFromConfig ->
                                        case bumpVersionType of
                                            MajorVersion ->
                                                nextMajor oldVersion

                                            MinorVersion ->
                                                nextMinor oldVersion

                                            PatchVersion ->
                                                nextPatch oldVersion

                                            UnknownVersionApp ->
                                                nextVersionFromConfig config

                                            InitVersion ->
                                                nextVersionFromConfig config
                                   )
                                |> (\newVersion ->
                                        -- Modify elmJson file
                                        model.elmJson
                                            |?!->
                                                ( bugMissing "elmJson"
                                                , \elmJson ->
                                                    { elmJson | version = versionToString newVersion }
                                                        |> elmJsonEncoder
                                                        |> JE.encode (model.elmJsonIndent ?!= bugMissing "elmJsonIndent")
                                                        |> writeFile (pathJoin config [ config.cwd, config.testing ? ( "test", "" ), elmJsonFilename ])
                                                        |> Task.mapError Node.message
                                                )
                                            -- Modify npmJson file (IFF it exists)
                                            |> Task.andThen
                                                (\_ ->
                                                    model.npmJsonStr
                                                        |?->
                                                            ( Task.succeed ()
                                                            , \_ ->
                                                                spawn ("npm --no-git-tag-version version" +-+ (versionToString newVersion)) Silent
                                                                    |> Task.mapError Node.message
                                                                    |> Task.andThen (spawnSuccessCheck 0)
                                                            )
                                                )
                                            -- Commit doc JSON, docs & json files to repo
                                            |> (\bumpTask ->
                                                    config.testing
                                                        ? ( ( pathJoin config [ config.cwd, "test" ]
                                                            , bumpTask
                                                                |> Task.andThen
                                                                    (\_ ->
                                                                        FileSystem.remove (pathJoin config [ config.cwd, "test", ".git" ])
                                                                            |> Task.mapError Node.message
                                                                    )
                                                                |> Task.andThen (\_ -> Git.initRepo <| pathJoin config [ config.cwd, "test", ".git" ])
                                                                |> Task.andThen (\_ -> Task.succeed ())
                                                            )
                                                          , ( config.cwd
                                                            , bumpTask
                                                                |> Task.andThen (\_ -> Task.succeed ())
                                                            )
                                                          )
                                                        |> (\( repoPath, bumpTask ) ->
                                                                bumpTask
                                                                    |> Task.andThen
                                                                        (\_ ->
                                                                            ( Git.getRepo repoPath
                                                                            , (FileSystem.exists npmJsonLockFilename
                                                                                |> Task.mapError Node.message
                                                                              )
                                                                            )
                                                                                |> Task.sequence2
                                                                        )
                                                                    |> Task.andThen
                                                                        (\( repo, npmJsonLockExists ) ->
                                                                            ( model.elmJson, model.npmJsonStr )
                                                                                |?!**>
                                                                                    ( bugMissing "elmJsonStr"
                                                                                    , always [ elmJsonFilename ]
                                                                                    , always <| List.append [ elmJsonFilename, npmJsonFilename ] (npmJsonLockExists ? ( [ npmJsonLockFilename ], [] ))
                                                                                    )
                                                                                |> (\filesToAdd ->
                                                                                        Glob.find (pathJoin config [ DocGenerator.elmDocsPath, "**", "*" ]) Nothing False
                                                                                            |> Task.mapError Node.message
                                                                                            |> Task.andThen
                                                                                                (\docFiles ->
                                                                                                    -- make relative paths since Glob has a bug, i.e. doesn't honor `absolute` option
                                                                                                    docFiles
                                                                                                        |> List.map (replaceFirst (Regex.escape (config.cwd ++ config.pathSep)) "")
                                                                                                        |> (\docFiles ->
                                                                                                                Git.getFileStatuses repo
                                                                                                                    |> Task.andThen
                                                                                                                        (\{ deleted } ->
                                                                                                                            ((config.generateDocs == GenerateDocsOn) ? ( [ docsJsonFilename ], [] ))
                                                                                                                                |> List.append (List.concat [ docFiles, filesToAdd ])
                                                                                                                                |> (\toAdd -> Git.commit repo toAdd deleted ("Bumped version to" +-+ versionToString newVersion))
                                                                                                                        )
                                                                                                           )
                                                                                                )
                                                                                   )
                                                                                |> Task.andThen (\_ -> Task.succeed repo)
                                                                        )
                                                           )
                                               )
                                            -- Tag commit with new version
                                            |> Task.andThen (\repo -> Git.createLightweightTag repo (versionToString newVersion))
                                            |> Task.andThen (\_ -> Task.succeed ( oldVersion, newVersion ))
                                   )
                        )
           )
        |> (\bumpTask -> model ! [ Task.attempt BumpComplete bumpTask ])


successExitCode : Int
successExitCode =
    0


failureExitCode : Int
failureExitCode =
    -1


operationError : Model -> Task Never String -> ( ( Model, Cmd (Msg msg) ), List msg )
operationError model task =
    ( model ! [ Task.perform (\_ -> OperationComplete failureExitCode) task ], [] )


operationSuccessful : Model -> Task Never String -> ( ( Model, Cmd (Msg msg) ), List msg )
operationSuccessful model task =
    ( model ! [ Task.perform (\_ -> OperationComplete successExitCode) task ], [] )


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
    | BumpComplete (Result Git.Error ( Version, Version ))


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
                            InitGettingTags error ->
                                "Unable to get tags in current repo Error:" +-+ error

                            InitReadingExactDependencies nodeError ->
                                fileError exactDependenciesFileName nodeError

                            InitReadingElmPackage nodeError ->
                                fileError elmJsonFilename nodeError

                            InitReadingNpmPackage nodeError ->
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
                                                    |?> (\currentElmVersion -> Ok ( { model | elmJson = Just elmJson }, elmJson, currentElmVersion ))
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
            [ elmJsonFilename, npmJsonFilename ]
                |> (\requiredCheckins ->
                        fileStatusAccessors
                            |> List.map (\accessor -> ( (first accessor) statuses, second accessor ))
                            |> List.filterMap
                                (\( paths, status ) ->
                                    ( paths, status )
                                        |> Tuple.mapFirst
                                            (config.allowUncommitted
                                                ? ( List.filter (flip List.member requiredCheckins)
                                                  , identity
                                                  )
                                            )
                                        |> \( paths, status ) ->
                                            (paths == [])
                                                ? ( Nothing
                                                  , Just ( paths, status )
                                                  )
                                )
                            |> (\errors ->
                                    (errors == [])
                                        ? ( checkForNewVersions config model
                                          , errors
                                                |> List.map (\( paths, status ) -> "Status:" +-+ status ++ "\n\t" +-+ String.join ", " paths)
                                                |> (\errors ->
                                                        config.allowUncommitted
                                                            ? ( "Even though you've used --allow-uncommitted, the following MUST always be checked in prior to a bump. Either check in these files or stash your changes with 'git stash'"
                                                              , "Not all files have been checked in to git. Either check in these files, use --allow-uncommitted or stash your changes with 'git stash'"
                                                              )
                                                            |> \errorReason -> errorLog (errorReason ++ "\n\n" ++ String.join "\n" errors) |> operationError model
                                                   )
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
                                                    ?! ( \_ ->
                                                            model.newVersionCheckFailed
                                                                ? ( ( model ! [ cmd, errorCmd ], msgs )
                                                                  , config.dryRun
                                                                        ?! ( \_ ->
                                                                                getBumpAndOldVersion config model
                                                                                    |> Task.andThen
                                                                                        (\_ ->
                                                                                            Console.log ("Bump validation passed, skipping operation due to --dry-run parameter specified")
                                                                                                |> Task.mapError (\_ -> "should never get here")
                                                                                                |> Task.andThen (\_ -> Task.succeed successExitCode)
                                                                                        )
                                                                                    -- )
                                                                                    |> Task.attempt
                                                                                        (\result ->
                                                                                            result
                                                                                                |??->
                                                                                                    ( \error ->
                                                                                                        errorLog error
                                                                                                            |> Task.perform (\_ -> OperationComplete failureExitCode)
                                                                                                            |> DoCmd
                                                                                                    , OperationComplete
                                                                                                    )
                                                                                        )
                                                                                    |> (\cmd -> ( model ! [ cmd ], [] ))
                                                                           , \_ -> ( doBump config model, [] )
                                                                           )
                                                                        |> (\( ( model, bumpCmd ), bumpMsgs ) -> ( model ! [ cmd, delayCmd bumpCmd 100 ], List.append msgs bumpMsgs ))
                                                                  )
                                                       , \_ -> ( model ! [ cmd ], msgs )
                                                       )
                                           )
                                )
                   )

        BumpComplete (Err error) ->
            errorLog ("Unable to bump Error:" +-+ error)
                |> operationError model

        BumpComplete (Ok ( oldVersion, newVersion )) ->
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
                            FileSystem.statistics path
                                |> Task.mapError Node.message
                                |> Task.andThen (\stats -> Task.succeed (stats.type_ == SymbolicLink))
                                |> Task.attempt (config.routeToMe << IsSymLinkCheckComplete packageName path)
                       )
            )
    )
        |> (\cmds -> { model | linkCheckCount = 0 } ! cmds)
