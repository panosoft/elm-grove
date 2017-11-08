module LowLevel.Git
    exposing
        ( Path
        , Url
        , TagName
        , TargetDirectory
        , OidStr
        , Sha
        , Tag
        , Repo
        , Error
        , FileStatuses
        , Commit
        , clone
        , initRepo
        , getRepo
        , createLightweightTag
        , createAnnotatedTag
        , getTags
        , getFileStatuses
        , commit
        , checkoutCommit
        , checkout
        , getMasterCommit
        , getHeadCommit
        , getCommitTagHistory
        , getCommitSha
        , getTagShas
        )

import Task exposing (Task)
import Json.Decode as JD
import Native.Git


type alias Path =
    String


type alias Url =
    String


type alias TagName =
    String


type alias TargetDirectory =
    String


type alias OidStr =
    String


type alias Sha =
    String


type RepoOpaque
    = RepoOpaque


type alias Repo =
    { repo : RepoOpaque
    , url : Url
    , cloneLocation : Path
    }


type Tag
    = Tag


type Commit
    = Commit


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


clone : Url -> Path -> Task Error Repo
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


checkoutCommit : Repo -> Commit -> TargetDirectory -> Task Error ()
checkoutCommit =
    Native.Git.checkoutCommit


checkout : Repo -> TagName -> TargetDirectory -> Task Error ()
checkout =
    Native.Git.checkout


getMasterCommit : Repo -> Task Error Commit
getMasterCommit =
    Native.Git.getMasterCommit


getHeadCommit : Repo -> Task Error Commit
getHeadCommit =
    Native.Git.getHeadCommit


getCommitTagHistory : Repo -> Commit -> Task Error (List Commit)
getCommitTagHistory =
    Native.Git.getCommitTagHistory


getCommitSha : Commit -> Result Error Sha
getCommitSha =
    Native.Git.getCommitSha


getTagShas : Repo -> List TagName -> Task Error JD.Value
getTagShas =
    Native.Git.getTagShas
