module AppUtils
    exposing
        ( bug
        , bugMissing
        , msgToCmd
        , pathJoin
        , writeFile
        , sortedVersions
        , determineJsonIndent
        , spawnSuccessCheck
        , spawnOutput
        )

import Task exposing (Task)
import Regex exposing (..)
import StringUtils exposing (..)
import Utils.Ops exposing (..)
import Utils.Regex exposing (..)
import Utils.Match exposing (..)
import Common exposing (..)
import Node.Error as Node exposing (Error(..))
import Node.FileSystem as FileSystem
import Node.Encoding as Encoding exposing (Encoding(..))
import Node.ChildProcess as ChildProcess exposing (..)
import Git exposing (..)
import Version exposing (..)


type alias Path =
    Common.Path


bug : String -> (a -> b)
bug message =
    (\_ -> Debug.crash ("BUG:" +-+ message))


bugMissing : String -> (a -> b)
bugMissing missing =
    (\_ -> Debug.crash ("BUG:" +-+ missing +-+ "missing"))


msgToCmd : msg -> Cmd msg
msgToCmd msg =
    Task.perform (always msg) (Task.succeed ())


pathJoin : String -> Path -> List String -> String
pathJoin pathSep rootDir pathParts =
    (pathParts |> List.filter ((/=) ""))
        |> (\pathParts ->
                List.head pathParts
                    |?-> ( False, \root -> String.left 1 root == pathSep )
                    |> (\isAbsolute ->
                            isAbsolute
                                ? ( pathParts, rootDir :: pathParts )
                                |> String.join pathSep
                       )
           )


writeFile : String -> String -> Task Node.Error ()
writeFile filename =
    FileSystem.writeFileFromString filename "666" Encoding.Utf8


sortedVersions : List TagName -> List Version
sortedVersions tags =
    tags
        |> List.filterMap versionFromString
        |> List.sortWith versionCompare
        |> List.reverse


determineJsonIndent : String -> Int
determineJsonIndent json =
    (json
        |> replaceAll "\\n" "†"
        |> find (AtMost 1) (regex "†(\\s*)\"")
        |> List.head
    )
        |?->
            ( 4
            , (\match ->
                match
                    |> getSubmatches1
                    |> String.length
              )
            )


spawnSuccessCheck : Int -> Exit -> Task String ()
spawnSuccessCheck successCode exit =
    case exit of
        Code code ->
            (code == successCode) ? ( Task.succeed (), Task.fail ("Exited with error code:" +-+ code) )

        Signal sig ->
            Task.fail ("Child process was terminated with:" +-+ sig)


spawnOutput : { config | npmSilent : Bool } -> ChildProcess.Output
spawnOutput config =
    config.npmSilent ? ( ChildProcess.Silent, ChildProcess.Verbose )
