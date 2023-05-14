import { QueryFunction, UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "react-query"
import { DeleteShippingGroupParams, LocationDeleteParams, ShippingGroup, ShippingGroupFormData, ShippingGroupParams, ShippingLocation, ShippingLocationFormData, ShippingLocationsParams } from "../../config/data_types/shipping_types"
import { createShippingGroup, createShippingLocation, deleteShippingGroup, deleteShippingLocation, fetchShippingGroups, fetchShippingLocations, updateShippingGroup, updateShippingLocation } from "../services/shipping.services"
import { HttpDataResponse, PaginatedDataResponse } from "../../config/data_types/general.types"

export const ShippingQueryKeys = {
    fetchShippingGroups : "fetch/shipping/groups",
    fetchShippingLocations: "fetch/shipping/locations"
}
export const useShippingGroups = (params: ShippingGroupParams, options?: UseQueryOptions<ShippingGroupParams,HttpDataResponse,PaginatedDataResponse<ShippingGroup<string>[]>>) => {
    return useQuery<ShippingGroupParams,HttpDataResponse,PaginatedDataResponse<ShippingGroup<string>[]>>(
        [ShippingQueryKeys.fetchShippingGroups,params],
        (() => fetchShippingGroups(params)) as QueryFunction<ShippingGroupParams>,
        options
    )
}

export const useDeleteShippingGroups = (options?: UseMutationOptions<HttpDataResponse,HttpDataResponse,DeleteShippingGroupParams>) => {
    return useMutation<HttpDataResponse,HttpDataResponse,DeleteShippingGroupParams>(
        deleteShippingGroup, options
    )
}

export const useUpdateShippingGroup = (options?: UseMutationOptions<HttpDataResponse,HttpDataResponse,ShippingGroupFormData>) => {
    return useMutation<HttpDataResponse,HttpDataResponse,ShippingGroupFormData>(updateShippingGroup,options)
}

export const useCreateShippingGroup = (options?: UseMutationOptions<HttpDataResponse,HttpDataResponse,ShippingGroupFormData>) => {
    return useMutation<HttpDataResponse,HttpDataResponse,ShippingGroupFormData>(createShippingGroup,options)
}

export const useShippingLocations = (params: ShippingLocationsParams, options?: UseQueryOptions<ShippingLocationsParams,HttpDataResponse,PaginatedDataResponse<ShippingLocation[]>>) => {
    return useQuery<ShippingLocationsParams,HttpDataResponse,PaginatedDataResponse<ShippingLocation[]>>(
        [ShippingQueryKeys.fetchShippingLocations,params],
        (() => fetchShippingLocations(params)) as QueryFunction<ShippingLocationsParams>,
        options
    )
}

export const useCreateShippingLocation = (options?: UseMutationOptions<HttpDataResponse,HttpDataResponse,ShippingLocationFormData>) => {
    return useMutation<HttpDataResponse,HttpDataResponse,ShippingLocationFormData>(createShippingLocation,options)
}

export const useUpdateShippingLocation = (options?: UseMutationOptions<HttpDataResponse,HttpDataResponse,ShippingLocationFormData>) => {
    return useMutation<HttpDataResponse,HttpDataResponse,ShippingLocationFormData>(updateShippingLocation,options)
}

export const useDeleteShippingLocations = (options?: UseMutationOptions<HttpDataResponse,HttpDataResponse,LocationDeleteParams>) => {
    return useMutation<HttpDataResponse,HttpDataResponse,LocationDeleteParams>(
        deleteShippingLocation, options
    )
}
