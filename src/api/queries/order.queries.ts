import { QueryFunction, UseQueryOptions, useQuery } from "react-query";
import { SubOrder, SubOrderParams } from "../../config/data_types/order.types";
import { fetchSubOrders } from "../services/order.services";
import { HttpDataResponse, PaginatedDataResponse } from "../../config/data_types/general.types";

export const OrderQueryKeys = {
    fetchSubOrders: "fetch/sub-orders"
}

export const useSubOrders = (params: Partial<SubOrderParams>, options?: UseQueryOptions<Partial<SubOrderParams>, HttpDataResponse, PaginatedDataResponse<SubOrder[]>>) => {
    return useQuery<Partial<SubOrderParams>, HttpDataResponse, PaginatedDataResponse<SubOrder[]>>(
        [OrderQueryKeys.fetchSubOrders, params],
        (() => fetchSubOrders(params)) as QueryFunction<Partial<SubOrderParams>>,
        options
    )
}