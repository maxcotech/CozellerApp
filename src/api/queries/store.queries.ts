import { QueryFunction, UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "react-query";
import { GenericDataResponse, HttpDataResponse } from "../../config/data_types/general.types";
import { createStore, fetchStoreDashboard, joinStore, searchStores, updateStore } from "../services/store.services";
import { DashboardData, JoinStoreFormData, Store, StoreDashboardParams } from "../../config/data_types/store_types";

export const StoreQueryKeys = {
    fetchStoreDashboard: "fetch/store-dashboard",
    searchStores: "search/stores"
}


export const useCreateStore = (options?: UseMutationOptions<HttpDataResponse,HttpDataResponse,FormData>) => {
    return useMutation<HttpDataResponse,HttpDataResponse,FormData>(createStore,options)
}

export const useStoreDashboard = (params: StoreDashboardParams,options?: UseQueryOptions<StoreDashboardParams,HttpDataResponse,GenericDataResponse<DashboardData>>) => {
    return useQuery<StoreDashboardParams,HttpDataResponse,GenericDataResponse<DashboardData>>(
       [StoreQueryKeys.fetchStoreDashboard,params], (() => fetchStoreDashboard(params)) as QueryFunction<StoreDashboardParams>,options
    )
}

export const useSearchStores = (query: string, options?: UseQueryOptions<string,HttpDataResponse,GenericDataResponse<Store[]>>) => {
    return useQuery<string,HttpDataResponse,GenericDataResponse<Store[]>>(
        [StoreQueryKeys.searchStores,query],
        (() => searchStores(query)) as QueryFunction<string>,
        options
    )
}

export const useJoinStore = (options?: UseMutationOptions<HttpDataResponse,HttpDataResponse,JoinStoreFormData>) => {
    return useMutation<HttpDataResponse,HttpDataResponse,JoinStoreFormData>(
        joinStore, options
    )
}

export const useUpdateStore = (options?: UseMutationOptions<HttpDataResponse,HttpDataResponse,FormData>) => {
    return useMutation<HttpDataResponse,HttpDataResponse,FormData>(updateStore,options)
}