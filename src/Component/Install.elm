module Component.Install
    exposing
        ( Config
        , Model
        , Msg
        , init
        , update
        , install
        , getNpmPackages
        )

import Set exposing (Set)
import Dict exposing (Dict)
import Task exposing (Task)
import Regex exposing (..)
import Json.Encode as JE
import Json.Decode as JD exposing (field)
import StringUtils exposing (..)
import ParentChildUpdate exposing (..)
import AppUtils exposing (..)
import Dependency exposing (..)
import Git exposing (..)
import Node.Error as Node exposing (Error(..))
import Node.FileSystem as FileSystem
import Node.Encoding as Encoding exposing (Encoding(..))
import Version exposing (..)
import Output exposing (..)
import Console exposing (..)
import Utils.Ops exposing (..)
import Utils.Regex exposing (..)
import Package exposing (..)
import ElmJson exposing (..)
import Env exposing (..)
import NpmJson exposing (..)
import Spawn
import AppUtils exposing (..)
import Common exposing (..)
import Component.Rewriter as Rewriter


type alias Config msg =
    { testing : Bool
    , linking : Bool
    , dryRun : Bool
    , npmProduction : Bool
    , npmSilent : Bool
    , noRewrite : Bool
    , skipNpmInstall : Bool
    , routeToMe : Msg msg -> msg
    , operationComplete : Int -> msg
    , elmVersion : Int
    , cwd : String
    , pathSep : String
    , packages : Maybe (List PackageName)
    , sources : Dict PackageName PackageSource
    }


type alias RepoDetails =
    { repo : Repo
    , tags : List TagName
    }


type alias InstallState =
    { maybeRepoDetails : Maybe RepoDetails
    , parentPackageName : PackageName
    , dependsOn : DependsOn
    , maybeVersionStr : Maybe VersionStr
    , maybeRepoLocation : Maybe Path
    , maybeElmJsonStr : Maybe String
    , maybeElmJson : Maybe ElmJson
    }


type alias CheckedOutPackage =
    { dependsOn : DependsOn
    , versionStr : VersionStr
    , repoDetails : RepoDetails
    , repoLocation : Path
    }


type alias LinkedRepo =
    { repoLocation : Path
    , maybeInstallState : Maybe InstallState
    , maybeVersion : Maybe Version
    }


type alias GitUrl =
    String


type alias Model =
    { linkedRepos : Dict PackageName LinkedRepo
    , elmJson : Maybe ElmJson
    , readingElmJson : Set PackageName
    , cloning : Set PackageName
    , cloned : Set PackageName
    , preparingLink : Set PackageName
    , preparedLink : Set PackageName
    , checkingOut : Set PackageName
    , checkedOut : Dict PackageName CheckedOutPackage
    , checkingNpm : Set PackageName
    , checkedNpm : Set PackageName
    , installed : Dict PackageName ( GitUrl, Path, VersionStr )
    , npmPackages : Set PackageName
    , finalCheckoutCount : Int
    , rewriterModel : Rewriter.Model
    , elmJsonIndent : Maybe Int
    }


rewriterConfig : Config msg -> Set PackageName -> Rewriter.Config (Msg msg)
rewriterConfig config linkedRepos =
    { linkedRepos = linkedRepos
    , testing = config.testing
    , routeToMe = RewriterMsg
    , operationComplete = RewritingComplete
    , cwd = config.cwd
    , pathSep = config.pathSep
    }


init : Config msg -> msg -> String -> ( Model, Maybe (Cmd msg) )
init config initializedMsg linkedReposFilename =
    ( { linkedRepos = Dict.empty
      , elmJson = Nothing
      , readingElmJson = Set.empty
      , cloning = Set.empty
      , cloned = Set.empty
      , preparingLink = Set.empty
      , preparedLink = Set.empty
      , checkingOut = Set.empty
      , checkedOut = Dict.empty
      , checkingNpm = Set.empty
      , checkedNpm = Set.empty
      , installed = Dict.empty
      , npmPackages = Set.empty
      , finalCheckoutCount = 0
      , rewriterModel = Rewriter.initModel (rewriterConfig config Set.empty)
      , elmJsonIndent = Nothing
      }
    , config.linking
        ? ( Just (Task.attempt (config.routeToMe << LinkedReposRead initializedMsg linkedReposFilename) <| FileSystem.readFileAsString linkedReposFilename Utf8)
          , Nothing
          )
    )


pathJoin : Config msg -> List String -> String
pathJoin config pathParts =
    AppUtils.pathJoin config.pathSep config.cwd pathParts


type alias CloneTask =
    Task ( DependsOn, Git.Error ) InstallState


hasPackageBeenClonedOrLinked : PackageName -> Model -> Bool
hasPackageBeenClonedOrLinked packageName model =
    Set.member packageName
        ([ model.cloning, model.cloned, model.preparingLink, model.preparedLink ]
            |> List.foldl (\set union -> Set.union set union)
                Set.empty
        )


clonePackageTask : ElmJson -> PackageName -> Model -> DependsOn -> ( Model, Maybe CloneTask )
clonePackageTask elmJson parentPackageName model dependsOn =
    getRepoLocation elmJson.dependencySources dependsOn.packageName
        |> (\repoLocation ->
                hasPackageBeenClonedOrLinked dependsOn.packageName model
                    ? ( ( model, Nothing )
                      , ( { model | cloning = Set.insert dependsOn.packageName model.cloning }
                        , Just
                            (Console.log ("Cloning" +-+ colorize cyan repoLocation ++ "")
                                |> Task.mapError (\_ -> ( dependsOn, "Should never happen" ))
                                |> Task.andThen
                                    (\_ ->
                                        Git.clone repoLocation
                                            |> Task.andThen
                                                (\repo ->
                                                    Git.getTags repo
                                                        |> Task.andThen (\tags -> Task.succeed <| InstallState (Just { repo = repo, tags = tags }) parentPackageName dependsOn Nothing (Just repoLocation) Nothing Nothing)
                                                )
                                            |> Task.mapError (\error -> ( dependsOn, error ))
                                    )
                            )
                        )
                      )
           )


linkPackageTask : Config msg -> Path -> PackageName -> Model -> DependsOn -> ( Model, Maybe CloneTask )
linkPackageTask config repoLocation parentPackageName model dependsOn =
    hasPackageBeenClonedOrLinked dependsOn.packageName model
        ? ( ( model, Nothing )
          , (( { model | preparingLink = Set.insert dependsOn.packageName model.preparingLink }
             , Just
                ((String.join config.pathSep [ repoLocation, elmJsonFilename ])
                    |> (\path ->
                            Console.log ("Preparing to Link" +-+ colorize cyan repoLocation ++ "")
                                |> Task.mapError (\_ -> ( dependsOn, "Should never happen" ))
                                |> Task.andThen
                                    (\_ ->
                                        FileSystem.readFileAsString path Utf8
                                            |> Task.andThen (\contents -> Task.succeed <| InstallState Nothing parentPackageName dependsOn Nothing (Just repoLocation) (Just contents) Nothing)
                                            |> Task.mapError (\error -> ( dependsOn, Node.message error ))
                                    )
                       )
                )
             )
            )
          )


type CloneMethod
    = Cloned
    | Linked


cloneAllPackagesTasks : Config msg -> ElmJson -> PackageName -> Model -> List ( DependsOn, Maybe Range ) -> ( Model, List ( CloneMethod, DependsOn, Maybe Range, CloneTask ) )
cloneAllPackagesTasks config elmJson parentPackageName model dependencyRanges =
    dependencyRanges
        |> List.foldl
            (\( dependsOn, maybeRange ) ( model, taskInfos ) ->
                Dict.get dependsOn.packageName model.linkedRepos
                    |?> (\linkedRepo -> ( Linked, linkPackageTask config linkedRepo.repoLocation parentPackageName model dependsOn ))
                    ?= ( Cloned, clonePackageTask elmJson parentPackageName model dependsOn )
                    |> (\( cloneMethod, ( model, maybeTask ) ) -> ( model, maybeTask |?> (\task -> ( cloneMethod, dependsOn, maybeRange, task ) :: taskInfos) ?= taskInfos ))
            )
            ( model, [] )


cloneAllPackages : Config msg -> ElmJson -> PackageName -> Model -> List ( DependsOn, Maybe Range ) -> ( Model, Cmd (Msg msg) )
cloneAllPackages config elmJson parentPackageName model dependencyRanges =
    cloneAllPackagesTasks config elmJson parentPackageName model dependencyRanges
        |> (\( model, taskInfo ) ->
                taskInfo
                    |> List.map
                        (\( cloneMethod, dependsOn, maybeRange, task ) ->
                            case cloneMethod of
                                Linked ->
                                    Task.attempt (LinkPrepareComplete maybeRange) task

                                Cloned ->
                                    Task.attempt (CloneComplete maybeRange) task
                        )
                    |> (\cmds -> (model ! cmds))
           )


getVersions : List String -> Range -> PackageName -> PackageName -> Result LogTask ( VersionStr, VersionStr )
getVersions tags range parentPackageName packageName =
    sortedVersions tags
        |> (\allVersions ->
                ( allVersions
                    |> List.filter (inRange range)
                    |> List.head
                , List.head allVersions
                )
                    |?!**>
                        ( \_ -> Err <| errorLog ("No version exists for:" +-+ packageName +-+ "as specified by:" +-+ parentPackageName +-+ "which is range:" +-+ range +-+ "existing versions:" +-+ (List.map versionToString allVersions))
                        , bug "Cannot get head of allVersions EVEN THOUGH head of inRangeVersion was retrieved"
                        , \( inRangeVersion, latestVersion ) -> Ok ( versionToString inRangeVersion, versionToString latestVersion )
                        )
           )


getRepoDetails : InstallState -> RepoDetails
getRepoDetails installState =
    installState.maybeRepoDetails
        ?!= bugMissing "repoDetails"


checkoutPackageTask : Config msg -> InstallState -> Range -> Model -> ( LogTasks, Result Int ( Model, Maybe (Task ( InstallState, Git.Error ) InstallState) ) )
checkoutPackageTask config installState range model =
    ( installState.dependsOn, getRepoDetails installState )
        |> (\( dependsOn, repoDetails ) ->
                getVersions repoDetails.tags range installState.parentPackageName dependsOn.packageName
                    |??->
                        ( \logTask -> ( [ logTask ], Err -1 )
                        , \( inRangeVersionStr, latestVersionStr ) ->
                            (inRangeVersionStr /= latestVersionStr)
                                ? ( warnLog ("Newer version of:" +-+ dependsOn.packageName +-+ "exists:" +-+ latestVersionStr +-+ parens installState.dependsOn.dependencyPath), Task.succeed "" )
                                |> (\warnTask ->
                                        { installState | maybeVersionStr = Just inRangeVersionStr }
                                            |> (\installState ->
                                                    (Dict.get dependsOn.packageName model.checkedOut
                                                        |?> (\checkedOutPackage ->
                                                                ( model
                                                                , (checkedOutPackage.versionStr == inRangeVersionStr)
                                                                    ? ( [], [ errorLog ("Version mismatch for:" +-+ dependsOn.packageName +-+ "version:" +-+ inRangeVersionStr +-+ parens dependsOn.dependencyPath +-+ "with previously checked out version:" +-+ checkedOutPackage.versionStr +-+ parens checkedOutPackage.dependsOn.dependencyPath) ] )
                                                                , Nothing
                                                                )
                                                            )
                                                        ?= ( { model
                                                                | checkingOut = Set.insert dependsOn.packageName model.checkingOut
                                                                , checkedOut = Dict.insert dependsOn.packageName (CheckedOutPackage dependsOn inRangeVersionStr repoDetails (installState.maybeRepoLocation ?!= bugMissing "repoLocation")) model.checkedOut
                                                             }
                                                           , []
                                                           , Just <|
                                                                (Console.log ("Checking out:" +-+ colorize magenta dependsOn.packageName +-+ parens inRangeVersionStr)
                                                                    |> Task.mapError (\_ -> ( installState, "Should never happen" ))
                                                                    |> Task.andThen
                                                                        (\_ ->
                                                                            Git.checkout repoDetails.repo inRangeVersionStr (pathJoin config (repoDetails.repo.cloneLocation :: [ inRangeVersionStr ]))
                                                                                |> Task.mapError (\error -> ( installState, error ))
                                                                                |> Task.andThen (always <| Task.succeed installState)
                                                                        )
                                                                )
                                                           )
                                                    )
                                                        |> (\( model, logTasks, maybeTask ) ->
                                                                ( warnTask :: logTasks
                                                                , (logTasks /= [])
                                                                    ? ( Err -1, Ok <| ( model, maybeTask ) )
                                                                )
                                                           )
                                               )
                                   )
                        )
           )


checkoutPackage : Config msg -> InstallState -> Range -> Model -> ( Model, Cmd (Msg msg) )
checkoutPackage config installState range model =
    checkoutPackageTask config installState range model
        |> (\( logTasks, results ) ->
                results
                    |??->
                        ( \exitCode ->
                            logTasks
                                |> Task.sequence
                                |> Task.perform (\_ -> OperationComplete exitCode)
                                |> (\cmd -> (model ! [ cmd ]))
                        , \( model, maybeTask ) ->
                            logTasks
                                |> Task.sequence
                                |> Task.mapError (\_ -> ( installState, "Should never happen" ))
                                |> Task.andThen (\_ -> maybeTask ?= Task.succeed installState)
                                |> Task.attempt CheckoutComplete
                                |> (\cmd -> model ! [ cmd ])
                        )
           )


exactDependenciesLocation : Config msg -> String
exactDependenciesLocation config =
    pathJoin config [ elmPackagesRoot config.testing config.pathSep, "..", exactDependenciesFileName ]


timeToInstall : Model -> Bool
timeToInstall model =
    [ model.readingElmJson, model.cloning, model.checkingOut, model.preparingLink, model.checkingNpm ]
        |> List.foldl (\set result -> result && Set.size set == 0) True


installOrLink : Config msg -> Model -> ( ( Model, Cmd (Msg msg) ), List msg )
installOrLink config model =
    ( model.checkedOut
        |> Dict.toList
        |> List.foldl
            (\( packageName, checkedOutPackage ) cmds ->
                pathJoin config [ elmPackagesRoot config.testing config.pathSep, packageName, checkedOutPackage.versionStr ]
                    |> (\installPath ->
                            ((Console.log ("Installing:" +-+ colorize green packageName +-+ parens checkedOutPackage.versionStr)
                                |> Task.mapError (always "Should never happen")
                                |> Task.andThen
                                    (\_ ->
                                        (FileSystem.remove <| pathJoin config [ elmPackagesRoot config.testing config.pathSep, packageName ])
                                            |> Task.mapError Node.message
                                            |> Task.andThen (\_ -> Git.checkout checkedOutPackage.repoDetails.repo checkedOutPackage.versionStr installPath)
                                    )
                                |> Task.attempt (InstallOrLinkComplete packageName checkedOutPackage.versionStr checkedOutPackage.repoLocation)
                             )
                                :: cmds
                            )
                       )
            )
            []
    , model.linkedRepos
        |> Dict.toList
        |> List.foldl
            (\( packageName, linkedRepo ) cmds ->
                ( linkedRepo.maybeInstallState, linkedRepo.maybeVersion )
                    |?**>
                        ( cmds
                        , cmds
                        , \( installState, version ) ->
                            versionToString version
                                |> (\versionStr ->
                                        ((pathJoin config [ elmPackagesRoot config.testing config.pathSep, packageName ])
                                            |> (\packageRootPath ->
                                                    (pathJoin config [ packageRootPath, versionStr ])
                                                        |> (\installPath ->
                                                                (((Console.log ("Linking:" +-+ colorize green packageName +-+ parens versionStr))
                                                                    |> Task.mapError (always "Should never happen")
                                                                    |> Task.andThen
                                                                        (\_ ->
                                                                            FileSystem.remove packageRootPath
                                                                                |> Task.andThen (\_ -> FileSystem.mkdirp packageRootPath)
                                                                                |> Task.andThen (\_ -> FileSystem.makeSymlink linkedRepo.repoLocation installPath "dir")
                                                                                |> Task.mapError Node.message
                                                                        )
                                                                    |> Task.attempt (InstallOrLinkComplete packageName versionStr linkedRepo.repoLocation)
                                                                 )
                                                                    :: cmds
                                                                )
                                                           )
                                               )
                                        )
                                   )
                        )
            )
            []
    )
        |> (\( checkoutCmds, linkCmds ) ->
                ( { model | finalCheckoutCount = List.length checkoutCmds + List.length linkCmds }
                    ! (List.append checkoutCmds linkCmds)
                , []
                )
           )


operationError : Model -> Task Never String -> ( ( Model, Cmd (Msg msg) ), List msg )
operationError model task =
    ( model ! [ Task.perform (\_ -> OperationComplete -1) task ], [] )


operationSuccessful : Model -> Task Never String -> ( ( Model, Cmd (Msg msg) ), List msg )
operationSuccessful model task =
    ( model ! [ Task.perform (\_ -> OperationComplete 0) task ], [] )


installIfTime : Config msg -> Model -> ( ( Model, Cmd (Msg msg) ), List msg )
installIfTime config model =
    timeToInstall model
        ? ( config.dryRun
                ? ( Console.log "\n\n***** Ending prematurely due to --dry-run *****\n"
                        |> operationSuccessful model
                  , installOrLink config model
                  )
          , ( model ! [], [] )
          )


processElmJson : Config msg -> Model -> PackageName -> Path -> Occurence -> ElmJson -> ( ( Model, Cmd (Msg msg) ), List msg )
processElmJson config model packageName parentPath readOccurence elmJson =
    rangeFromString elmJson.elmVersion
        |?->
            ( errorLog ("Invalid elmVersion:" +-+ elmJson.elmVersion)
                |> operationError model
            , \elmVersionRange ->
                (not <| inRange elmVersionRange <| Version 0 config.elmVersion 0)
                    ? ( errorLog
                            ("Supported Elm version is:"
                                +-+ config.elmVersion
                                +-+ "which is incompatible with package:"
                                +-+ ((packageName == "") ? ( "<your program>", packageName ))
                                +-+ parens elmJson.elmVersion
                            )
                            |> operationError model
                      , ( Dict.union config.sources (elmJson.dependencySources ?= Dict.empty)
                            |> (\sources -> (sources == Dict.empty) ? ( Nothing, Just sources ))
                        , (readOccurence == Initial)
                            ? ( (config.packages ?= []), [] )
                            |> List.map ((flip (,)) Nothing)
                            |> Dict.fromList
                        )
                            |> (\( dependencySources, packages ) -> { elmJson | dependencySources = dependencySources, dependencies = Dict.union packages elmJson.dependencies })
                            |> (\elmJson ->
                                    (readOccurence == Initial)
                                        ? ( { model | elmJson = Just elmJson }, model )
                                        |> (\model ->
                                                (String.toLower packageName ++ ".git" == String.toLower elmJson.repository || packageName == "")
                                                    ? ( Dependency.addToPath parentPath elmJson.repository
                                                            |?->
                                                                ( errorLog ("Circular dependency encountered with package:" +-+ elmJson.repository +-+ "parental dependecies:" +-+ parentPath)
                                                                    |> operationError model
                                                                , \path ->
                                                                    (elmJson.dependencies
                                                                        |> Dict.toList
                                                                        |> List.map
                                                                            (\( packageName, maybeRangeStr ) ->
                                                                                ( { packageName = packageName, dependencyPath = path }
                                                                                , maybeRangeStr
                                                                                    |?->
                                                                                        ( Ok Nothing
                                                                                        , \rangeStr ->
                                                                                            rangeFromString rangeStr
                                                                                                |?->
                                                                                                    ( Err <| errorLog ("Invalid version range:" +-+ rangeStr +-+ "for package:" +-+ packageName +-+ "in" +-+ elmJsonFilename +-+ ((parentPath == "") ? ( "", parens parentPath )))
                                                                                                    , Ok << Just
                                                                                                    )
                                                                                        )
                                                                                )
                                                                            )
                                                                        |> (\dependencyRangesResults ->
                                                                                (dependencyRangesResults
                                                                                    |> List.filterMap (\( dependsOn, maybeRangeResult ) -> maybeRangeResult |??-> ( Just, always Nothing ))
                                                                                )
                                                                                    |> (\errorTasks ->
                                                                                            (errorTasks /= [])
                                                                                                ? ( model
                                                                                                        ! [ errorTasks
                                                                                                                |> Task.sequence
                                                                                                                |> Task.perform (\_ -> OperationComplete -1)
                                                                                                          ]
                                                                                                  , dependencyRangesResults
                                                                                                        |> List.filterMap (\( dependsOn, maybeRangeResult ) -> maybeRangeResult |??-> ( always Nothing, \maybeRange -> Just ( dependsOn, maybeRange ) ))
                                                                                                        |> (\dependencyRanges -> cloneAllPackages config elmJson elmJson.repository model dependencyRanges)
                                                                                                  )
                                                                                       )
                                                                           )
                                                                        |> (\( model, cmd ) ->
                                                                                installIfTime config model
                                                                                    |> (\( ( finalModel, finalCmd ), finalMsgs ) -> ( finalModel ! [ finalCmd, cmd ], finalMsgs ))
                                                                           )
                                                                    )
                                                                )
                                                      , errorLog ("Package name mismatch in" +-+ elmJsonFilename +-+ "in repository field for package:" +-+ packageName +-+ "has value of:" +-+ elmJson.repository)
                                                            |> operationError model
                                                      )
                                           )
                               )
                      )
            )


type Occurence
    = Initial
    | Subsequent


type alias ParentPath =
    String


type Msg msg
    = OutputComplete String
    | OperationComplete Int
    | LinkedReposRead msg String (Result Node.Error String)
    | ElmJsonFileRead PackageName Path ParentPath Occurence (Maybe ( InstallState, Path )) (Result Node.Error String)
    | LinkPrepareComplete (Maybe Range) (Result ( DependsOn, Git.Error ) InstallState)
    | CloneComplete (Maybe Range) (Result ( DependsOn, Git.Error ) InstallState)
    | CheckoutComplete (Result ( InstallState, Git.Error ) InstallState)
    | DependentNpmPackageRead InstallState (Result Node.Error String)
    | InstallOrLinkComplete PackageName VersionStr Path (Result String ())
    | FinalElmFilesWritten (Result Node.Error ())
    | NpmPackageRead (Result Node.Error String)
    | NpmPackageWritten (Result Node.Error ())
    | NpmOperationComplete (Task Never String) (Result String ())
    | RewritingComplete Int Rewriter.RewriteCompletionStatus
    | RewriterMsg Rewriter.Msg


update : Config msg -> Msg msg -> Model -> ( ( Model, Cmd (Msg msg) ), List msg )
update config msg model =
    let
        cloneComplete model installState =
            { model | cloning = Set.remove installState.dependsOn.packageName model.cloning, cloned = Set.insert installState.dependsOn.packageName model.cloned }

        isPackageBeingAdded config installState =
            installState.dependsOn.packageName
                |> flip List.member (config.packages ?= [])

        updateRewriter =
            updateChildParent (Rewriter.update <| rewriterConfig config (model.linkedRepos |> Dict.keys |> Set.fromList))
                (update config)
                .rewriterModel
                RewriterMsg
                (\model rewriterModel -> { model | rewriterModel = rewriterModel })
    in
        case msg of
            OutputComplete _ ->
                ( model ! [], [] )

            OperationComplete exitCode ->
                ( model ! [], [ config.operationComplete exitCode ] )

            LinkedReposRead initializedMsg linkedReposFilename result ->
                ( \msg error ->
                    errorLog (msg +-+ "Error:" +-+ error)
                        |> operationError model
                , \linkedRepos ->
                    linkedRepos
                        |> Dict.map
                            (\_ repoLocation ->
                                LinkedRepo
                                    (repoLocation
                                        |> (Regex.replace All (regex "(\\{.+?\\})"))
                                            (\match ->
                                                List.head match.submatches
                                                    |?!->
                                                        ( bug "no submatches - bad regex?"
                                                        , \submatch ->
                                                            submatch
                                                                |?> (\envVar ->
                                                                        envVar
                                                                            |> String.slice 1 ((String.length envVar) - 1)
                                                                            |> (\envVar -> Dict.get envVar env ?= "")
                                                                    )
                                                                ?= repoLocation
                                                        )
                                            )
                                    )
                                    Nothing
                                    Nothing
                            )
                )
                    |> (\( exitApp, createLinkedRepoWithReplacedEnvVars ) ->
                            result
                                |??>
                                    (\contents ->
                                        (JD.decodeString (JD.dict JD.string) contents)
                                            |??> (\repoLocation -> ( { model | linkedRepos = createLinkedRepoWithReplacedEnvVars repoLocation } ! [], [ initializedMsg ] ))
                                            ??= exitApp ("Unable to decode JSON" +-+ linkedReposFilename)
                                    )
                                ??= (exitApp ("Unable to read" +-+ linkedReposFilename) << Node.message)
                       )

            LinkPrepareComplete _ (Err ( dependsOn, error )) ->
                errorLog ("Unable to link to:" +-+ dependsOn.packageName +-+ "Error:" +-+ error)
                    |> operationError model

            LinkPrepareComplete maybeRange (Ok installState) ->
                ( installState.maybeElmJsonStr, installState.maybeRepoLocation )
                    |?!**>
                        ( bugMissing "elmJson"
                        , bugMissing "repoLocation"
                        , \( elmJsonStr, repoLocation ) ->
                            (elmJsonStr
                                |> decodeElmJson (String.join config.pathSep [ repoLocation, elmJsonFilename ])
                            )
                                |??->
                                    ( operationError model << errorLog
                                    , \elmJson ->
                                        ({ installState | maybeElmJson = Just elmJson }
                                            |> (\installState ->
                                                    versionFromString elmJson.version
                                                        |?->
                                                            ( Err <| errorLog ("Package:" +-+ installState.dependsOn.packageName +-+ "has invalid version:" +-+ elmJson.version)
                                                            , \version ->
                                                                Ok
                                                                    ( { installState | maybeVersionStr = Just elmJson.version }
                                                                    , version
                                                                    , version
                                                                        |> toRangeToNextMajorVersion
                                                                        |> (\rangeStr ->
                                                                                model.elmJson
                                                                                    |?!->
                                                                                        ( bugMissing "elmJson"
                                                                                        , \elmJson ->
                                                                                            { elmJson
                                                                                                | dependencies =
                                                                                                    isPackageBeingAdded config installState
                                                                                                        ? ( Dict.insert installState.dependsOn.packageName (Just rangeStr) elmJson.dependencies
                                                                                                          , elmJson.dependencies
                                                                                                          )
                                                                                            }
                                                                                                |> (\elmJson -> ({ model | elmJson = Just elmJson }))
                                                                                        )
                                                                           )
                                                                    )
                                                            )
                                               )
                                        )
                                            |??->
                                                ( operationError model
                                                , \( installState, version, model ) ->
                                                    maybeRange
                                                        |?-> ( True, \range -> inRange range <| version )
                                                        ? ( Dict.get installState.dependsOn.packageName model.linkedRepos
                                                                |?!->
                                                                    ( bugMissing "linkedRepo"
                                                                    , \linkedRepo ->
                                                                        installState.dependsOn.packageName
                                                                            |> (\packageName ->
                                                                                    (\filename -> pathJoin config [ repoLocation, filename ])
                                                                                        |> (\pathJoin ->
                                                                                                processElmJson config
                                                                                                    { model
                                                                                                        | preparingLink = Set.remove packageName model.preparingLink
                                                                                                        , preparedLink = Set.insert packageName model.preparedLink
                                                                                                        , linkedRepos = Dict.insert packageName { linkedRepo | maybeInstallState = Just installState, maybeVersion = Just version } model.linkedRepos
                                                                                                    }
                                                                                                    packageName
                                                                                                    installState.dependsOn.dependencyPath
                                                                                                    Subsequent
                                                                                                    elmJson
                                                                                                    |> (\( ( model, cmd ), msgs ) ->
                                                                                                            ( model
                                                                                                                ! [ cmd
                                                                                                                  , (FileSystem.readFileAsString (pathJoin elmJsonFilename) Utf8)
                                                                                                                        |> Task.attempt (ElmJsonFileRead installState.dependsOn.packageName (pathJoin elmJsonFilename) installState.dependsOn.dependencyPath Subsequent (Just ( installState, pathJoin npmJsonFilename )))
                                                                                                                  ]
                                                                                                            , msgs
                                                                                                            )
                                                                                                       )
                                                                                           )
                                                                               )
                                                                    )
                                                          , maybeRange
                                                                |?-> ( "", \range -> "since it's version:" +-+ versionToString version +-+ "is not within range:" +-+ (rangeToString range) )
                                                                |> (\versionMessage ->
                                                                        errorLog ("Cannot link to:" +-+ installState.dependsOn.packageName +-+ versionMessage +-+ "as required by:" +-+ installState.dependsOn.dependencyPath)
                                                                            |> operationError model
                                                                   )
                                                          )
                                                )
                                    )
                        )

            CloneComplete _ (Err ( dependsOn, error )) ->
                errorLog ("Unable to clone:" +-+ dependsOn.packageName +-+ "Error:" +-+ error)
                    |> operationError model

            CloneComplete maybeRange (Ok installState) ->
                isPackageBeingAdded config installState
                    ?! ( \_ ->
                            getRepoDetails installState
                                |> (\repoDetails ->
                                        (sortedVersions repoDetails.tags
                                            |> List.head
                                        )
                                            |?> (\currentVersion ->
                                                    currentVersion
                                                        |> toRangeToNextMajorVersion
                                                        |> (\rangeStr ->
                                                                model.elmJson
                                                                    |?> (\elmJson ->
                                                                            { elmJson | dependencies = Dict.insert installState.dependsOn.packageName (Just rangeStr) elmJson.dependencies }
                                                                                |> (\elmJson -> ( { model | elmJson = Just elmJson }, rangeStr, Nothing ))
                                                                        )
                                                                    ?!= bugMissing "elmJson"
                                                           )
                                                )
                                            ?= ( model, "", Just -1 )
                                   )
                       , \_ -> ( model, rangeToString (maybeRange ?!= bug ("missing range for:" +-+ installState)), Nothing )
                       )
                    |> (\( model, rangeStr, maybeExitCode ) ->
                            maybeExitCode
                                |?> (\exitCode -> ( model ! [], [ config.operationComplete exitCode ] ))
                                ?= ((cloneComplete model installState |> checkoutPackage config installState (rangeFromString rangeStr ?!= bug "bad range string"))
                                        |> (\( model, cmd ) -> ( model ! [ cmd ], [] ))
                                   )
                       )

            CheckoutComplete (Err ( installState, error )) ->
                getRepoDetails installState
                    |> (\repoDetails ->
                            installState.maybeVersionStr
                                |?> (\versionStr ->
                                        errorLog ("Unable to checkout:" +-+ versionStr +-+ "for package:" +-+ installState.dependsOn.packageName +-+ "in repo:" +-+ repoDetails.repo.url +-+ "Error:" +-+ error)
                                            |> operationError model
                                    )
                                ?!= (bug "versionStr missing from installState")
                       )

            CheckoutComplete (Ok installState) ->
                ( getRepoDetails installState, installState.dependsOn.packageName )
                    |> (\( repoDetails, packageName ) ->
                            { model | checkingOut = Set.remove packageName model.checkingOut }
                                |> (\model ->
                                        ( (\filename -> pathJoin config [ repoDetails.repo.cloneLocation, filename ])
                                            |> (\pathJoin ->
                                                    (installState.dependsOn.packageName == elmCorePackageName)
                                                        ? ( model ! [ msgToCmd <| DependentNpmPackageRead installState (Err <| Node.Error "" "") ]
                                                          , ({ model | readingElmJson = Set.insert packageName model.readingElmJson, checkingNpm = Set.insert packageName model.checkingNpm }
                                                                ! [ Task.attempt (ElmJsonFileRead installState.dependsOn.packageName (pathJoin elmJsonFilename) installState.dependsOn.dependencyPath Subsequent (Just ( installState, pathJoin npmJsonFilename ))) <| FileSystem.readFileAsString (pathJoin elmJsonFilename) Utf8 ]
                                                            )
                                                          )
                                               )
                                        , []
                                        )
                                   )
                       )

            DependentNpmPackageRead installState result ->
                (\installState model includeNpm ->
                    installState.dependsOn.packageName
                        |> (\packageName ->
                                { model
                                    | checkingNpm = Set.remove packageName model.checkingNpm
                                    , checkedNpm = Set.insert packageName model.checkedNpm
                                    , npmPackages = includeNpm ? ( Set.insert packageName, identity ) <| model.npmPackages
                                }
                                    |> (\model -> installIfTime config model)
                           )
                )
                    |> (\checkComplete ->
                            result
                                |??>
                                    (\npmJsonStr ->
                                        hasDependencies npmJsonStr
                                            ? ( validateNpmJson npmJsonStr (installState.maybeVersionStr ?!= bugMissing "checked out version") (installState.maybeElmJson ?!= bugMissing "elmJson").repository
                                                    |??> (\_ -> checkComplete installState model <| isDirectDependency installState.dependsOn.dependencyPath)
                                                    ??= (\errors ->
                                                            errorLog ("Package" +-+ installState.dependsOn.packageName +-+ "has the following errors:\n\t" ++ (String.join "\n\t" errors))
                                                                |> operationError model
                                                        )
                                              , checkComplete installState model False
                                              )
                                    )
                                ??= (\_ -> checkComplete installState model False)
                       )

            InstallOrLinkComplete packageName versionStr repoLocation (Err error) ->
                errorLog ("Unable to install:" +-+ "package:" +-+ packageName +-+ parens versionStr +-+ "in repo:" +-+ repoLocation +-+ "Error:" +-+ error)
                    |> operationError model

            InstallOrLinkComplete packageName versionStr repoLocation (Ok ()) ->
                (\packageName repoLocation model ->
                    Dict.get packageName model.linkedRepos
                        |?> always "file://"
                        ?= ((find (AtMost 1) (regex "^[A-Za-z_]+@") repoLocation == [])
                                ? ( "git+", "git+ssh://" )
                           )
                )
                    |> (\getGitPrefix ->
                            ( (\model ->
                                model.linkedRepos
                                    |> Dict.filter (\_ linkedRepo -> linkedRepo.maybeVersion |?-> ( False, always True ))
                                    |> Dict.map (\_ linkedRepo -> linkedRepo.maybeVersion |?> versionToString ?!= bug "Should never happen")
                                    |> Dict.union
                                        (model.checkedOut
                                            |> Dict.map (\_ checkedOutPackage -> checkedOutPackage.versionStr)
                                        )
                                    |> Dict.toList
                                    |> List.map (\( packageName, versionStr ) -> ( packageName, JE.string versionStr ))
                                    |> JE.object
                                    |> JE.encode 4
                              )
                            , getGitPrefix packageName repoLocation model
                                |> (\prefix ->
                                        (model.checkedOut |> Dict.get packageName)
                                            |?!->
                                                ( \_ ->
                                                    (model.linkedRepos |> Dict.get packageName)
                                                        |?!->
                                                            ( bugMissing ("linked repo entry for package:" +-+ packageName)
                                                            , (\linkedRepo ->
                                                                (linkedRepo.maybeVersion ?!= bugMissing ("version for linkedRepo:" +-+ packageName))
                                                                    |> versionToString
                                                              )
                                                            )
                                                , .versionStr
                                                )
                                            |> (\versionStr ->
                                                    { model
                                                        | finalCheckoutCount = model.finalCheckoutCount - 1
                                                        , installed = Dict.insert packageName ( (prefix ++ repoLocation), pathJoin config [ elmPackagesRoot config.testing config.pathSep, packageName, versionStr ], versionStr ) model.installed
                                                    }
                                               )
                                   )
                            )
                                |> (\( createExactDependencies, model ) ->
                                        (model.finalCheckoutCount <= 0)
                                            ? ( [ Task.attempt FinalElmFilesWritten
                                                    ((writeFile (exactDependenciesLocation config) <| createExactDependencies model)
                                                        |> Task.andThen
                                                            (\_ ->
                                                                model.elmJson
                                                                    |?> (\elmJson ->
                                                                            writeFile (pathJoin config [ config.cwd, config.testing ? ( "test", "" ), elmJsonFilename ]) <|
                                                                                (JE.encode (model.elmJsonIndent ?!= bugMissing "elmJsonIndent")) <|
                                                                                    elmJsonEncoder elmJson
                                                                        )
                                                                    ?= Task.succeed ()
                                                            )
                                                    )
                                                ]
                                              , []
                                              )
                                            |> (\cmds -> ( model ! cmds, [] ))
                                   )
                       )

            FinalElmFilesWritten (Err error) ->
                errorLog ("Unable to write" +-+ exactDependenciesFileName +-+ "Error:" +-+ error)
                    |> operationError model

            FinalElmFilesWritten (Ok ()) ->
                ( model ! [ FileSystem.readFileAsString npmJsonFilename Utf8 |> Task.attempt NpmPackageRead ], [] )

            NpmPackageRead (Err error) ->
                config.skipNpmInstall
                    ? ( ( model ! [], [ config.operationComplete -1 ] )
                      , warnLog ("\n\nSkipping Npm install since" +-+ npmJsonFilename +-+ "does not exist\n")
                            |> operationSuccessful model
                      )

            NpmPackageRead (Ok npmJsonStr) ->
                model.elmJson
                    |?!->
                        ( bugMissing "elmJson"
                        , \elmJson ->
                            validateNpmJson npmJsonStr elmJson.version elmJson.repository
                                |??->
                                    ( \errors ->
                                        errorLog ("Package" +-+ (replaceFirst "\\.git" "" elmJson.repository) +-+ "has the following errors:\n\t" ++ (String.join "\n\t" errors))
                                            |> operationError model
                                    , \_ ->
                                        (Set.size model.npmPackages == 0)
                                            ? ( ( model ! [], [ config.operationComplete 0 ] )
                                              , decodeNpmJsonDependencies npmJsonStr
                                                    |??->
                                                        ( \error ->
                                                            errorLog error
                                                                |> operationError model
                                                        , \( npmDependencies, npmJsonStr ) ->
                                                            npmDependencies
                                                                |> Dict.filter (\key _ -> String.left 1 key /= "@")
                                                                |> Dict.union
                                                                    (model.npmPackages
                                                                        |> Set.toList
                                                                        |> List.filterMap
                                                                            (\packageName ->
                                                                                Dict.get packageName model.installed
                                                                                    |?->
                                                                                        ( Nothing
                                                                                        , (\( url, _, versionStr ) ->
                                                                                            Just
                                                                                                ( "@" ++ packageName
                                                                                                , url ++ "#semver:^" ++ versionStr
                                                                                                  -- , String.join config.pathSep [ grovePackagesRoot config.testing config.pathSep, packageName, groveInstalledDir ]
                                                                                                  -- |> ((config.pathSep == "\\") ? ( replaceAll "/" "\\", identity ))
                                                                                                )
                                                                                          )
                                                                                        )
                                                                            )
                                                                        |> Dict.fromList
                                                                    )
                                                                |> npmDependenciesEncoder
                                                                |> JE.encode (2 * determineJsonIndent npmJsonStr)
                                                                |> replaceDependencies npmJsonStr
                                                                |> (\npmJsonStr ->
                                                                        ( model
                                                                            ! [ writeFile (pathJoin config [ config.cwd, config.testing ? ( "test", "" ), npmJsonFilename ]) npmJsonStr
                                                                                    |> Task.attempt NpmPackageWritten
                                                                              ]
                                                                        , []
                                                                        )
                                                                   )
                                                        )
                                              )
                                    )
                        )

            NpmPackageWritten (Err error) ->
                errorLog ("Unable to write" +-+ npmJsonFilename +-+ "Error:" +-+ error)
                    |> operationError model

            NpmPackageWritten (Ok ()) ->
                config.skipNpmInstall
                    ? ( update config (NpmOperationComplete (Task.succeed "") <| Ok ()) model
                      , (Set.size model.npmPackages == 0)
                            ? ( ( model ! [], [ config.operationComplete 0 ] )
                              , Console.log "\n\n***** Npm installing *****"
                                    |> Task.mapError (always "Should never happen")
                                    |> Task.andThen
                                        (\_ ->
                                            Spawn.exec ("npm install" +-+ (config.npmProduction ? ( "-production", "" ))) 0 config.npmSilent
                                                |> Task.mapError Node.message
                                        )
                                    |> (\task -> ( model ! [ Task.attempt (NpmOperationComplete <| Console.log "\n\n***** Npm Install Complete *****\n") task ], [] ))
                              )
                      )

            NpmOperationComplete _ (Err error) ->
                errorLog ("Npm install failed:" +-+ error)
                    |> operationError model

            NpmOperationComplete logTask (Ok ()) ->
                config.noRewrite
                    ? ( logTask
                            |> Task.andThen (\_ -> warnLog "Skipping native code rewrite due to --no-rewrite")
                            |> Task.andThen (\_ -> warnLog "Native code may use wrong versions of node modules without further processing")
                            |> operationSuccessful model
                      , logTask
                            |> Task.perform OutputComplete
                            |> (\logCmd ->
                                    model.npmPackages
                                        |> Set.toList
                                        |> Rewriter.rewrite (rewriterConfig config (model.linkedRepos |> Dict.keys |> Set.fromList)) model.rewriterModel
                                        |> (\( rewriterModel, rewriteCmd ) -> ( { model | rewriterModel = rewriterModel } ! [ logCmd, rewriteCmd ], [] ))
                               )
                      )

            RewritingComplete count status ->
                (status == Rewriter.RewriteFailed)
                    ? ( ( model ! [], [ config.operationComplete -1 ] )
                      , (count == 0)
                            ? ( Task.succeed "", Console.log "\n\n***** Rewrite Complete *****" )
                            |> operationSuccessful model
                      )

            ElmJsonFileRead _ path _ _ _ (Err error) ->
                errorLog ("Unable to read:" +-+ elmJsonFilename +-+ "location:" +-+ path +-+ "Error:" +-+ error)
                    |> operationError model

            ElmJsonFileRead packageName path parentPath readOccurence maybeNpmReadInfo (Ok elmJsonStr) ->
                { model | elmJsonIndent = Just (model.elmJsonIndent ?= determineJsonIndent elmJsonStr) }
                    |> (\model ->
                            { model | readingElmJson = Set.remove packageName model.readingElmJson }
                                |> (\model ->
                                        (elmJsonStr |> decodeElmJson path)
                                            |??>
                                                (\elmJson ->
                                                    elmJson
                                                        |> processElmJson config model packageName parentPath readOccurence
                                                        |> (\( ( model, cmd ), msgs ) ->
                                                                maybeNpmReadInfo
                                                                    |?> (\( installState, npmJsonPath ) -> ( model ! [ cmd, Task.attempt (DependentNpmPackageRead { installState | maybeElmJson = Just elmJson }) <| FileSystem.readFileAsString npmJsonPath Utf8 ], msgs ))
                                                                    ?= ( model ! [ cmd ], msgs )
                                                           )
                                                )
                                            ??= (operationError model << errorLog)
                                   )
                       )

            RewriterMsg msg ->
                updateRewriter msg model


install : Config msg -> Model -> ( Model, Cmd msg )
install config model =
    { model | readingElmJson = Set.insert "" model.readingElmJson }
        ! [ Task.attempt (config.routeToMe << ElmJsonFileRead "" config.cwd "" Initial Nothing) <| FileSystem.readFileAsString elmJsonFilename Utf8 ]


getNpmPackages : Model -> List PackageName
getNpmPackages =
    Set.toList << .npmPackages
