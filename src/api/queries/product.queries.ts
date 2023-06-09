import { QueryFunction, UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "react-query";
import { Product, ProductFormData, ProductSummary, StoreProductParams } from "../../config/data_types/product_types";
import { createProduct, deleteProduct, fetchProduct, fetchStoreProducts, updateProduct } from "../services/product.services";
import { GenericDataResponse, HttpDataResponse, PaginatedDataResponse } from "../../config/data_types/general.types";

export const ProductQueryKeys = {
    fetchStoreProducts: "fetch/store-products",
    fetchProduct: "fetch/product"
}

export const useStoreProducts = (params: StoreProductParams, options?: UseQueryOptions<StoreProductParams,HttpDataResponse,PaginatedDataResponse<ProductSummary[]>>) => {
    return useQuery<StoreProductParams,HttpDataResponse,PaginatedDataResponse<ProductSummary[]>>(
        [ProductQueryKeys.fetchStoreProducts, params], 
        (() => fetchStoreProducts(params)) as QueryFunction<StoreProductParams>,
        options
    )
}

export const useProduct = (id: string | number, options?: UseQueryOptions<string | number,HttpDataResponse,GenericDataResponse<Product>>) => {
    return useQuery<string | number,HttpDataResponse,GenericDataResponse<Product>>(
        [ProductQueryKeys.fetchProduct, id],
        (() => fetchProduct(id)) as QueryFunction<string | number>,
        options
    )
}

export const useCreateProduct = (options: UseMutationOptions<HttpDataResponse,HttpDataResponse,Partial<ProductFormData>>) => {
    return useMutation<HttpDataResponse,HttpDataResponse,Partial<ProductFormData>>(
        createProduct, options
    )
}

export const useUpdateProduct = (options: UseMutationOptions<HttpDataResponse,HttpDataResponse,Partial<ProductFormData>>) => {
    return useMutation<HttpDataResponse,HttpDataResponse,Partial<ProductFormData>>(
        updateProduct, options
    )
}

export const useDeleteProduct = (options: UseMutationOptions<HttpDataResponse,HttpDataResponse,number>) => {
    return useMutation<HttpDataResponse,HttpDataResponse,number>(
        deleteProduct, options
    )
}