import { UserStatuses, UserTypes } from "../enum.config"


export interface Account {
    id: number,
    profile_image_url: null | string,
    full_name: string,
    user_name: string,
    contact_number: string,
    email: string,
    user_type: UserTypes,
    account_status: UserStatuses,
    email_verified_at: null | string,
    number_verified_at: null | string,
    created_by: number,
    created_at: string,
    updated_at: string,
    account_status_text: string,
    user_type_text: string
}

export interface AuthData {
    user: Account,
    token: string
}

export interface LoginData {
    user_name: string,
    password: string
}

export interface AccountFormData {
    id?: number,
    full_name: string,
    user_name: string,
    contact_number: string,
    email: string,
    password: string,
    confirm_password: string
}