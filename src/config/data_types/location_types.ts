import { ResourceStatuses } from "../enum.config";
import { PaginationParams } from "./general.types";

export interface Country {
    id: number,
    country_code: string,
    country_name: string,
    country_logo: string,
    country_tel_code: string,
    created_at: string,
    updated_at: string
}

export interface City {
    city_name: string,
    state_id: number,
    city_code: string,
    state: string
}

export interface State {
    state_name: string,
    country_id: number,
    status: ResourceStatuses,
    state_code: string
}

export interface StateParams {
    country_id: number,
    status?: ResourceStatuses
}

export interface CityParams {
    state_id?: number,
    state?: string,
    country_id?: number,
    status?: ResourceStatuses
}

export interface CountryParams extends PaginationParams {
    paginate?: number
}