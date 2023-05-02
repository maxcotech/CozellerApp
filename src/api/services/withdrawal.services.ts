import client from "../../config/client.config"
import { WithdrawalFormData } from "../../config/data_types/withdrawal_types"


export const createWithdrawal = async (data: WithdrawalFormData): Promise<any> => {
    return client.post(`withdrawal_request`,data)
}