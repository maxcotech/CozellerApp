import { PaginationParams } from "./general.types"
import { City, Country, State } from "./location_types"

export interface BillingAddress {
    id: number,
    street_address: string,
    is_current: 1 | 0,
    city_id: number,
    state_id: number,
    country_id: number,
    phone_number: string | null,
    telephone_code: string | null,
    additional_number: null | string,
    additional_telephone_code: null | string,
    postal_code: null | string,
    first_name: string | null,
    last_name: string | null,
    state: Partial<State>,
    city: Partial<City>,
    country: Partial<Country>
}

export interface BillingAddressesParams extends PaginationParams {
    user_id?: number
}

export interface ToggleBillingAddrStatusData {
    billing_address_id: number
}