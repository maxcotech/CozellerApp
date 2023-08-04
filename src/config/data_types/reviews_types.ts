import { ProductTypes, ResourceStatuses } from "../enum.config";
import { PaginationParams } from "./general.types";
import { Product, ProductVariation } from "./product_types";

export interface Review {
     id: number,
     product_id: number,
     variation_id: number | null,
     user_id: number,
     review_comment: string | null,
     star_rating: number,
     created_at: string,
     updated_at: string,
     status: ResourceStatuses,
     product_type: ProductTypes,
     product: Partial<Product>,
     variation: Partial<ProductVariation> | null,

}

export interface CreateReviewData {
     product_id: number,
     variation_id?: number,
     star_rating: 0 | 1 | 2 | 3 | 4 | 5,
     review_comment: string,
     product_type: ProductTypes
}

export interface ReviewsParams extends PaginationParams {
     review_id?: number,
     product_id?: number
}