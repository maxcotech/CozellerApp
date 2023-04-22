import { useMutation, UseMutationOptions, useQuery } from "react-query";
import { AccountFormData, AuthData, LoginData } from "../../config/data_types/account_types";
import { GenericDataResponse, HttpDataResponse } from "../../config/data_types/general.types";
import { login, logout, register, updateAccount } from "../services/account.services";

export const useLogin = (options: UseMutationOptions<GenericDataResponse<AuthData>,HttpDataResponse,LoginData>) => {
    return useMutation<GenericDataResponse<AuthData>,HttpDataResponse,LoginData>(login,options);
}

export const useRegister = (options: UseMutationOptions<HttpDataResponse,HttpDataResponse,Partial<AccountFormData>>) => {
    return useMutation<HttpDataResponse,HttpDataResponse,Partial<AccountFormData>>(register,options);
}

export const useUpdateAccount = (options: UseMutationOptions<HttpDataResponse,HttpDataResponse,Partial<AccountFormData>>) => {
    return useMutation<HttpDataResponse,HttpDataResponse,Partial<AccountFormData>>(updateAccount,options);
}

export const useLogoutAccount = (options: UseMutationOptions<HttpDataResponse,HttpDataResponse,unknown>) => {
    return useMutation<HttpDataResponse,HttpDataResponse,unknown>(logout,options)
}
