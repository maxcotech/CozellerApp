

export interface WishlistAddData {
     product_id: number,
     variation_id?: number
}

export interface WishlistDeleteData extends Partial<WishlistAddData> {
     id?: number
}