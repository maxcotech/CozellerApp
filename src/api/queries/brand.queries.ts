import { UseMutationOptions, useMutation, useQuery } from "react-query"
import { Brand, BrandParams } from "../../config/data_types/brand_types"
import { createBrand, fetchBrands } from "../services/brand.services"
import { HttpDataResponse, PaginatedDataResponse } from "../../config/data_types/general.types"

export const BrandQueryKeys = {
    fetchBrands: "fetch/Brands"
}

export const useBrands = (params: BrandParams) => {
    return useQuery<BrandParams,HttpDataResponse,PaginatedDataResponse<Brand[]>>(
        [BrandQueryKeys.fetchBrands, params],
        (() => fetchBrands(params)) 
    )
}

export const useCreateBrand = (options?: UseMutationOptions<HttpDataResponse,HttpDataResponse,FormData>) => {
    return useMutation<HttpDataResponse,HttpDataResponse,FormData>(
        createBrand, options
    )
}