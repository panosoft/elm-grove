module Console
    exposing
        ( log
        )

import Task exposing (Task)
import Native.Console


log : String -> Task Never String
log =
    Native.Console.log
