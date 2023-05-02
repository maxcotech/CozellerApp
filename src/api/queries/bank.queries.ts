import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "react-query";
import { createBankAccount, deleteBankAccount, fetchBankAccounts, fetchBankCodes } from "../services/bank.services";
import { GenericDataResponse, HttpDataResponse } from "../../config/data_types/general.types";
import { BankAccount, BankCode, BankFormData, DeleteBankParams } from "../../config/data_types/bank_types";

export const BankQueryKeys = {
    fetchBankCodes: "fetch/bank-codes",
    fetchBankAccounts: "fetch/bank-accounts"
}

export const useBankCodes = (currency_id: number, options?: UseQueryOptions<number,HttpDataResponse,GenericDataResponse<BankCode[]>>) => {
    return useQuery<number,HttpDataResponse,GenericDataResponse<BankCode[]>>(
        [BankQueryKeys.fetchBankCodes,currency_id],
        () => fetchBankCodes(currency_id),
        options
    )
}

export const useBankAccounts = (store_id: number, options?: UseQueryOptions<number,HttpDataResponse,GenericDataResponse<BankAccount[]>>) => {
    return useQuery<number,HttpDataResponse,GenericDataResponse<BankAccount[]>>(
        [BankQueryKeys.fetchBankAccounts, store_id],
        () => fetchBankAccounts(store_id),
        options
    )
}

export const useCreateBankAccounts = (options: UseMutationOptions<HttpDataResponse,HttpDataResponse,BankFormData>) => {
    return useMutation<HttpDataResponse,HttpDataResponse,BankFormData>(
        createBankAccount,
        options
    )
}

export const useDeleteBankAccount = (options: UseMutationOptions<HttpDataResponse,HttpDataResponse,DeleteBankParams>) => {
    return useMutation<HttpDataResponse,HttpDataResponse,DeleteBankParams>(
        deleteBankAccount,
        options
    )
}