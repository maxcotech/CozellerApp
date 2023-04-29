import { ResourceStatuses } from "../enum.config"

export interface ProductSummary {
    id: number,
    product_sku: string | null,
    product_name: string,
    regular_price: number,
    sales_price: number | null,
    product_image: string | null,
    product_slug: string,
    amount_in_stock: number,
    current_price: number,
    product_status: ResourceStatuses
}

export interface StoreProductParams {
    store_id: number,
    status?: ResourceStatuses,
    query?: string,
    brand_id?: number,
    category_id?: number,
    max_price?: number,
    min_price?: number
}
