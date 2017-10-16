module Git
    exposing
        ( Url
        , TagName
        , Tag
        , Repo
        , Error
        , FileStatuses
        , fileStatusAccessors
        , clone
        , initRepo
        , getRepo
        , createLightweightTag
        , createAnnotatedTag
        , getTags
        , getFileStatuses
        , commit
        , checkout
        , printableRepo
        )

import Task exposing (Task)
import Native.Git


type alias Path =
    String


type alias Url =
    String


type alias TagName =
    String


type alias TargetDirectory =
    String


type OidStr
    = String


type RepoOpaque
    = RepoOpaque


type alias Repo =
    { repo : RepoOpaque
    , url : Url
    , cloneLocation : Path
    }


type Tag
    = Tag


type alias Error =
    String


type alias FileStatuses =
    { conflicted : List Path
    , deleted : List Path
    , modified : List Path
    , new : List Path
    , renamed : List Path
    , typeChange : List Path
    }


fileStatusAccessors : List ( FileStatuses -> List Path, String )
fileStatusAccessors =
    [ ( .conflicted, "conflicted" )
    , ( .deleted, "deleted" )
    , ( .modified, "modified" )
    , ( .new, "new" )
    , ( .renamed, "renamed" )
    , ( .typeChange, "typeChange" )
    ]


clone : Url -> Task Error Repo
clone =
    Native.Git.clone


initRepo : Path -> Task Error Repo
initRepo =
    Native.Git.initRepo


getRepo : Path -> Task Error Repo
getRepo =
    Native.Git.getRepo


createLightweightTag : Repo -> TagName -> Task Error Tag
createLightweightTag =
    Native.Git.createLightweightTag


createAnnotatedTag : Repo -> TagName -> String -> Task Error Tag
createAnnotatedTag =
    Native.Git.createAnnotatedTag


getTags : Repo -> Task Error (List TagName)
getTags =
    Native.Git.getTags


getFileStatuses : Repo -> Task Error FileStatuses
getFileStatuses =
    Native.Git.getFileStatuses


commit : Repo -> List Path -> List Path -> String -> Task Error OidStr
commit =
    Native.Git.commit


checkout : Repo -> TagName -> TargetDirectory -> Task Error ()
checkout =
    Native.Git.checkout


printableRepo : Repo -> String
printableRepo repo =
    repo
        |> (\{ url, cloneLocation } -> toString { url = url, cloneLocation = cloneLocation })
