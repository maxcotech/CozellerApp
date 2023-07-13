import client from "../../config/client.config";
import { PaginationParams } from "../../config/data_types/general.types";
import { WishlistAddData, WishlistDeleteData } from "../../config/data_types/wishlist_types";

export const addWishListItem = (data: WishlistAddData): Promise<any> => {
     return client.post(`wish_list`, data);
}

export const deleteWishListItem = (params: WishlistDeleteData): Promise<any> => {
     return client.delete(`wish_list`, { params });
}

export const fetchWishlist = (params: PaginationParams): Promise<any> => {
     return client.get(`wish_list`, { params });
}