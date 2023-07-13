import { AccountTypes, ProductTypes } from "../enum.config"
import { Product } from "./product_types"


export interface WishlistAddData {
     product_id: number,
     variation_id?: number
}

export interface WishlistDeleteData extends Partial<WishlistAddData> {
     id?: number
}

export interface WishlistItem {
     product: Product,
     id: number,
     user_id: number,
     user_type: AccountTypes,
     product_id: number,
     variation_id: number,
     product_type: ProductTypes
}