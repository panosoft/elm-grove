module Git
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
        , fileStatusAccessors
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
        , printableRepo
        )

import Task exposing (Task)
import Dict exposing (Dict)
import Json.Decode as JD exposing (field)
import Utils.Ops exposing (..)
import Utils.Json as Json exposing ((///), (<||))
import LowLevel.Git exposing (..)


type alias Path =
    LowLevel.Git.Path


type alias Url =
    LowLevel.Git.Url


type alias TagName =
    LowLevel.Git.TagName


type alias TargetDirectory =
    LowLevel.Git.TargetDirectory


type alias OidStr =
    LowLevel.Git.OidStr


type alias Sha =
    LowLevel.Git.Sha


type alias Tag =
    LowLevel.Git.Tag


type alias Repo =
    LowLevel.Git.Repo


type alias Error =
    LowLevel.Git.Error


type alias FileStatuses =
    LowLevel.Git.FileStatuses


type alias Commit =
    LowLevel.Git.Commit


fileStatusAccessors : List ( FileStatuses -> List Path, String )
fileStatusAccessors =
    [ ( .conflicted, "conflicted" )
    , ( .deleted, "deleted" )
    , ( .modified, "modified" )
    , ( .new, "new" )
    , ( .renamed, "renamed" )
    , ( .typeChange, "typeChange" )
    ]


clone : Url -> Path -> Task Error Repo
clone =
    LowLevel.Git.clone


initRepo : Path -> Task Error Repo
initRepo =
    LowLevel.Git.initRepo


getRepo : Path -> Task Error Repo
getRepo =
    LowLevel.Git.getRepo


createLightweightTag : Repo -> TagName -> Task Error Tag
createLightweightTag =
    LowLevel.Git.createLightweightTag


createAnnotatedTag : Repo -> TagName -> String -> Task Error Tag
createAnnotatedTag =
    LowLevel.Git.createAnnotatedTag


getTags : Repo -> Task Error (List TagName)
getTags =
    LowLevel.Git.getTags


getFileStatuses : Repo -> Task Error FileStatuses
getFileStatuses =
    LowLevel.Git.getFileStatuses


commit : Repo -> List Path -> List Path -> String -> Task Error OidStr
commit =
    LowLevel.Git.commit


checkoutCommit : Repo -> Commit -> TargetDirectory -> Task Error ()
checkoutCommit =
    LowLevel.Git.checkoutCommit


checkout : Repo -> TagName -> TargetDirectory -> Task Error ()
checkout =
    LowLevel.Git.checkout


getMasterCommit : Repo -> Task Error Commit
getMasterCommit =
    LowLevel.Git.getMasterCommit


getHeadCommit : Repo -> Task Error Commit
getHeadCommit =
    LowLevel.Git.getHeadCommit


getCommitTagHistory : Repo -> Commit -> Task Error (List Commit)
getCommitTagHistory =
    LowLevel.Git.getCommitTagHistory


getCommitSha : Commit -> Result Error Sha
getCommitSha =
    LowLevel.Git.getCommitSha


type alias TagSha =
    { tagName : TagName
    , sha : Sha
    }


getTagShas : Repo -> List TagName -> Task Error (Dict TagName Sha)
getTagShas repo tagNames =
    JD.succeed TagSha
        <|| (field "tagName" JD.string)
        <|| (field "sha" JD.string)
        |> (\decoder ->
                LowLevel.Git.getTagShas repo tagNames
                    |> Task.andThen (Task.succeed << JD.decodeValue (JD.list decoder))
                    |> Task.andThen
                        (\decodeResults ->
                            decodeResults
                                |??->
                                    ( Task.fail
                                    , \tagShas ->
                                        tagShas
                                            |> List.map (\{ tagName, sha } -> ( tagName, sha ))
                                            |> Dict.fromList
                                            |> Task.succeed
                                    )
                        )
           )


printableRepo : Repo -> String
printableRepo repo =
    repo
        |> (\{ url, cloneLocation } -> toString { url = url, cloneLocation = cloneLocation })
