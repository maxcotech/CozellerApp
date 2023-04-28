import client from "../../config/client.config";
import { CurrencyParams } from "../../config/data_types/currency_types";


export const fetchCurrencies = async (params: CurrencyParams): Promise<any> => {
    return client.get(`currencies`,{params})
}

export const changeCurrency = async (data:{currency_id:number}): Promise<any> => {
    return client.put(`user/currency`,data)
}