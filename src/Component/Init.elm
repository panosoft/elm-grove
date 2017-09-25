module Component.Init exposing (..)

import Array
import Dict
import Task exposing (Task)
import Json.Encode as JE
import StringUtils exposing (..)
import Node.Error as Node
import Utils.Ops exposing (..)
import ElmJson exposing (..)
import Output exposing (..)
import Prompt exposing (..)
import AppUtils exposing (..)
import Package exposing (..)


type alias Config msg =
    { testing : Bool
    , routeToMe : Msg -> msg
    , operationComplete : Int -> msg
    , elmVersion : Int
    , cwd : String
    , pathSep : String
    }


type alias Model =
    { summary : Maybe String
    , repository : Maybe String
    , license : Maybe String
    , sourceDirectory : Maybe String
    }


init : Config msg -> msg -> ( Model, Maybe (Cmd msg) )
init config initializedMsg =
    ( { summary = Nothing
      , repository = Nothing
      , license = Nothing
      , sourceDirectory = Nothing
      }
    , Nothing
    )


operationError : Model -> Task Never String -> ( ( Model, Cmd Msg ), List msg )
operationError model task =
    ( model ! [ Task.perform (\_ -> OperationComplete -1) task ], [] )


operationSuccessful : Model -> Task Never String -> ( ( Model, Cmd Msg ), List msg )
operationSuccessful model task =
    ( model ! [ Task.perform (\_ -> OperationComplete 0) task ], [] )


pathJoin : Config msg -> List String -> String
pathJoin config pathParts =
    AppUtils.pathJoin config.pathSep config.cwd pathParts


type Msg
    = OperationComplete Int
    | PromptResponse Int PromptAccessor (Result String String)
    | PromptsComplete
    | ElmJsonWritten (Result Node.Error ())


update : Config msg -> Msg -> Model -> ( ( Model, Cmd Msg ), List msg )
update config msg model =
    case msg of
        OperationComplete exitCode ->
            ( model ! [], [ config.operationComplete exitCode ] )

        PromptResponse _ _ (Err error) ->
            (error == "canceled")
                ? ( ( model ! [], [] )
                  , errorLog ("Prompt error:" +-+ error)
                        |> operationError model
                  )
                |> (always <| ( model ! [], [ config.operationComplete -1 ] ))

        PromptResponse promptIndex accessor (Ok response) ->
            accessor model response
                |> (\model -> ( nextPrompt config model promptIndex, [] ))

        PromptsComplete ->
            { version = "0.0.0"
            , summary = model.summary ?!= bugMissing "summary"
            , repository = model.repository ?!= bugMissing "repository"
            , license = model.license ?!= bugMissing "license"
            , sourceDirectories = [ model.sourceDirectory ?!= bugMissing "sourceDirectory" ]
            , exposedModules = []
            , nativeModules = Nothing
            , dependencies = [ ( "elm-lang/core", Just "5.1.1 <= v < 6.0.0" ) ] |> Dict.fromList
            , dependencySources = Nothing
            , elmVersion = "0.18.0 <= v < 0.19.0"
            }
                |> elmJsonEncoder
                |> JE.encode 4
                |> writeFile (pathJoin config [ config.cwd, config.testing ? ( "test", "" ), elmJsonFilename ])
                |> Task.attempt ElmJsonWritten
                |> (\cmd -> ( model ! [ cmd ], [] ))

        ElmJsonWritten (Err error) ->
            errorLog ("Unable to write" +-+ elmJsonFilename +-+ "Error:" +-+ (Node.message error))
                |> operationError model

        ElmJsonWritten (Ok ()) ->
            ( model ! [], [ config.operationComplete 0 ] )


type alias PromptAccessor =
    Model -> String -> Model


prompts : List ( PromptAccessor, PromptOptions )
prompts =
    [ ( \model value -> { model | summary = Just value }
      , { defaultPrompt
            | prompt = "Summary of package []"
            , required = False
        }
      )
    , ( \model value -> { model | repository = Just value }
      , { defaultPrompt
            | prompt = "Repository name"
            , pattern = Just "^(?:[a-zA-Z](?:[-][a-zA-Z]+)*)+/(?:[a-zA-Z](?:[-_][a-zA-Z]+)*)+$"
            , message = Just "Invalid repo name... must be like: your-user-name/your-repo-name"
        }
      )
    , ( \model value -> { model | license = Just value }
      , { defaultPrompt
            | prompt = "License [BSD]"
            , pattern = Just "^[A-Za-z]+$"
            , message = Just "Invalid license name"
            , default = Just "BSD"
            , required = False
        }
      )
    , ( \model value -> { model | sourceDirectory = Just value }
      , { defaultPrompt
            | prompt = "Source directory [src]"
            , pattern = Just "^(?:[.]|[.]{2}|/?[A-Za-z0-9_-]+(?:/[A-Za-z0-9_-]+)*)$"
            , message = Just "Invalid path"
            , default = Just "src"
            , required = False
        }
      )
    ]


nextPrompt : Config msg -> Model -> Int -> ( Model, Cmd Msg )
nextPrompt config model promptIndex =
    (prompts
        |> Array.fromList
        |> Array.get promptIndex
    )
        |?->
            ( model ! [ msgToCmd PromptsComplete ]
            , \( accessor, promptOptions ) ->
                model
                    ! [ prompt promptOptions
                            |> Task.attempt (PromptResponse (promptIndex + 1) accessor)
                      ]
            )


initialize : Config msg -> Model -> ( Model, Cmd msg )
initialize config model =
    nextPrompt config model 0
        |> (\( model, cmd ) -> model ! [ Cmd.map config.routeToMe cmd ])
