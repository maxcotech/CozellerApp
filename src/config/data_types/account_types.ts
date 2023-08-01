import { AccountTypes, ResourceStatuses, UserStatuses, UserTypes } from "../enum.config"
import { Country } from "./location_types"
import { Currency } from "./currency_types"
import { Store } from "./store_types"


export interface Account {
    id: number,
    account_status: ResourceStatuses,
    email: string,
    first_name: string,
    last_name: string,
    permissions: string[],
    phone_number: string,
    telephone_code: string,
    user_type: AccountTypes,
    user_type_text: string,
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

export interface PasswordFormData {
    old_password: string,
    new_password: string,
    confirm_password: string
}

export interface EmailResetPasswordFormData {
    token: string,
    new_password: string,
    confirm_password: string,
    email: string
}

export interface SupportMessageData {
    email_address: string,
    message: string
}
