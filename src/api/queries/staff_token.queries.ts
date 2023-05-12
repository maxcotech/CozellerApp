import { QueryFunction, UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "react-query"
import { StaffToken, StaffTokenFormData, StaffTokenParams } from "../../config/data_types/staff_token.types"
import { createToken, deleteToken, fetchStaffTokens, toggleExpiry } from "../services/staff_token.services"
import { HttpDataResponse, PaginatedDataResponse } from "../../config/data_types/general.types"

export const StaffTokenQueryKeys = {
    fetchStaffTokens: "fetch/staff/tokens"
}


export const useStaffTokens = (params: StaffTokenParams, options?: UseQueryOptions<StaffTokenParams,HttpDataResponse,PaginatedDataResponse<StaffToken[]>>) => {
    return useQuery<StaffTokenParams,HttpDataResponse,PaginatedDataResponse<StaffToken[]>>(
        [StaffTokenQueryKeys.fetchStaffTokens,params],
        (() => fetchStaffTokens(params)) as QueryFunction<StaffTokenParams>,
        options
    )
}

export const useToggleTokenExpiry = (options?: UseMutationOptions<HttpDataResponse,HttpDataResponse,number>) => {
    return useMutation<HttpDataResponse,HttpDataResponse,number>(
        toggleExpiry, options
    )
}


export const useDeleteToken = (options?: UseMutationOptions<HttpDataResponse,HttpDataResponse,number>) => {
    return useMutation<HttpDataResponse,HttpDataResponse,number>(
        deleteToken, options
    )
}

export const useCreateToken = (options?: UseMutationOptions<HttpDataResponse,HttpDataResponse,StaffTokenFormData>) => {
    return useMutation<HttpDataResponse,HttpDataResponse,StaffTokenFormData>(createToken,options)
}