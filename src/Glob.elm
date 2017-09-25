module Glob
    exposing
        ( find
        )

import Task exposing (Task)
import Node.Error as Error exposing (Error(..))
import Utils.Func exposing (..)
import Native.Glob


find : String -> Maybe String -> Bool -> Task Error (List (String))
find =
    Native.Glob.find
        |> compose3 (Task.mapError Error.fromValue)
