import { ResourceStatuses } from "../enum.config";
import { Brand } from "./brand_types";
import { Category } from "./category_types";
import { Currency } from "./currency_types";
import { PaginatedData, PaginationParams } from "./general.types";
import { Product } from "./product_types";

export type PriceRange = {
     min_price: number,
     max_price: number
}

export interface CatalogFilterLimits {
     main_category?: Category,
     categories: Category[],
     currency: Currency | null,
     price_range: PriceRange,
     brands: Brand[]
}

export interface CatalogFilters extends PaginationParams {
     'category_parameter'?: any,
     'max_price'?: number,
     'min_price'?: number,
     'brand'?: number,
     'store'?: number,
     'country'?: number,
     'state'?: number,
     'city'?: number,
     'query'?: string,
     'rating'?: number,
     'status'?: ResourceStatuses
}

export interface CatalogData extends PaginatedData<Product[]> {
     filters: CatalogFilterLimits
}
