import { ResourceStatuses } from "../enum.config"
import { PaginationParams } from "./general.types"

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

export interface StoreProductParams extends PaginationParams {
    store_id: number,
    status?: ResourceStatuses,
    query?: string,
    brand_id?: number,
    category_id?: number,
    max_price?: number,
    min_price?: number
}

export interface ProductFormData {
    product_name: string,
    store_id: number,
    regular_price: number,
    sales_price?: number,
    simple_description: string,
    description: string,
    amount_in_stock: number,
    category_id: number,
    category_name: string,
    main_product_image: string,
    brand_id: string
    weight: number,
    front_image: string,
    back_image: string,
    side_image: string,
    fourth_image: string,
    fifth_image: string
}

export type ProductFormKeys = keyof ProductFormData;
export type SetFormValueType = (val: any, key: ProductFormKeys) => void;

export interface ProductFormPageProps {
    setFormValue?: SetFormValueType,
    data?: ProductFormData,
    errors?: any
}