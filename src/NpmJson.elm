module NpmJson
    exposing
        ( replaceVersion
        , replaceDependencies
        , NpmDependencies
        , npmDependenciesDecoder
        , npmDependenciesEncoder
        , hasDependencies
        , validateNpmJson
        , decodeNpmJsonDependencies
        , decodeNpmJsonVersion
        )

import Dict exposing (Dict)
import Regex exposing (..)
import Json.Encode as JE
import Json.Decode as JD exposing (field)
import StringUtils exposing (..)
import Utils.Regex exposing (..)
import Utils.Ops exposing (..)
import Utils.Regex exposing (..)
import Package exposing (..)
import Version exposing (..)
import Output exposing (..)


versionRegex : String
versionRegex =
    "\"version\":\\s*\"\\d+\\.\\d+\\.\\d+\""


extractVersion : String -> Maybe ( String, String )
extractVersion json =
    replaceAll "\\n" "†" json
        |> (\singleLineJson ->
                (singleLineJson
                    |> find (AtMost 1) (regex versionRegex)
                    |> List.head
                )
                    |?> (\match ->
                            (replaceAll "†" "\n" match.match)
                                |> (\versionStr ->
                                        Just
                                            ( versionStr
                                                |> replaceFirst "\"version\":\\s*" ""
                                                |> replaceAll "\"" ""
                                            , singleLineJson
                                            )
                                   )
                        )
                    ?= Nothing
           )


replaceVersion : String -> String -> String
replaceVersion singleLineJson versionStr =
    singleLineJson
        |> replaceFirst versionRegex ("\"version\":" +-+ "\"" ++ versionStr ++ "\"")
        |> replaceAll "†" "\n"


dependenciesRegex : String
dependenciesRegex =
    """"dependencies":\\s*\\{.*?\\}"""


extractOrAddDependencies : String -> ( String, String )
extractOrAddDependencies json =
    replaceAll "\\n" "†" json
        |> (\singleLineJson ->
                (singleLineJson
                    |> find (AtMost 1) (regex dependenciesRegex)
                    |> List.head
                )
                    |?> (\match -> ( replaceAll "†" "\n" match.match, singleLineJson ))
                    ?= ( "  \"dependencies\":{\n}\n", replaceFirst "†\\}†*$" """,†  "dependencies": {†}†}†""" singleLineJson )
           )
        |> (\( dependenciesStr, singleLineJson ) -> ( replaceFirst "\"dependencies\":" "" dependenciesStr, singleLineJson ))


replaceDependencies : String -> String -> String
replaceDependencies singleLineJson dependenciesStr =
    singleLineJson
        |> replaceFirst dependenciesRegex ("\"dependencies\": " ++ dependenciesStr |> replaceAll "\\}$" "  }")
        |> replaceAll "†" "\n"


type alias NpmDependencies =
    Dict String String


npmDependenciesDecoder : JD.Decoder NpmDependencies
npmDependenciesDecoder =
    JD.dict JD.string


npmDependenciesEncoder : NpmDependencies -> JE.Value
npmDependenciesEncoder npmJson =
    npmJson
        |> Dict.toList
        |> List.map (\( key, value ) -> ( key, JE.string value ))
        |> JE.object


has : String -> String -> Bool
has fieldName json =
    (json |> (JD.decodeString <| JD.maybe <| field fieldName <| JD.dict JD.string))
        |??> (\maybeValue -> maybeValue |?> always True ?= False)
        ??= always False


hasDependencies : String -> Bool
hasDependencies json =
    [ "dependencies", "optionalDependencies" ]
        |> List.foldl (\fieldName result -> result || has fieldName json) False


validateName : String -> String -> Maybe (List String)
validateName name repository =
    (replaceFirst "\\.git$" "" repository)
        |> (\repository ->
                [ ( \name ->
                        name
                            |> String.split "/"
                            |> List.length
                            |> (/=) 2
                  , "should be in the format <user>/<repo>"
                  )
                , ( \name ->
                        String.left 1 name /= "@"
                  , "should start with an @"
                  )
                , ( \name -> name /= ("@" ++ repository)
                  , "should match elm json repository:" +-+ repository
                  )
                ]
                    |> List.filterMap
                        (\( check, error ) ->
                            check name ? ( Just ("npm name:" +-+ name +-+ error), Nothing )
                        )
                    |> (\errors -> (List.length errors == 0) ? ( Nothing, Just errors ))
           )


validateNpmJson : String -> String -> String -> Result (List String) ()
validateNpmJson json versionStr repository =
    [ (json |> (JD.decodeString <| JD.maybe (field "name" JD.string)))
        |??> (flip (|?->) ( Just [ "name is missing" ], \name -> validateName name repository ))
        ??= (\error -> Just [ ("cannot parse for name, error:" +-+ error) ])
    , (json |> (JD.decodeString <| JD.maybe <| field "version" <| JD.string))
        |??>
            (flip (|?->)
                ( Just [ "version is missing" ]
                , \versionStr2 ->
                    (versionStr2 /= versionStr)
                        ? ( Just [ "npm json version doesn't match elm json version" ], Nothing )
                )
            )
        ??= (\error -> Just [ ("cannot parse for version, error:" +-+ error) ])
    ]
        |> List.foldl (\maybeError errors -> maybeError |?-> ( errors, flip List.append errors )) []
        |> (\errors -> (errors == []) ? ( Ok (), Err errors ))


decodeNpmJsonDependencies : String -> Result String ( NpmDependencies, String )
decodeNpmJsonDependencies npmPackageJson =
    npmPackageJson
        |> extractOrAddDependencies
        |> (\( dependenciesStr, npmJsonStr ) ->
                (dependenciesStr |> JD.decodeString npmDependenciesDecoder)
                    |??> (\npmDependencies -> Ok ( npmDependencies, npmJsonStr ))
                    ??= ((\error -> Err ("Unable to decode dependencies in" +-+ npmJsonFilename +-+ "Error:" +-+ error)))
           )


decodeNpmJsonVersion : String -> Result String ( Version, String )
decodeNpmJsonVersion npmPackageJson =
    (npmPackageJson
        |> extractVersion
    )
        |?> (\( versionStr, npmJsonStr ) ->
                versionFromString versionStr
                    |?> (\version -> Ok ( version, npmJsonStr ))
                    ?= Err ("Bad version string in" +-+ npmJsonFilename +-+ parens versionStr)
            )
        ?= Err ("Missing version in" +-+ npmJsonFilename)
