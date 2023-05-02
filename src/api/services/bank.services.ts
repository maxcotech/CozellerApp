import client from "../../config/client.config"
import { BankFormData, DeleteBankParams } from "../../config/data_types/bank_types"

export const fetchBankCodes = async (currency: number): Promise<any> => {
    return client.get(`banks/codes/${currency}`)
}

export const fetchBankAccounts = async (store_id: number): Promise<any> => {
    return client.get(`store/bank_accounts`,{
        params: {store_id}
    })
}

export const createBankAccount = async (data:BankFormData): Promise<any> => {
    return client.post(`store/bank_account`,data)
}

export const updateBankAccount = async (data:BankFormData): Promise<any> => {
    return client.put(`store/bank_account`,data)
}

export const deleteBankAccount = async (params: DeleteBankParams): Promise<any> => {
    return client.delete(`store/bank_account/${params.bank_account_id}`,{params})
}




