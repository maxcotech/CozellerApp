import client from "../../config/client.config"
import { AccountFormData, EmailResetPasswordFormData, EmailVerificationData, LoginData, PasswordFormData, SupportMessageData } from "../../config/data_types/account_types"

export const login = async (data: LoginData): Promise<any> => {
    return client.post("user/login", data);
}

export const register = async (data: Partial<AccountFormData>): Promise<any> => {
    return client.post(`user/register`, data);
}

export const fetchProfile = async (): Promise<any> => {
    return client.get(`user/profile`);
}

export const sendEmailVerification = async (email: string): Promise<any> => {
    return client.post(`email_verification/send`, { email });
}

export const completeEmailVerification = async (data: EmailVerificationData): Promise<any> => {
    return client.post(`email_verification/complete`, data);
}

export const updateAccount = async (data: AccountFormData): Promise<any> => {
    return client.put("accounts", data);
}

export const logout = async (): Promise<any> => {
    return client.delete(`user/logout`, {});
}

export const updatePassword = async (data: PasswordFormData): Promise<any> => {
    return client.put("user/password", data);
}

export const initEmailPasswordReset = async (email: string): Promise<any> => {
    return client.post(`reset_password/email/init`, { email })
}

export const completeEmailPasswordReset = async (data: EmailResetPasswordFormData): Promise<any> => {
    return client.post(`reset_password/email/complete`, data);
}

export const sendSupportMessage = async (data: SupportMessageData): Promise<any> => {
    return client.post(`support/message`, data)
}

export const deleteAccount = async (): Promise<any> => {
    return client.delete(`user/profile`)
}