import { QueryFunction, useQuery } from "react-query";
import { ProductSummary, StoreProductParams } from "../../config/data_types/product_types";
import { fetchStoreProducts } from "../services/product.services";
import { HttpDataResponse, PaginatedDataResponse } from "../../config/data_types/general.types";

export const ProductQueryKeys = {
    fetchStoreProducts: "fetch/store-products"
}

export const useStoreProducts = (params: StoreProductParams) => {
    return useQuery<StoreProductParams,HttpDataResponse,PaginatedDataResponse<ProductSummary[]>>(
        [ProductQueryKeys.fetchStoreProducts, params], 
        (() => fetchStoreProducts(params)) as QueryFunction<StoreProductParams>
    )
}