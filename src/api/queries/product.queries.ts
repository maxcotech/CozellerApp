import { QueryFunction, UseQueryOptions, useQuery } from "react-query";
import { ProductSummary, StoreProductParams } from "../../config/data_types/product_types";
import { fetchStoreProducts } from "../services/product.services";
import { HttpDataResponse, PaginatedDataResponse } from "../../config/data_types/general.types";

export const ProductQueryKeys = {
    fetchStoreProducts: "fetch/store-products"
}

export const useStoreProducts = (params: StoreProductParams, options?: UseQueryOptions<StoreProductParams,HttpDataResponse,PaginatedDataResponse<ProductSummary[]>>) => {
    return useQuery<StoreProductParams,HttpDataResponse,PaginatedDataResponse<ProductSummary[]>>(
        [ProductQueryKeys.fetchStoreProducts, params], 
        (() => fetchStoreProducts(params)) as QueryFunction<StoreProductParams>,
        options
    )
}