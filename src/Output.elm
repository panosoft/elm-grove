module Output
    exposing
        ( green
        , red
        , yellow
        , cyan
        , magenta
        , colorize
        , parens
        , errorLog
        , warnLog
        )

import Task exposing (Task)
import Regex exposing (..)
import Utils.Ops exposing (..)
import Utils.Regex exposing (..)
import Utils.Match exposing (..)
import StringUtils exposing (..)
import Console exposing (..)


green : Int
green =
    32


red : Int
red =
    31


yellow : Int
yellow =
    33


cyan : Int
cyan =
    36


magenta : Int
magenta =
    35


colorize : Int -> String -> String
colorize color str =
    "\x1B[" ++ (toString color) ++ "m" ++ str ++ "\x1B[0m"


parens : String -> String
parens str =
    "(" ++ str ++ ")"


getPrefix : String -> ( String, String )
getPrefix msg =
    (msg
        |> replaceAll "\\n" "†"
        |> find (AtMost 1) (regex "^(†*)(.+$)")
        |> List.head
    )
        |?-> ( ( "", msg ), getSubmatches2 )
        |> (\( prefix, msg ) -> ( replaceAll "†" "\n" prefix, replaceAll "†" "\n" msg ))


errorLog : String -> Task Never String
errorLog msg =
    msg
        |> getPrefix
        |> (\( prefix, msg ) -> Console.log <| prefix ++ colorize red ("ERROR:" +-+ msg))


warnLog : String -> Task Never String
warnLog msg =
    msg
        |> getPrefix
        |> (\( prefix, msg ) -> Console.log <| prefix ++ colorize yellow ("WARNING:" +-+ msg))
