import { ResourceStatuses } from "../enum.config"
import { PaginationParams } from "./general.types"

export interface Brand {
    id: number,
    brand_name: string,
    brand_logo: string | null,
    website_url: string | null,
    status: ResourceStatuses,
    created_at: string,
    updated_at: string
}

export interface BrandParams extends PaginationParams {
    query?: string,
    status?: ResourceStatuses
}

export interface BrandFormData {
    brand_name : string,
    website_url : string | null,
    brand_logo : Object | null
}