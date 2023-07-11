import { UseMutationOptions, useMutation } from "react-query"
import { HttpDataResponse } from "../../config/data_types/general.types"
import { WishlistAddData, WishlistDeleteData } from "../../config/data_types/wishlist_types"
import { addWishListItem, deleteWishListItem } from "../services/wishlist.services"

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