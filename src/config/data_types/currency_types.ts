
export interface Currency {
    id: number,
    currency_name: string,
    currency_code: string,
    currency_sym: string,
    base_rate: number
}

export interface CurrencyParams {
    paginate?: number,
    country_id?: number
}

export type CurrencyData = {currency_id: number}