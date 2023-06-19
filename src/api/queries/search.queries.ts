import { QueryFunction, UseMutationOptions, useMutation, useQuery } from "react-query"
import { SearchHistoryItem, SearchParams, SearchResult } from "../../config/data_types/search_types"
import { GenericDataResponse, HttpDataResponse, PaginationParams } from "../../config/data_types/general.types"
import { fetchSearchHistory, generalSearch, saveSearchQuery } from "../services/search.services"

export const SearchQueryKeys = {
     generalSearch: "search/general",
     searchHistory: "search/history"
}

export const useGeneralSearch = (params: SearchParams) => {
     return useQuery<SearchParams, HttpDataResponse, GenericDataResponse<SearchResult>>(
          [SearchQueryKeys.generalSearch, params],
          (() => generalSearch(params)) as QueryFunction<SearchParams>
     )
}

export const useSearchHistory = (params: PaginationParams) => {
     return useQuery<PaginationParams, HttpDataResponse, GenericDataResponse<SearchHistoryItem[]>>(
          [SearchQueryKeys.searchHistory, params],
          (() => fetchSearchHistory(params)) as QueryFunction<PaginationParams>
     )
}


export const useSaveSearchQuery = (options: UseMutationOptions<HttpDataResponse, HttpDataResponse, string>) => {
     return useMutation<HttpDataResponse, HttpDataResponse, string>(
          saveSearchQuery,
          options
     )
}