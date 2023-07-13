import { ProductTypes, ResourceStatuses } from "../enum.config"
import { Brand } from "./brand_types"
import { Category } from "./category_types"
import { Currency } from "./currency_types"
import { PaginationParams } from "./general.types"
import { Store } from "./store_types"

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

export interface ReviewSummary {
    count_0: number,
    count_1: number,
    count_2: number,
    count_3: number,
    count_4: number,
    count_5: number
}

export interface Product extends ProductSummary {
    store: Partial<Store>,
    brand: Brand | null,
    category: Category | null,
    currency?: Currency | null,
    variations: ProductVariationForm[],
    in_wishlist?: boolean,
    cart_quantity?: number,
    review_average?: number,
    product_type?: ProductTypes,
    images?: Partial<Image>[],
    review_summary?: ReviewSummary,
    simple_description?: string,
    description?: string,
    key_features?: string

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

export interface ProductVariationForm {
    variation_name: string,
    variation_sku: string,
    regular_price: number,
    sales_price: number,
    amount_in_stock: number,
    variation_image_url: string,
    variation_image: string,
    id: number,
    product_id?: number,
    cart_quantity?: number,
    current_price?: number
}

export interface ProductVariation {
    id: number,
    regular_price: number,
    sales_price: number | null,
    variation_name: string,
    product_id: number,
    variation_image: string | null,
    cart_quantity: number,
    current_price: number,
    amount_in_stock: number | null
}

export interface ProductFormData {
    product_image: string,
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
    brand_name: string,
    variations: ProductVariationForm[]
}

export interface Image {
    id: number,
    store_id: number,
    product_id: number | null,
    image_type: string | null,
    image_url: string,
    image_thumbnail: string | null,
    created_at: string,
    updated_at: string
}


export type ProductGalleryResult = { image_full_path: string }
export type ProductFormKeys = keyof ProductFormData;
export type SetFormValueType = (val: any, key: ProductFormKeys) => void;

export interface ProductFormPageProps {
    setFormValue?: SetFormValueType,
    data?: ProductFormData,
    errors?: any
}