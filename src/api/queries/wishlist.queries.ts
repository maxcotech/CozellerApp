import { QueryFunction, UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "react-query"
import { GenericDataResponse, HttpDataResponse, PaginatedDataResponse, PaginationParams } from "../../config/data_types/general.types"
import { WishlistAddData, WishlistDeleteData, WishlistItem } from "../../config/data_types/wishlist_types"
import { addWishListItem, deleteWishListItem, fetchWishlist } from "../services/wishlist.services"
import { Product } from "../../config/data_types/product_types"

export const WishListKeys = {
     fetchWishlist: "fetch/wishlist"
}

export const useAddWishlistItem = (options?: UseMutationOptions<HttpDataResponse, HttpDataResponse, WishlistAddData>) => {
     return useMutation<HttpDataResponse, HttpDataResponse, WishlistAddData>(
          addWishListItem,
          options
     )
}

export const useDeleteWishlistItem = (options?: UseMutationOptions<HttpDataResponse, HttpDataResponse, WishlistDeleteData>) => {
     return useMutation<HttpDataResponse, HttpDataResponse, WishlistDeleteData>(
          deleteWishListItem,
          options
     )
}

export const useWishlist = (params: PaginationParams, options?: UseQueryOptions<unknown, HttpDataResponse, PaginatedDataResponse<WishlistItem[]>>) => {
     return useQuery<unknown, HttpDataResponse, PaginatedDataResponse<WishlistItem[]>>(
          [WishListKeys.fetchWishlist, params],
          (() => fetchWishlist(params)) as QueryFunction<PaginationParams>,
          options
     )
}