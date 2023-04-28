import { QueryFunction, UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "react-query";
import { GenericDataResponse, HttpDataResponse } from "../../config/data_types/general.types";
import { createStore, fetchStoreDashboard } from "../services/store.services";
import { DashboardData, StoreDashboardParams } from "../../config/data_types/store_types";

export const StoreQueryKeys = {
    fetchStoreDashboard: "fetch/store-dashboard"
}


export const useCreateStore = (options?: UseMutationOptions<HttpDataResponse,HttpDataResponse,FormData>) => {
    return useMutation<HttpDataResponse,HttpDataResponse,FormData>(createStore,options)
}

export const useStoreDashboard = (params: StoreDashboardParams,options?: UseQueryOptions<StoreDashboardParams,HttpDataResponse,GenericDataResponse<DashboardData>>) => {
    return useQuery<StoreDashboardParams,HttpDataResponse,GenericDataResponse<DashboardData>>(
       [StoreQueryKeys.fetchStoreDashboard,params], (() => fetchStoreDashboard(params)) as QueryFunction<StoreDashboardParams>,options
    )
}