import { AccountTypes, UserStatuses, UserTypes } from "../enum.config"
import { Country } from "./country_types"
import { Currency } from "./currency_types"
import { Store } from "./store_types"


export interface Account {
    id: number,
    profile_image_url: null | string,
    full_name: string,
    user_name: string,
    contact_number: string,
    email: string,
    user_type: AccountTypes,
    account_status: UserStatuses,
    email_verified_at: null | string,
    number_verified_at: null | string,
    created_by: number,
    created_at: string,
    updated_at: string,
    account_status_text: string,
    user_type_text: string,
    permissions?: string[]
}

export interface AuthData {
    user_type: AccountTypes,
    token: string
}

export interface LoginData {
    email: string,
    password: string
}

export interface ProfileData {
    currency: Currency,
    country: Country,
    user: Account,
    logged_in: boolean,
    current_store: Store | null,
    stores: Store[]
}

export interface EmailVerificationData {
    email: string, password: string
}

export interface AccountFormData {
    id?: number,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    confirm_password: string,
    staff_token: string,
    phone_number: string,
    telephone_code: string,
    account_type: AccountTypes
}
