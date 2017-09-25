module Dependency
    exposing
        ( DependencyPath
        , DependsOn
        , Dependencies
        , addToPath
        , isInPath
        , isDirectDependency
        )

import Dict exposing (Dict)
import Package exposing (..)
import Utils.Ops exposing (..)


type alias DependencyPath =
    String


type alias DependsOn =
    { packageName : PackageName
    , dependencyPath : DependencyPath
    }


type alias Dependencies =
    Dict PackageName (List DependsOn)


pathDelimiter : String
pathDelimiter =
    " -> "


addToPath : DependencyPath -> DependencyPath -> Maybe DependencyPath
addToPath parent child =
    (String.split pathDelimiter parent
        |> List.filter (\pathPart -> pathPart == child)
        |> List.head
    )
        |?> always Nothing
        ?= Just (parent ++ (parent == "") ? ( "", pathDelimiter ) ++ child)


isInPath : DependencyPath -> DependencyPath -> Bool
isInPath pathPart path =
    path
        |> String.split pathDelimiter
        |> List.filter ((==) pathPart)
        |> (==) []


isDirectDependency : DependencyPath -> Bool
isDirectDependency path =
    path
        |> String.split pathDelimiter
        |> List.length
        |> (==) 1
