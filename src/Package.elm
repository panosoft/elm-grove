module Package exposing (..)

import Dict exposing (Dict)
import Utils.Ops exposing (..)


type alias PackageSource =
    String


type alias PackageName =
    String


elmStuff : Bool -> String
elmStuff testing =
    testing ? ( "elm-test-stuff", "elm-stuff" )


elmPackagesRoot : Bool -> String -> String
elmPackagesRoot testing pathSep =
    String.join pathSep [ elmStuff testing, "packages" ]


exactDependenciesFileName : String
exactDependenciesFileName =
    "exact-dependencies.json"


elmVersion : Int -> String
elmVersion elmVersion =
    "0." ++ (toString elmVersion) ++ ".0 <= v < 0." ++ (toString <| elmVersion + 1) ++ ".0"


npmJsonFilename : String
npmJsonFilename =
    "package.json"


npmJsonLockFilename : String
npmJsonLockFilename =
    "package-lock.json"


elmJsonFilename : String
elmJsonFilename =
    "elm-package.json"


elmCorePackageName : String
elmCorePackageName =
    "elm-lang/core"


getRepoLocation : Maybe (Dict PackageName String) -> PackageName -> String
getRepoLocation sources packageName =
    Dict.get packageName (sources ?= Dict.empty)
        ?= defaultRepoLocation packageName


defaultGitServer : String
defaultGitServer =
    "https://github.com/"


defaultRepoLocation : String -> String
defaultRepoLocation packageName =
    defaultGitServer ++ packageName ++ ".git"
