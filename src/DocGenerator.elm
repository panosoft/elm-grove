module DocGenerator
    exposing
        ( GeneratePrep(..)
        , elmDocsPath
        , docsJsonFilename
        , generateDocsJsonTask
        , generateDocs
        )

import Task exposing (Task)
import StringUtils exposing (..)
import Node.Error as Node exposing (Error(..), Code(..))
import Node.FileSystem as FileSystem
import Node.ChildProcess as ChildProcess exposing (..)
import AppUtils exposing (..)
import Common exposing (..)
import Utils.Ops exposing (..)
import Component.Config exposing (..)
import Docs.Generator as Docs


type alias Config =
    { testing : Bool
    , cwd : String
    , pathSep : String
    , generateDocs : GenerateDocs
    }


elmDocsPath : Path
elmDocsPath =
    "elm-docs"


docsJsonFilename : Path
docsJsonFilename =
    "documentation.json"


pathJoin : Config -> List String -> String
pathJoin config pathParts =
    AppUtils.pathJoin config.pathSep config.cwd pathParts


type GeneratePrep
    = GeneratePrepNothing
    | GeneratePrepInstallPackages


generateDocsJsonTask : Path -> Path -> GeneratePrep -> Task String ()
generateDocsJsonTask sourcePath docsJsonPath generatePrep =
    ("cd" +-+ sourcePath +-+ ((generatePrep == GeneratePrepInstallPackages) ? ( "&& grove install", "" )) +-+ "&& elm-make --docs" +-+ docsJsonPath)
        |> (\cmd ->
                spawn cmd Silent
                    |> Task.mapError (\error -> "Elm compilation failure:" +-+ Node.message error)
                    |> Task.andThen (spawnSuccessCheck 0)
                    |> Task.onError
                        (\error ->
                            spawn cmd Verbose
                                |> Task.onError (\_ -> Task.fail error)
                                |> Task.andThen (spawnSuccessCheck 0)
                        )
           )


generateDocs : Config -> Task Node.Error ()
generateDocs config =
    FileSystem.remove (pathJoin config [ config.cwd, config.testing ? ( "test", "" ), elmDocsPath ])
        |> Task.andThen
            (\_ ->
                (config.generateDocs == GenerateDocsOn)
                    ? ( generateDocsJsonTask "." docsJsonFilename GeneratePrepNothing
                            |> Task.andThen (\_ -> Docs.generate config.pathSep docsJsonFilename <| pathJoin config [ ".", elmDocsPath ])
                            |> Task.mapError (\error -> Node.Error error "")
                      , Task.succeed ()
                      )
            )
