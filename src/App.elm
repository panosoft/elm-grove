port module Grove.App exposing (..)

import Tuple
import Task exposing (Task)
import Dict exposing (Dict)
import Regex
import StringUtils exposing (..)
import AppUtils exposing (..)
import ParentChildUpdate exposing (..)
import Component.Install as Install exposing (..)
import Component.Uninstall as Uninstall exposing (..)
import Component.Bump as Bump exposing (..)
import Component.Init as Init exposing (..)
import Utils.Ops exposing (..)
import Package exposing (..)
import Console
import Output exposing (..)


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


installConfig : Flags -> PackageSourceDict -> Install.Config Msg
installConfig flags packageSourceDict =
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
    }


installCfg : Model -> Install.Config Msg
installCfg model =
    installConfig model.flags model.packageSourceDict


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


bumpConfig : Flags -> Bump.Config Msg
bumpConfig flags =
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
    }


bumpCfg : Model -> Bump.Config Msg
bumpCfg model =
    bumpConfig model.flags


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


initCommand : String -> Model -> ( Model, Cmd Msg )
initCommand command model =
    model.flags
        |> (\flags ->
                case command of
                    "install" ->
                        Install.init (installConfig flags model.packageSourceDict) InstallInitialized linkedReposFilename
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
                        Bump.init (bumpConfig flags) BumpInitialized
                            |> (\( bumpModel, maybeBumpCmd ) ->
                                    { model | bumpModel = Just bumpModel }
                                        ! [ maybeBumpCmd ?= msgToCmd UninstallInitialized ]
                               )

                    "init" ->
                        Init.init (initConfig flags) InitInitialized
                            |> (\( initModel, maybeInitCmd ) ->
                                    { model | initModel = Just initModel }
                                        ! [ maybeInitCmd ?= msgToCmd InitInitialized ]
                               )

                    _ ->
                        Debug.crash ("BUG: Unsupported command:" +-+ flags.command)
           )


init : Flags -> ( Model, Cmd Msg )
init flags =
    { flags = flags
    , packageSourceDict = Dict.empty
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
                                |> initCommand flags.command
                        )
           )


type Msg
    = Nop
    | DoCmd (Cmd Msg)
    | InstallInitialized
    | UninstallInitialized
    | BumpInitialized
    | InitInitialized
    | InstallForUninstall
    | ExitApp Int
    | InstallMsg (Install.Msg Msg)
    | UninstallMsg (Uninstall.Msg Msg)
    | BumpMsg (Bump.Msg Msg)
    | InitMsg (Init.Msg Msg)
    | FinishUninstall Int


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( (\model -> model.installModel ?!= bugMissing "install model")
    , (\model -> model.uninstallModel ?!= bugMissing "uninstall model")
    , (\model -> model.bumpModel ?!= bugMissing "bump model")
    , (\model -> model.initModel ?!= bugMissing "init model")
    )
        |> (\( getInstallModel, getUninstallModel, getBumpModel, getInitModel ) ->
                let
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

                        InstallForUninstall ->
                            (Task.perform (\_ -> Nop) <| Console.log "***** Reinstalling remaining packages *****\n")
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

                        InstallMsg msg ->
                            updateInstall msg model

                        UninstallMsg msg ->
                            updateUninstall msg model

                        BumpMsg msg ->
                            updateBump msg model

                        InitMsg msg ->
                            updateInit msg model
           )
