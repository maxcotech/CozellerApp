import client from "../../config/client.config"
import { AccountFormData, EmailVerificationData, LoginData } from "../../config/data_types/account_types"

export const login =  async (data: LoginData): Promise<any> => {
    return client.post("user/login", data);
}

export const register = async (data: Partial<AccountFormData>): Promise<any> => {
    return client.post(`user/register`,data);
}

export const fetchProfile = async (): Promise<any> => {
    return client.get(`user/profile`);
}

export const sendEmailVerification = async (email: string): Promise<any> => {
    return client.post(`email_verification/send`,{email});
}

export const completeEmailVerification = async (data: EmailVerificationData): Promise<any> => {
    return client.post(`email_verification/complete`, data);
}

export const updateAccount = async (data: AccountFormData): Promise<any> => {
    return client.put("accounts",data);
}

export const logout = async (): Promise<any> => {
    return client.delete(`user/logout`,{});
}