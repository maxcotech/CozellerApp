import { Currency } from "./currency_types"

export interface BankAccount {
    id: number,
    bank_code: string,
    bank_name: string | null,
    account_name: string,
    account_number: string,
    bank_currency_id: number,
    store_id: number,
    created_at: string,
    updated_at: string,
    currency: Currency
}

export interface DeleteBankParams {
    store_id: number,
    bank_account_id: number
}


export interface BankCode {

    id: number,
    code: string,
    name: string

}

export interface BankFormData {
    id?: any,
    account_name: string,
    bank_name: string,
    bank_code: string,
    account_number: string,
    store_id: number,
    bank_currency_id: number,
    password: string
}