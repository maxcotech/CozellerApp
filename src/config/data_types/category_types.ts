import { ResourceStatuses } from "../enum.config";
import { PaginationParams } from "./general.types";

export interface Category {
    id: number,
    category_title: string,
    category_level: number,
    parent_id: number,
    display_title: string,
    category_icon: string,
    category_slug: string,
    category_image?: string,
    commission_fee?: number,
    display_level?: number,
    status?: ResourceStatuses,
    created_at?: string,
    updated_at?: string,
    sub_categories?: Category[]
}

export interface CategoryParams extends PaginationParams {
    verbose?: number,
    levels?: number,
    parent?: number
    parent_slug?: string,
    child_verbose?: string,
    limit?: number,
    search?: string 
}