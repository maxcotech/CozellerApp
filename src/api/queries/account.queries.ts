import { QueryFunction, useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "react-query";
import { AccountFormData, AuthData, EmailResetPasswordFormData, EmailVerificationData, LoginData, PasswordFormData, ProfileData, SupportMessageData } from "../../config/data_types/account_types";
import { GenericDataResponse, HttpDataResponse } from "../../config/data_types/general.types";
import { completeEmailPasswordReset, completeEmailVerification, deleteAccount, fetchProfile, initEmailPasswordReset, login, logout, register, sendEmailVerification, sendSupportMessage, updateAccount, updatePassword } from "../services/account.services";

export const AccountQueryKeys = {
    fetchProfile: "get/profile"
}


export const useLogin = (options: UseMutationOptions<GenericDataResponse<AuthData>, HttpDataResponse, LoginData>) => {
    return useMutation<GenericDataResponse<AuthData>, HttpDataResponse, LoginData>(login, options);
}

export const useRegister = (options: UseMutationOptions<HttpDataResponse, HttpDataResponse, Partial<AccountFormData>>) => {
    return useMutation<HttpDataResponse, HttpDataResponse, Partial<AccountFormData>>(register, options);
}

export const useProfile = (options: UseQueryOptions<unknown, HttpDataResponse, GenericDataResponse<ProfileData>>) => {
    return useQuery<unknown, HttpDataResponse, GenericDataResponse<ProfileData>>([AccountQueryKeys.fetchProfile], (() => fetchProfile()) as QueryFunction<unknown>, options)
}

export const useSendEmailVerification = (options: UseMutationOptions<HttpDataResponse, HttpDataResponse, string>) => {
    return useMutation<HttpDataResponse, HttpDataResponse, string>(sendEmailVerification, options);
}

export const useCompleteEmailVerification = (options?: UseMutationOptions<HttpDataResponse, HttpDataResponse, EmailVerificationData>) => {
    return useMutation<HttpDataResponse, HttpDataResponse, EmailVerificationData>(completeEmailVerification, options)
}

export const useUpdateAccount = (options: UseMutationOptions<HttpDataResponse, HttpDataResponse, Partial<AccountFormData>>) => {
    return useMutation<HttpDataResponse, HttpDataResponse, Partial<AccountFormData>>(updateAccount, options);
}

export const useLogoutAccount = (options: UseMutationOptions<HttpDataResponse, HttpDataResponse, unknown>) => {
    return useMutation<HttpDataResponse, HttpDataResponse, unknown>(logout, options)
}

export const useUpdatePassword = (options: UseMutationOptions<HttpDataResponse, HttpDataResponse, PasswordFormData>) => {
    return useMutation<HttpDataResponse, HttpDataResponse, PasswordFormData>(updatePassword, options)
}

export const useInitEmailPasswordReset = (options?: UseMutationOptions<HttpDataResponse, HttpDataResponse, string>) => {
    return useMutation<HttpDataResponse, HttpDataResponse, string>(initEmailPasswordReset, options)
}

export const useCompleteEmailPasswordReset = (options?: UseMutationOptions<HttpDataResponse, HttpDataResponse, EmailResetPasswordFormData>) => {
    return useMutation<HttpDataResponse, HttpDataResponse, EmailResetPasswordFormData>(completeEmailPasswordReset, options)
}

export const useSendSupportMessage = (options?: UseMutationOptions<HttpDataResponse, HttpDataResponse, SupportMessageData>) => {
    return useMutation<HttpDataResponse, HttpDataResponse, SupportMessageData>(sendSupportMessage, options)
}

export const useDeleteAccount = (options?: UseMutationOptions<HttpDataResponse, HttpDataResponse, unknown>) => {
    return useMutation<HttpDataResponse, HttpDataResponse, unknown>(
        deleteAccount,
        options
    )
}
