port module Grove.App exposing (..)

import Tuple
import Task exposing (Task)
import Dict exposing (Dict)
import Regex
import StringUtils exposing (..)
import AppUtils exposing (..)
import Node.Error as Node exposing (Error(..), Code(..))
import ParentChildUpdate exposing (..)
import Component.Config as Config exposing (..)
import Component.Install as Install exposing (..)
import Component.Uninstall as Uninstall exposing (..)
import Component.Bump as Bump exposing (..)
import Component.Init as Init exposing (..)
import Utils.Ops exposing (..)
import Package exposing (..)
import Console
import Output exposing (..)
import DocGenerator exposing (..)


port exitApp : Int -> Cmd msg


type alias Options =
    { link : Bool
    , dryRun : Bool
    , npmProduction : Bool
    , npmSilent : Bool
    , major : Bool
    , minor : Bool
    , patch : Bool
    , allowUncommitted : Bool
    , allowOldDependencies : Bool
    , noRewrite : Bool
    , local : Maybe Bool
    , safe : Maybe String
    , docs : Maybe String
    }


type alias Flags =
    { elmVersion : Int
    , testing : Bool
    , cwd : String
    , pathSep : String
    , command : String
    , options : Options
    , packages : List String
    }


type alias PackageSourceDict =
    Dict PackageName PackageSource


type alias Model =
    { flags : Flags
    , packageSourceDict : PackageSourceDict
    , configModel : Maybe Config.Model
    , installModel : Maybe Install.Model
    , uninstallModel : Maybe Uninstall.Model
    , bumpModel : Maybe Bump.Model
    , initModel : Maybe Init.Model
    }


main : Program Flags Model Msg
main =
    Platform.programWithFlags
        { init = init
        , update = update
        , subscriptions = always Sub.none
        }


linkedReposFilename : String
linkedReposFilename =
    "grove-links.json"


configFilename : String
configFilename =
    "grove-config.json"


parsePackages : List PackageName -> Result (List String) PackageSourceDict
parsePackages packages =
    packages
        |> List.map (\package -> ( package, Regex.find Regex.All (Regex.regex "(.+?[/:])?([a-zA-Z0-9\\-]+/[a-zA-Z0-9\\-]+)(\\.git)?$") package ))
        |> (\parseResults ->
                parseResults
                    |> List.filterMap (\( package, found ) -> List.head found |?-> ( Just ( package, found ), always Nothing ))
                    |> List.map Tuple.first
                    |> (\badPackageNames ->
                            (badPackageNames /= [])
                                ? ( Err badPackageNames
                                  , (packages == [])
                                        ? ( Dict.empty
                                          , parseResults
                                                |> List.filterMap (List.head << Tuple.second)
                                                |> List.map
                                                    (\match ->
                                                        case match.submatches of
                                                            [ Just source, Just packageName, Nothing ] ->
                                                                ( packageName, source ++ packageName )

                                                            [ Nothing, Just packageName, Nothing ] ->
                                                                ( packageName, defaultRepoLocation packageName )

                                                            [ Nothing, Just packageName, Just extension ] ->
                                                                ( packageName, defaultGitServer ++ packageName ++ extension )

                                                            [ Just source, Just packageName, Just extension ] ->
                                                                ( packageName, source ++ packageName ++ extension )

                                                            _ ->
                                                                Debug.crash "BUG: Should never get here"
                                                    )
                                                |> Dict.fromList
                                          )
                                        |> Ok
                                  )
                       )
           )


configConfig : Flags -> Config.Config Msg
configConfig flags =
    { testing = flags.testing
    , routeToMe = ConfigMsg
    , operationComplete = ExitApp
    , cwd = flags.cwd
    , pathSep = flags.pathSep
    , configFilename = configFilename
    , local = flags.options.local
    , safe = flags.options.safe |?> String.toLower
    , docs = flags.options.docs |?> String.toLower
    }


configCfg : Model -> Config.Config Msg
configCfg model =
    configConfig model.flags


installConfig : Model -> Flags -> PackageSourceDict -> Install.Config Msg
installConfig model flags packageSourceDict =
    configConfig flags
        |> \configCfg ->
            { testing = flags.testing
            , linking = flags.options.link
            , dryRun = flags.options.dryRun
            , npmProduction = flags.options.npmProduction
            , npmSilent = flags.options.npmSilent
            , noRewrite = flags.options.noRewrite
            , skipNpmInstall = (flags.command == "install") ? ( False, True )
            , routeToMe = InstallMsg
            , operationComplete = (flags.command == "install") ? ( ExitApp, FinishUninstall )
            , elmVersion = flags.elmVersion
            , cwd = flags.cwd
            , pathSep = flags.pathSep
            , packages = (flags.command == "install") ? ( Just <| Dict.keys packageSourceDict, Nothing )
            , sources = packageSourceDict
            , safeMode = Config.safeMode configCfg (model.configModel ?!= bugMissing "configModel")
            }


installCfg : Model -> Install.Config Msg
installCfg model =
    installConfig model model.flags model.packageSourceDict


uninstallConfig : Flags -> PackageSourceDict -> Uninstall.Config Msg
uninstallConfig flags packageSourceDict =
    { testing = flags.testing
    , npmProduction = flags.options.npmProduction
    , npmSilent = flags.options.npmSilent
    , noRewrite = flags.options.noRewrite
    , routeToMe = UninstallMsg
    , installMsg = InstallForUninstall
    , operationComplete = ExitApp
    , cwd = flags.cwd
    , pathSep = flags.pathSep
    , packages = (packageSourceDict == Dict.empty) ? ( Nothing, Just <| Dict.keys packageSourceDict )
    }


uninstallCfg : Model -> Uninstall.Config Msg
uninstallCfg model =
    uninstallConfig model.flags model.packageSourceDict


bumpConfig : Model -> Flags -> Bump.Config Msg
bumpConfig model flags =
    configConfig flags
        |> \configCfg ->
            { testing = flags.testing
            , dryRun = flags.options.dryRun
            , major = flags.options.major
            , minor = flags.options.minor
            , patch = flags.options.patch
            , allowUncommitted = flags.options.allowUncommitted
            , allowOldDependencies = flags.options.allowOldDependencies
            , routeToMe = BumpMsg
            , operationComplete = ExitApp
            , elmVersion = flags.elmVersion
            , cwd = flags.cwd
            , pathSep = flags.pathSep
            , generateDocs = Config.generateDocs configCfg (model.configModel ?!= bugMissing "configModel")
            }


bumpCfg : Model -> Bump.Config Msg
bumpCfg model =
    bumpConfig model model.flags


initConfig : Flags -> Init.Config Msg
initConfig flags =
    { testing = flags.testing
    , routeToMe = InitMsg
    , operationComplete = ExitApp
    , elmVersion = flags.elmVersion
    , cwd = flags.cwd
    , pathSep = flags.pathSep
    }


initCfg : Model -> Init.Config Msg
initCfg model =
    initConfig model.flags


initConfigModule : String -> Model -> ( Model, Cmd Msg )
initConfigModule command model =
    Config.init (configConfig model.flags) (ConfigInitialized command)
        |> (\( configModel, maybeConfigCmd ) ->
                { model | configModel = Just configModel }
                    ! [ maybeConfigCmd ?= msgToCmd (ConfigInitialized command) ]
           )


initCommand : String -> Model -> ( Model, Cmd Msg )
initCommand command model =
    model.flags
        |> (\flags ->
                case command of
                    "config" ->
                        bug "Should never get here" |> always (model ! [])

                    "install" ->
                        Install.init (installConfig model flags model.packageSourceDict) InstallInitialized linkedReposFilename
                            |> (\( installModel, maybeInstallCmd ) ->
                                    { model | installModel = Just installModel }
                                        ! [ maybeInstallCmd ?= msgToCmd InstallInitialized ]
                               )

                    "uninstall" ->
                        Uninstall.init (uninstallConfig flags model.packageSourceDict) UninstallInitialized
                            |> (\( uninstallModel, maybeUninstallCmd ) ->
                                    { model | uninstallModel = Just uninstallModel }
                                        ! [ maybeUninstallCmd ?= msgToCmd UninstallInitialized ]
                               )

                    "bump" ->
                        Bump.init (bumpConfig model flags) BumpInitialized
                            |> (\( bumpModel, maybeBumpCmd ) ->
                                    { model | bumpModel = Just bumpModel }
                                        ! [ maybeBumpCmd ?= msgToCmd BumpInitialized ]
                               )

                    "init" ->
                        Init.init (initConfig flags) InitInitialized
                            |> (\( initModel, maybeInitCmd ) ->
                                    { model | initModel = Just initModel }
                                        ! [ maybeInitCmd ?= msgToCmd InitInitialized ]
                               )

                    "docs" ->
                        DocGenerator.generateDocs
                            { testing = flags.testing
                            , cwd = flags.cwd
                            , pathSep = flags.pathSep
                            , generateDocs = GenerateDocsOn
                            }
                            |> (\task -> model ! [ Task.attempt DocsGenerated task ])

                    _ ->
                        Debug.crash ("BUG: Unsupported command:" +-+ flags.command)
           )


init : Flags -> ( Model, Cmd Msg )
init flags =
    { flags = flags
    , packageSourceDict = Dict.empty
    , configModel = Nothing
    , installModel = Nothing
    , uninstallModel = Nothing
    , bumpModel = Nothing
    , initModel = Nothing
    }
        |> (\model ->
                parsePackages flags.packages
                    |??->
                        ( \badPackageNames ->
                            model
                                ! [ Task.perform (\_ -> DoCmd <| exitApp -1)
                                        (errorLog ("The following package names are invalid:\n\n\t" ++ (String.join "\n\t" badPackageNames)))
                                  ]
                        , \packageSourceDict ->
                            { model | packageSourceDict = packageSourceDict }
                                |> initConfigModule flags.command
                        )
           )


type Msg
    = Nop
    | DoCmd (Cmd Msg)
    | ConfigInitialized String
    | InstallInitialized
    | UninstallInitialized
    | BumpInitialized
    | InitInitialized
    | DocsGenerated (Result Node.Error ())
    | InstallForUninstall
    | ExitApp Int
    | ConfigMsg (Config.Msg Msg)
    | InstallMsg (Install.Msg Msg)
    | UninstallMsg (Uninstall.Msg Msg)
    | BumpMsg (Bump.Msg Msg)
    | InitMsg (Init.Msg Msg)
    | FinishUninstall Int


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( (\model -> model.configModel ?!= bugMissing "config model")
    , (\model -> model.installModel ?!= bugMissing "install model")
    , (\model -> model.uninstallModel ?!= bugMissing "uninstall model")
    , (\model -> model.bumpModel ?!= bugMissing "bump model")
    , (\model -> model.initModel ?!= bugMissing "init model")
    )
        |> (\( getConfigModel, getInstallModel, getUninstallModel, getBumpModel, getInitModel ) ->
                let
                    updateConfig =
                        updateChildApp (Config.update <| configCfg model) update getConfigModel ConfigMsg (\model configModel -> { model | configModel = Just configModel })

                    updateInstall =
                        updateChildApp (Install.update <| installCfg model) update getInstallModel InstallMsg (\model installModel -> { model | installModel = Just installModel })

                    updateUninstall =
                        updateChildApp (Uninstall.update <| uninstallCfg model) update getUninstallModel UninstallMsg (\model uninstallModel -> { model | uninstallModel = Just uninstallModel })

                    updateBump =
                        updateChildApp (Bump.update <| bumpCfg model) update getBumpModel BumpMsg (\model bumpModel -> { model | bumpModel = Just bumpModel })

                    updateInit =
                        updateChildApp (Init.update <| initCfg model) update getInitModel InitMsg (\model initModel -> { model | initModel = Just initModel })
                in
                    case msg of
                        Nop ->
                            model ! []

                        DoCmd cmd ->
                            model ! [ cmd ]

                        ConfigInitialized command ->
                            (command == "config")
                                ? ( Config.configure (configCfg model) (getConfigModel model)
                                        |> (\( configModel, cmd ) -> { model | configModel = Just configModel } ! [ cmd ])
                                  , initCommand command model
                                  )

                        InstallInitialized ->
                            Install.install (installCfg model) (getInstallModel model)
                                |> (\( installModel, cmd ) -> { model | installModel = Just installModel } ! [ cmd ])

                        UninstallInitialized ->
                            Uninstall.uninstall (uninstallCfg model) (getUninstallModel model)
                                |> (\( uninstallModel, cmd ) -> { model | uninstallModel = Just uninstallModel } ! [ cmd ])

                        BumpInitialized ->
                            Bump.bump (bumpCfg model) (getBumpModel model)
                                |> (\( bumpModel, cmd ) -> { model | bumpModel = Just bumpModel } ! [ cmd ])

                        InitInitialized ->
                            Init.initialize (initCfg model) (getInitModel model)
                                |> (\( initModel, cmd ) -> { model | initModel = Just initModel } ! [ cmd ])

                        DocsGenerated (Err error) ->
                            errorLog ("Failed to create Elm Docs Error:" +-+ (Node.message error))
                                |> Task.perform (\_ -> ExitApp -1)
                                |> (\cmd -> model ! [ cmd ])

                        DocsGenerated (Ok ()) ->
                            Console.log "Elm Docs created"
                                |> Task.perform (\_ -> ExitApp 0)
                                |> (\cmd -> model ! [ cmd ])

                        InstallForUninstall ->
                            Console.log "***** Reinstalling remaining packages *****\n"
                                |> Task.perform (\_ -> Nop)
                                |> (\cmd ->
                                        initCommand "install" model
                                            |> (\( model, initCmd ) -> model ! [ cmd, initCmd ])
                                   )

                        FinishUninstall exitCode ->
                            (exitCode /= 0)
                                ? ( update (ExitApp exitCode) model
                                  , Uninstall.installComplete (uninstallCfg model) (getUninstallModel model) (Install.getNpmPackages <| getInstallModel model)
                                        |> (\( uninstallModel, cmd ) -> { model | uninstallModel = Just uninstallModel } ! [ cmd ])
                                  )

                        ExitApp exitCode ->
                            model ! [ exitApp exitCode ]

                        ConfigMsg msg ->
                            updateConfig msg model

                        InstallMsg msg ->
                            updateInstall msg model

                        UninstallMsg msg ->
                            updateUninstall msg model

                        BumpMsg msg ->
                            updateBump msg model

                        InitMsg msg ->
                            updateInit msg model
           )
