module DocGenerator
    exposing
        ( elmDocsPath
        , generateDocs
        )

import Task exposing (Task)
import StringUtils exposing (..)
import Node.Error as Node exposing (Error(..), Code(..))
import Node.FileSystem as FileSystem
import AppUtils exposing (..)
import Common exposing (..)
import Utils.Ops exposing (..)
import Component.Config exposing (..)
import Env
import Docs.Generator as Docs
import Spawn


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


generateDocs : Config -> Task Node.Error ()
generateDocs config =
    FileSystem.remove (pathJoin config [ config.cwd, config.testing ? ( "test", "" ), elmDocsPath ])
        |> Task.andThen
            (\_ ->
                (config.generateDocs == GenerateDocsOn)
                    ? ( pathJoin config [ Env.tmpdir, docsJsonFilename ]
                            |> (\docsJsonFilename ->
                                    Spawn.exec ("elm-make --docs" +-+ docsJsonFilename) 0 True
                                        |> Task.mapError (\error -> "Elm compilation failure:" +-+ Node.message error)
                                        |> Task.onError
                                            (\error ->
                                                Spawn.exec ("elm-make --docs" +-+ docsJsonFilename) 0 False
                                                    |> Task.onError (\_ -> Task.fail error)
                                            )
                                        |> Task.andThen (\_ -> Docs.generate config.pathSep docsJsonFilename <| pathJoin config [ ".", elmDocsPath ])
                                        |> Task.mapError (\error -> Node.Error error "")
                               )
                      , Task.succeed ()
                      )
            )
