module Prompt exposing (..)

import Task exposing (Task)
import Native.Prompt


type alias PromptOptions =
    { pattern : Maybe String
    , message : Maybe String
    , prompt : String
    , required : Bool
    , default : Maybe String
    }


defaultPrompt : PromptOptions
defaultPrompt =
    { pattern = Nothing
    , message = Nothing
    , prompt = ""
    , required = True
    , default = Nothing
    }


prompt : PromptOptions -> Task String String
prompt =
    Native.Prompt.prompt
