import { QueryFunction, UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "react-query";
import { SubOrder, SubOrderParams, SubOrderStatusParams } from "../../config/data_types/order.types";
import { fetchSubOrders, updateOrderStatus } from "../services/order.services";
import { GenericDataResponse, HttpDataResponse, PaginatedDataResponse } from "../../config/data_types/general.types";

export const OrderQueryKeys = {
    fetchSubOrders: "fetch/sub-orders",
    fetchSubOrder: "fetch/sub-order"
}

export const useSubOrders = (params: Partial<SubOrderParams>, options?: UseQueryOptions<Partial<SubOrderParams>, HttpDataResponse, PaginatedDataResponse<SubOrder[]>>) => {
    return useQuery<Partial<SubOrderParams>, HttpDataResponse, PaginatedDataResponse<SubOrder[]>>(
        [OrderQueryKeys.fetchSubOrders, params],
        (() => fetchSubOrders(params)) as QueryFunction<Partial<SubOrderParams>>,
        options
    )
}

export const useSubOrder = (params: Partial<SubOrderParams>, options?: UseQueryOptions<Partial<SubOrderParams>, HttpDataResponse, GenericDataResponse<SubOrder>>) => {
    return useQuery<Partial<SubOrderParams>, HttpDataResponse, GenericDataResponse<SubOrder>>(
        [OrderQueryKeys.fetchSubOrder, params],
        (() => fetchSubOrders(params)) as QueryFunction<Partial<SubOrderParams>>,
        options
    )
}

export const useUpdateSubOrderStatus = (options?: UseMutationOptions<HttpDataResponse,HttpDataResponse,Partial<SubOrderStatusParams>>) => {
    return useMutation<HttpDataResponse,HttpDataResponse,Partial<SubOrderStatusParams>>(
        updateOrderStatus,
        options
    )
}