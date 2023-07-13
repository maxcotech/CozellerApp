import { ProductTypes } from "../enum.config"
import { Currency } from "./currency_types"
import { PaginatedData } from "./general.types"
import { Product, ProductVariation } from "./product_types"
import { Store } from "./store_types"

export interface ShoppingCartData {
     item_id: number,
     variant_id?: number
}

export interface ShoppingCartUpdateData extends ShoppingCartData {
     quantity: number
}

export interface ShoppingCartItem {
     id: number,
     item_id: number,
     variant_id: null | number,
     item_type: ProductTypes,
     quantity: number,
     store_id: number,
     in_wishlist: boolean,
     variation: null | ProductVariation,
     product: Product,
     store: Partial<Store>
}

export interface ShoppingCartResult extends PaginatedData<ShoppingCartItem[]> {
     currency: Currency,
     cart_count: number
}

export interface CartReconItem {

}