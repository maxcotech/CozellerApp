import { Category } from "./category_types";
import { Product } from "./product_types"

export interface SearchParams {
     skip?: number,
     limit?: number,
     query: string
}

export type ProductSearchResult = Pick<Product, 'id' | 'product_name' | 'product_slug'>;
export type CategorySearchResult = Pick<Category, 'id' | 'category_icon' | 'category_slug' | 'category_title'>;

export interface SearchResult {
     products: ProductSearchResult[],
     categories: CategorySearchResult[]
}

export interface SearchHistoryItem {
     id: number,
     query: string
}


