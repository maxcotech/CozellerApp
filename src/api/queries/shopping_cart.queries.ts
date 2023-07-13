import { QueryFunction, UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "react-query";
import { GenericDataResponse, HttpDataResponse, PaginationParams } from "../../config/data_types/general.types";
import { ShoppingCartData, ShoppingCartResult, ShoppingCartUpdateData } from "../../config/data_types/shopping_cart.types";
import { addToShoppingCart, deleteCartItem, fetchCartCount, fetchShoppingCart, updateShoppingCart } from "../services/shopping_cart.services";

export const ShoppingCartKeys = {
     fetchItems: "fetch/shopping_cart_items",
     fetchCount: "fetch/shopping_cart_count"
}

export const useUpdateCart = (options?: UseMutationOptions<HttpDataResponse, HttpDataResponse, ShoppingCartUpdateData>) => {
     return useMutation<HttpDataResponse, HttpDataResponse, ShoppingCartUpdateData>(
          updateShoppingCart, options
     )
}

export const useAddToCart = (options?: UseMutationOptions<HttpDataResponse, HttpDataResponse, ShoppingCartData>) => {
     return useMutation<HttpDataResponse, HttpDataResponse, ShoppingCartData>(
          addToShoppingCart, options
     )
}

export const useCartCount = (options?: UseQueryOptions<unknown, HttpDataResponse, GenericDataResponse<number>>) => {
     return useQuery<unknown, HttpDataResponse, GenericDataResponse<number>>(
          [ShoppingCartKeys.fetchCount],
          (() => fetchCartCount()) as QueryFunction<unknown>,
          options
     )
}

export const useShoppingCart = (params: PaginationParams, options?: UseQueryOptions<PaginationParams, HttpDataResponse, GenericDataResponse<ShoppingCartResult>>) => {
     return useQuery<PaginationParams, HttpDataResponse, GenericDataResponse<ShoppingCartResult>>(
          [ShoppingCartKeys.fetchItems, params],
          (() => fetchShoppingCart(params)) as QueryFunction<PaginationParams>,
          options
     )
}

export const useDeleteCartItem = (options?: UseMutationOptions<HttpDataResponse, HttpDataResponse, number>) => {
     return useMutation<HttpDataResponse, HttpDataResponse, number>(deleteCartItem, options)
}