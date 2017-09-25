module Common exposing (..)

import Task exposing (Task)


type alias Path =
    String


type alias Filename =
    String


type alias LogTask =
    Task Never String


type alias LogTasks =
    List LogTask
