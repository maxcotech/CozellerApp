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
    product_id?: number,
    product_name: string,
    store_id: number,
    regular_price: number,
    sales_price: number,
    simple_description: string,
    description: string,
    amount_in_stock: number,
    category_id: number,
    category_name: string,
    main_product_image: string,
    brand_id: number,
    weight: number,
    dimension_height: number,
    dimension_width: number,
    dimension_length: number,
    front_image: string,
    back_image: string,
    side_image: string,
    fourth_image: string,
    fifth_image: string,
    product_sku: string,
    youtube_video_id: string,
    key_features: string,
    brand_name: string
}
export type ProductGalleryResult = {image_full_path: string}
export type ProductFormKeys = keyof ProductFormData;
export type SetFormValueType = (val: any, key: ProductFormKeys) => void;

export interface ProductFormPageProps {
    setFormValue?: SetFormValueType,
    data?: ProductFormData,
    errors?: any
}