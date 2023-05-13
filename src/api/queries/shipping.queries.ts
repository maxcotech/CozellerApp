import { QueryFunction, UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "react-query"
import { DeleteShippingGroupParams, ShippingGroup, ShippingGroupFormData, ShippingGroupParams } from "../../config/data_types/shipping_types"
import { deleteShippingGroup, fetchShippingGroups, updateShippingGroup } from "../services/shipping.services"
import { HttpDataResponse, PaginatedDataResponse } from "../../config/data_types/general.types"

export const ShippingQueryKeys = {
    fetchShippingGroups : "fetch/shipping/groups"
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