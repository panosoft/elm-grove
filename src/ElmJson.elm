module ElmJson
    exposing
        ( ElmJson
        , elmJsonDecoder
        , elmJsonEncoder
        , decodeElmJson
        )

import StringUtils exposing (..)
import Dict exposing (Dict)
import Package exposing (..)
import Json.Encode as JE
import Json.Decode as JD exposing (field)
import Utils.Json as Json exposing ((///), (<||))
import Utils.Ops exposing (..)
import Common exposing (..)


type alias ElmJson =
    { version : String
    , summary : String
    , repository : String
    , license : String
    , sourceDirectories : List String
    , exposedModules : List String
    , nativeModules : Maybe Bool
    , dependencies : Dict PackageName (Maybe String)
    , dependencySources : Maybe (Dict PackageName String)
    , elmVersion : String
    }


elmJsonDecoder : JD.Decoder ElmJson
elmJsonDecoder =
    JD.succeed ElmJson
        <|| (field "version" JD.string)
        <|| (field "summary" JD.string)
        <|| (field "repository" <|
                (JD.string
                    |> JD.andThen
                        (\repoPath ->
                            JD.succeed
                                (repoPath
                                    |> String.split "/"
                                    |> List.drop 3
                                    |> String.join "/"
                                )
                        )
                )
            )
        <|| (field "license" JD.string)
        <|| (field "source-directories" <| JD.list JD.string)
        <|| (field "exposed-modules" <| JD.list JD.string)
        <|| (JD.maybe <| field "native-modules" JD.bool)
        <|| (field "dependencies" <| JD.dict (JD.string |> JD.andThen (\rangeStr -> JD.succeed <| Just rangeStr)))
        <|| (JD.maybe <| field "dependency-sources" <| JD.dict JD.string)
        <|| (field "elm-version" JD.string)


elmJsonEncoder : ElmJson -> JE.Value
elmJsonEncoder elmJson =
    [ ( "version", JE.string elmJson.version )
    , ( "summary", JE.string elmJson.summary )
    , ( "repository", JE.string ("https://github.com/" ++ elmJson.repository) )
    , ( "license", JE.string elmJson.license )
    , ( "source-directories", JE.list <| List.map JE.string elmJson.sourceDirectories )
    , ( "exposed-modules", JE.list <| List.map JE.string elmJson.exposedModules )
    , ( "native-modules", Json.encMaybe JE.bool elmJson.nativeModules )
    , ( "dependencies"
      , JE.object <|
            (elmJson.dependencies
                |> Dict.toList
                |> List.map (\( key, value ) -> ( key, JE.string (value ?!= (\_ -> Debug.crash "missing dependency value")) ))
            )
      )
    , ( "dependency-sources"
      , Json.encMaybe
            (\sources ->
                JE.object <|
                    (sources
                        |> Dict.toList
                        |> List.map (\( key, value ) -> ( key, JE.string value ))
                    )
            )
            elmJson.dependencySources
      )
    , ( "elm-version", JE.string elmJson.elmVersion )
    ]
        |> List.filter (\( _, value ) -> value /= JE.null)
        |> JE.object


decodeElmJson : Path -> String -> Result String ElmJson
decodeElmJson path elmPackageJson =
    JD.decodeString elmJsonDecoder elmPackageJson
        |??> Ok
        ??= (\error -> Err ("Cannot decode JSON in" +-+ elmJsonFilename +-+ "location:" +-+ path +-+ "Error:" +-+ error))
