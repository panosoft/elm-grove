module Version
    exposing
        ( Version
        , VersionStr
        , Range
        , versionFromString
        , versionToString
        , rangeFromVersion
        , rangeFromString
        , rangeToString
        , versionCompare
        , inRange
        , toRangeToNextMajorVersion
        , nextMajor
        , nextMinor
        , nextPatch
        )

import Regex
import StringUtils exposing (..)
import Utils.Ops exposing (..)


type alias Version =
    { major : Int
    , minor : Int
    , patch : Int
    }


type alias VersionStr =
    String


type Range
    = Range Version Version
    | ExactRange Version


get : Int -> List (Maybe String) -> String
get index list =
    (list !! index) ?= Just "" ?= ""


getNum : Int -> List (Maybe String) -> Int
getNum index list =
    (String.toInt <| get index list) ??= (always 0)


versionFromString : String -> Maybe Version
versionFromString versionStr =
    (Regex.find Regex.All (Regex.regex "^(\\d+)\\.(\\d+)\\.(\\d+)$") versionStr
        |> List.head
    )
        |?> (\match -> Version (getNum 0 match.submatches) (getNum 1 match.submatches) (getNum 2 match.submatches))


versionToString : Version -> String
versionToString version =
    toString version.major ++ "." ++ toString version.minor ++ "." ++ toString version.patch


rangeFromString : String -> Maybe Range
rangeFromString rangeStr =
    (Regex.find Regex.All (Regex.regex "^(\\d+\\.\\d+\\.\\d+)\\s+<=\\s+v\\s+<(=?)\\s+(\\d+\\.\\d+\\.\\d+)$") rangeStr
        |> List.head
    )
        |?> (\match ->
                (versionFromString <| get 0 match.submatches)
                    |?> (\from ->
                            (versionFromString <| get 2 match.submatches)
                                |?> (\to -> (get 1 match.submatches == "=") ? ( (from /= to) ? ( Nothing, Just <| ExactRange from ), Just <| Range from to ))
                                ?= Nothing
                        )
                    ?= Nothing
            )
        ?= Nothing


rangeFromVersion : Version -> Range
rangeFromVersion version =
    ExactRange version


rangeToString : Range -> String
rangeToString range =
    case range of
        Range from to ->
            versionToString from +-+ "<= v <" +-+ versionToString to

        ExactRange version ->
            versionToString version +-+ "<= v <=" +-+ versionToString version


versionCompare : Version -> Version -> Order
versionCompare v1 v2 =
    (v1.major == v2.major)
        ? ( (v1.minor == v2.minor)
                ? ( v1.patch - v2.patch
                  , v1.minor - v2.minor
                  )
          , v1.major - v2.major
          )
        |> (\diff ->
                (diff == 0)
                    ? ( EQ
                      , (diff > 0) ? ( GT, LT )
                      )
           )


inRange : Range -> Version -> Bool
inRange range version =
    case range of
        Range from to ->
            (List.member (versionCompare version from) [ EQ, GT ])
                ? ( versionCompare version to == LT
                  , False
                  )

        ExactRange exactVersion ->
            versionCompare version exactVersion == EQ


toRangeToNextMajorVersion : Version -> String
toRangeToNextMajorVersion version =
    rangeToString <| Range version { version | major = version.major + 1, minor = 0, patch = 0 }


nextMajor : Version -> Version
nextMajor version =
    { version | major = version.major + 1, minor = 0, patch = 0 }


nextMinor : Version -> Version
nextMinor version =
    { version | minor = version.minor + 1, patch = 0 }


nextPatch : Version -> Version
nextPatch version =
    { version | patch = version.patch + 1 }
