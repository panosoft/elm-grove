module Spawn
    exposing
        ( exec
        )

import Task exposing (Task)
import Node.Error as Error exposing (Error(..))
import Utils.Func exposing (..)
import Native.Spawn


exec : String -> Int -> Bool -> Task Error ()
exec =
    Native.Spawn.exec
        |> compose3 (Task.mapError Error.fromValue)
