module ApiChanges
    exposing
        ( PackageApiChanges
        , ApiChange(..)
        , compareModuleDicts
        , moduleListToDict
        , packageApiChangesToString
        )

import Dict exposing (Dict)
import Regex
import Utils.Ops exposing (..)
import Utils.Regex exposing (..)
import Utils.Match exposing (..)
import StringUtils exposing (..)
import Docs.Generator as Docs exposing (..)
import Output exposing (..)


type alias Name =
    String


type alias Type =
    String


type alias PackageApiChanges =
    Dict Name ModuleApiChanges


type alias ModuleApiChanges =
    Dict Name ApiChange


type alias Annotation =
    String


type ApiChange
    = Addition Annotation
    | Change { old : Annotation, new : Annotation }
    | Deletion Annotation


type alias ModuleElements =
    { aliases : Dict Name Type
    , unions : Dict Name (Dict Name (List Type))
    , values : Dict Name Type
    }


type alias ModuleApiChangeReport =
    { additions : List String
    , changes : List String
    , deletions : List String
    }


removeRedundantTypes : String -> String
removeRedundantTypes code =
    code
        |> Regex.replace (Regex.All)
            (Regex.regex "(\\b\\w+\\b)\\.(\\b\\w+\\b)")
            (\match ->
                match
                    |> getSubmatches2
                    |> (\( w1, w2 ) -> (w1 == w2) ? ( w1, w1 ++ "." ++ w2 ))
            )


moduleApiChangesToString : ModuleApiChanges -> String
moduleApiChangesToString moduleApiChanges =
    moduleApiChanges
        |> Dict.toList
        |> List.foldl
            (\( name, apiChange ) changeReport ->
                case apiChange of
                    Addition annotation ->
                        { changeReport | additions = colorize green ("\t\t+" +-+ name +-+ ":" +-+ annotation) :: changeReport.additions }

                    Change { old, new } ->
                        { changeReport | changes = (colorize red ("\t\t-" +-+ name +-+ ":" +-+ old) ++ "\n" ++ colorize green ("\t\t+" +-+ name +-+ ":" +-+ new)) :: changeReport.changes }

                    Deletion annotation ->
                        { changeReport | deletions = colorize red ("\t\t-" +-+ name +-+ ":" +-+ annotation) :: changeReport.deletions }
            )
            { additions = []
            , changes = []
            , deletions = []
            }
        |> (\changeReport ->
                ""
                    ++ (changeReport.additions == [])
                    ? ( ""
                      , "\tAdded:\n"
                            ++ "\t-----\n"
                            ++ (changeReport.additions |> String.join "\n" |> removeRedundantTypes)
                      )
                    ++ (changeReport.changes == [])
                    ? ( ""
                      , "\n\n\tChanged:"
                            ++ "\n\t-------\n"
                            ++ (changeReport.changes |> String.join "\n\n" |> removeRedundantTypes)
                      )
                    ++ (changeReport.deletions == [])
                    ? ( ""
                      , "\n\n\tDeleted:"
                            ++ "\n\t-------\n"
                            ++ (changeReport.deletions |> String.join "\n" |> removeRedundantTypes)
                      )
           )


packageApiChangesToString : PackageApiChanges -> String
packageApiChangesToString packageApiChanges =
    "---------------------------------------------------------------------------------------------------------"
        |> (\separator ->
                packageApiChanges
                    |> Dict.toList
                    |> List.map
                        (\( moduleName, moduleApiChanges ) ->
                            moduleApiChangesToString moduleApiChanges
                                |> (\moduleChanges ->
                                        (moduleChanges == "")
                                            ? ( Nothing
                                              , Just <| "MODULE:" +-+ colorize magenta moduleName ++ "\n\n" ++ moduleChanges
                                              )
                                   )
                        )
                    |> List.filterMap identity
                    |> (\changes ->
                            (changes == [])
                                ? ( ""
                                  , changes
                                        |> String.join ("\n\n" ++ separator ++ "\n\n")
                                        |> replaceAll "\t" "  "
                                        |> (++) ("\n\n" ++ separator ++ "\n\n")
                                        |> flip (++) ("\n\n" ++ separator ++ "\n\n")
                                  )
                       )
           )


mtModuleElements : ModuleElements
mtModuleElements =
    { aliases = Dict.empty
    , unions = Dict.empty
    , values = Dict.empty
    }


type alias ModuleDict =
    Dict Name ModuleElements


compareNameTypeDicts : Dict Name Type -> Dict Name Type -> ModuleApiChanges -> ModuleApiChanges
compareNameTypeDicts currentDict previousDict moduleApiChanges =
    previousDict
        -- compare previous with current
        |> Dict.foldl
            (\name previousType changes ->
                changes
                    |> (Dict.get name currentDict
                            |?->
                                ( Dict.insert name <| Deletion previousType
                                , \currentType ->
                                    (currentType /= previousType)
                                        ? ( Dict.insert name <| Change { old = previousType, new = currentType }
                                          , identity
                                          )
                                )
                       )
            )
            moduleApiChanges
        -- find all in current but NOT previous
        |> (\moduleApiChanges ->
                currentDict
                    |> Dict.foldl
                        (\name previousType changes ->
                            changes
                                |> (Dict.get name previousDict |?-> ( Dict.insert name <| Addition previousType, always identity ))
                        )
                        moduleApiChanges
           )


parens : String -> String
parens s =
    "(" ++ s ++ ")"


parenFuncTypes : String -> String
parenFuncTypes type_ =
    (String.contains "->" type_) ? ( parens type_, type_ )


unionDictToNameTypeDict : Dict Name (Dict Name (List Type)) -> Dict Name Type
unionDictToNameTypeDict dict =
    dict
        |> Dict.map
            (\name sumTypesDict ->
                sumTypesDict
                    |> Dict.map (\name types -> ((name :: types) |> String.join " "))
                    |> Dict.values
                    |> String.join " | "
            )


compareModules : ModuleElements -> ModuleElements -> ModuleApiChanges
compareModules currentModule previousModule =
    Dict.empty
        -- compare aliases
        |> compareNameTypeDicts currentModule.aliases previousModule.aliases
        -- compare unions
        |> compareNameTypeDicts (unionDictToNameTypeDict currentModule.unions) (unionDictToNameTypeDict previousModule.unions)
        -- compare values
        |> compareNameTypeDicts currentModule.values previousModule.values


compareModuleDicts : ModuleDict -> ModuleDict -> PackageApiChanges
compareModuleDicts currentModules previousModules =
    previousModules
        |> Dict.foldl
            (\name previousModule packageApiChanges ->
                compareModules (Dict.get name currentModules ?= mtModuleElements) previousModule
                    |> (\moduleApiChanges -> Dict.insert name moduleApiChanges packageApiChanges)
            )
            Dict.empty
        |> (\packageApiChanges ->
                Dict.diff currentModules previousModules
                    |> Dict.foldl
                        (\name currentModule packageApiChanges ->
                            compareModules currentModule (Dict.get name previousModules ?= mtModuleElements)
                                |> (\moduleApiChanges -> Dict.insert name moduleApiChanges packageApiChanges)
                        )
                        packageApiChanges
           )


moduleListToDict : List Module -> ModuleDict
moduleListToDict modules =
    modules
        |> List.map
            (\module_ ->
                ( module_.name
                , { aliases =
                        module_.aliases
                            |> List.map (\alias_ -> ( alias_.name, alias_.type_ ))
                            |> Dict.fromList
                  , unions =
                        module_.unions
                            |> List.map
                                (\union ->
                                    union.tags
                                        |> List.map (\( name, types ) -> ( name, types ))
                                        |> Dict.fromList
                                        |> (,) ((union.name :: union.args) |> String.join " ")
                                )
                            |> Dict.fromList
                  , values =
                        module_.values
                            |> List.map (\value -> ( value.name, value.type_ ))
                            |> Dict.fromList
                  }
                )
            )
        |> Dict.fromList
