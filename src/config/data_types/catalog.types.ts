import { Category } from "./category_types";

export type PriceRange = {
     min_price: number,
     max_price: number
}

export interface CatalogFilterLimits {
     main_category?: Category,
     categories: Category[],
     price_range: PriceRange,
}
