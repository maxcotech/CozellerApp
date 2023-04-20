import client from "../../config/client.config"
import { AccountFormData, LoginData } from "../../config/data_types/account_types"

export const login =  async (data: LoginData): Promise<any> => {
    return client.post("accounts/login", data);
}

export const  updateAccount = async (data: AccountFormData): Promise<any> => {
    return client.put("accounts",data);
}

export const logout = async (): Promise<any> => {
    return client.patch(`accounts/logout`,{});
}