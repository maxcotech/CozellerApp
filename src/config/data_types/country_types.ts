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

export interface CountryParams extends PaginationParams {
    paginate?: number
}