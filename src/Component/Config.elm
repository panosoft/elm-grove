module Component.Config
    exposing
        ( ConfigFile
        , SafeMode(..)
        , GenerateDocs(..)
        , Config
        , Model
        , Msg
        , init
        , update
        , safeMode
        , generateDocs
        , configure
        )

import Task exposing (Task)
import Json.Decode as JD exposing (field)
import Json.Encode as JE
import AppUtils exposing (..)
import Common exposing (..)
import Console
import Output exposing (..)
import Node.FileSystem as FileSystem
import Node.Encoding as Encoding exposing (Encoding(..))
import Node.Error as Node exposing (Error(..), Code(..))
import Node.OperatingSystem exposing (..)
import Utils.Ops exposing (..)
import Utils.Json exposing (..)
import Utils.Task as Task exposing (..)
import StringUtils exposing (..)


type alias Config msg =
    { testing : Bool
    , routeToMe : Msg msg -> msg
    , operationComplete : Int -> msg
    , cwd : String
    , pathSep : String
    , configFilename : Filename
    , local : Maybe Bool
    , safe : Maybe String
    , docs : Maybe String
    }


type alias Model =
    { configFile : Maybe ConfigFile }


type SafeMode
    = SafeModeOn
    | SafeModeOff
    | SafeModeNone


type GenerateDocs
    = GenerateDocsOn
    | GenerateDocsOff


type alias ConfigFile =
    { safeMode : Maybe SafeMode
    , generateDocs : Maybe GenerateDocs
    }


defaultConfigFile : ConfigFile
defaultConfigFile =
    { safeMode = Nothing
    , generateDocs = Nothing
    }


defaultConfigFileString : String
defaultConfigFileString =
    defaultConfigFile
        |> encoder
        |> JE.encode 4


decoder : JD.Decoder ConfigFile
decoder =
    JD.succeed ConfigFile
        <|| (JD.maybe
                (field "safeMode" <| JD.string)
                |> JD.andThen
                    (\maybeSafe ->
                        JD.succeed <|
                            (maybeSafe
                                |?->
                                    ( Nothing
                                    , \safe ->
                                        Just
                                            (case String.toLower safe of
                                                "on" ->
                                                    SafeModeOn

                                                "off" ->
                                                    SafeModeOff

                                                _ ->
                                                    SafeModeNone
                                            )
                                    )
                            )
                    )
            )
        <|| (JD.maybe
                (field "generateDocs" <| JD.string)
                |> JD.andThen
                    (\maybeGenerateDocs ->
                        JD.succeed <|
                            (maybeGenerateDocs
                                |?->
                                    ( Nothing
                                    , \generateDocs ->
                                        Just
                                            (case String.toLower generateDocs of
                                                "on" ->
                                                    GenerateDocsOn

                                                _ ->
                                                    GenerateDocsOff
                                            )
                                    )
                            )
                    )
            )


encoder : ConfigFile -> JE.Value
encoder configFile =
    [ (configFile.safeMode
        |?->
            ( []
            , \safeMode ->
                [ ( "safeMode"
                  , JE.string <|
                        case safeMode of
                            SafeModeOn ->
                                "on"

                            SafeModeOff ->
                                "off"

                            SafeModeNone ->
                                "none"
                  )
                ]
            )
      )
    , (configFile.generateDocs
        |?->
            ( []
            , \generateDocs ->
                [ ( "generateDocs"
                  , JE.string <|
                        case generateDocs of
                            GenerateDocsOn ->
                                "on"

                            GenerateDocsOff ->
                                "off"
                  )
                ]
            )
      )
    ]
        |> List.concat
        |> JE.object


pathJoin : Config msg -> List String -> String
pathJoin config pathParts =
    AppUtils.pathJoin config.pathSep config.cwd pathParts


operationError : Model -> Task Never String -> ( ( Model, Cmd (Msg msg) ), List msg )
operationError model task =
    ( model ! [ Task.perform (\_ -> OperationComplete -1) task ], [] )


operationSuccessful : Model -> Task Never String -> ( ( Model, Cmd (Msg msg) ), List msg )
operationSuccessful model task =
    ( model ! [ Task.perform (\_ -> OperationComplete 0) task ], [] )


localOrGlobalPath : Config msg -> Path
localOrGlobalPath config =
    config.local |?-> ( homeDirectory, flip (?) ( ".", homeDirectory ) )


configPath : Config msg -> Path -> Path
configPath config path =
    pathJoin config [ config.testing ? ( "test", path ), config.configFilename ]


oldConfigPath : Config msg -> Path -> Path
oldConfigPath config path =
    pathJoin config [ config.testing ? ( "test", path ), String.dropLeft 1 config.configFilename ]


rename : Path -> Path -> Task ( Node.Error, Path ) ()
rename oldPath newPath =
    FileSystem.rename oldPath newPath
        |> Task.onError
            (\nodeError ->
                case nodeError of
                    SystemError code _ ->
                        (code == NoSuchFileOrDirectory) ? ( Task.succeed (), Task.fail ( nodeError, oldPath ) )

                    _ ->
                        Task.fail ( nodeError, oldPath )
            )


init : Config msg -> msg -> ( Model, Maybe (Cmd msg) )
init config initializedMsg =
    ( { configFile = Nothing }
    , Just <|
        (( configPath config ".", configPath config homeDirectory, oldConfigPath config ".", oldConfigPath config homeDirectory )
            |> (\( localPath, globalPath, oldLocalPath, oldGlobalPath ) ->
                    -- migrate old config filename
                    ( rename oldLocalPath localPath, rename oldGlobalPath globalPath )
                        |> Task.sequence2
                        |> Task.andThen
                            (\_ ->
                                FileSystem.readFileAsString localPath Utf8
                                    |> Task.onError
                                        (\nodeError ->
                                            case nodeError of
                                                SystemError code _ ->
                                                    (code == NoSuchFileOrDirectory) ? ( Task.succeed defaultConfigFileString, Task.fail ( nodeError, localPath ) )

                                                _ ->
                                                    Task.fail ( nodeError, localPath )
                                        )
                                    |> Task.andThen
                                        (\localData ->
                                            FileSystem.readFileAsString globalPath Utf8
                                                |> Task.andThen (\globalData -> Task.succeed ( localData, globalData ))
                                                |> Task.onError
                                                    (\nodeError ->
                                                        case nodeError of
                                                            SystemError code _ ->
                                                                (code == NoSuchFileOrDirectory) ? ( Task.succeed ( localData, defaultConfigFileString ), Task.fail ( nodeError, globalPath ) )

                                                            _ ->
                                                                Task.fail ( nodeError, globalPath )
                                                    )
                                        )
                                    |> Task.andThen (\( localData, globalData ) -> Task.succeed ( ( localData, localPath ), ( globalData, globalPath ) ))
                            )
                        |> Task.attempt (config.routeToMe << ConfigFileRead initializedMsg)
               )
        )
    )


type Msg msg
    = OperationComplete Int
    | ConfigFileRead msg (Result ( Node.Error, Path ) ( ( String, Path ), ( String, Path ) ))
    | ConfigurationComplete (Result Node.Error ())


update : Config msg -> Msg msg -> Model -> ( ( Model, Cmd (Msg msg) ), List msg )
update config msg model =
    case msg of
        OperationComplete exitCode ->
            ( model ! [], [ config.operationComplete exitCode ] )

        ConfigFileRead _ (Err ( error, path )) ->
            errorLog ("Unable to read:" +-+ path +-+ "Error:" +-+ error)
                |> operationError model

        ConfigFileRead initializedMsg (Ok ( ( localJson, localPath ), ( globalJson, globalPath ) )) ->
            (\path error ->
                errorLog ("Config file:" +-+ path +-+ "decoding error:" +-+ error)
                    |> operationError model
            )
                |> (\decodingError ->
                        ( JD.decodeString decoder localJson, JD.decodeString decoder globalJson )
                            |??**>
                                ( decodingError localPath
                                , decodingError globalPath
                                , \( localConfig, globalConfig ) ->
                                    { safeMode = localConfig.safeMode |?-> ( globalConfig.safeMode, Just )
                                    , generateDocs = localConfig.generateDocs |?-> ( globalConfig.generateDocs, Just )
                                    }
                                        |> \configFile -> ( { model | configFile = Just configFile } ! [], [ initializedMsg ] )
                                )
                   )

        ConfigurationComplete (Err error) ->
            errorLog ("Unable to write:" +-+ configPath config +-+ "Error:" +-+ error)
                |> operationError model

        ConfigurationComplete (Ok ()) ->
            Console.log ("Grove configuration updated")
                |> operationSuccessful model


safeMode : Config msg -> Model -> SafeMode
safeMode config model =
    model.configFile |?-> ( SafeModeNone, \configFile -> configFile.safeMode ?= SafeModeNone )


generateDocs : Config msg -> Model -> GenerateDocs
generateDocs config model =
    model.configFile |?-> ( GenerateDocsOff, \configFile -> configFile.generateDocs ?= GenerateDocsOff )


configure : Config msg -> Model -> ( Model, Cmd msg )
configure config model =
    (model.configFile ?!= bugMissing "configFile")
        |> (\configFile ->
                config.safe
                    |?->
                        ( configFile
                        , \safe ->
                            (case safe of
                                "on" ->
                                    Just SafeModeOn

                                "off" ->
                                    Just SafeModeOff

                                "none" ->
                                    Just SafeModeNone

                                "" ->
                                    Nothing

                                _ ->
                                    bug "Should never get here" <| always Nothing
                            )
                                |> (\safeMode -> { configFile | safeMode = safeMode })
                        )
           )
        |> (\configFile ->
                config.docs
                    |?->
                        ( configFile
                        , \docs ->
                            (case docs of
                                "on" ->
                                    Just GenerateDocsOn

                                "off" ->
                                    Just GenerateDocsOff

                                "" ->
                                    Nothing

                                _ ->
                                    bug "Should never get here" <| always Nothing
                            )
                                |> (\generateDocs -> { configFile | generateDocs = generateDocs })
                        )
           )
        |> (\configFile ->
                ((config.local ?= False)
                    ? ( config.configFilename, (configPath config <| localOrGlobalPath config) )
                )
                    |> (\path ->
                            { model | configFile = Just configFile }
                                ! [ (writeFile path <| JE.encode 2 (encoder configFile))
                                        |> Task.attempt (config.routeToMe << ConfigurationComplete)
                                  ]
                       )
           )
