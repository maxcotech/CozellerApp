
export interface ShoppingCartData {
     item_id: number,
     variant_id?: number
}

export interface ShoppingCartUpdateData extends ShoppingCartData {
     quantity: number
}