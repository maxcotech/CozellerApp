import { ResourceStatuses } from "../enum.config"
import { PaginatedData } from "./general.types"

export interface Store {
    id: number,
    owner_id: number,
    store_name: string,
    store_logo: string | null,
    store_slug: string,
    country_id: number,
    store_address: string | null,
    store_email: string,
    store_telephone: string,
    store_status: ResourceStatuses,
    state: string | null,
    city: string | null,
    store_status_text: string
}

export interface StoreDashboardParams {
    store_id: number,
    start_date?: string,
    in_range?: number,
    end_date?: string,
}

export interface StockData {
    stock_quantity: number,
    stock_value: number,
    total_products: number
}

export interface Revenues {
    daily_revenue: number,
    monthly_revenue: number,
    yearly_revenue: number,
    all_time_revenue: number
}

export interface DashboardData extends PaginatedData<any[]> {
    stock_data: StockData,
    total_completed_orders: number,
    total_pending_orders: number,
    revenues: Revenues
}
