import { UseMutationOptions, useMutation } from "react-query"
import { createWithdrawal } from "../services/withdrawal.services";
import { HttpDataResponse } from "../../config/data_types/general.types";
import { WithdrawalFormData } from "../../config/data_types/withdrawal_types";

export const WithdrawalQueryKeys = {
    fetchWithdrawals: "fetch/withdrawals"
}

export const useCreateWithdrawalRequest = (options: UseMutationOptions<HttpDataResponse,HttpDataResponse,WithdrawalFormData>) => {
    return useMutation<HttpDataResponse,HttpDataResponse,WithdrawalFormData>(createWithdrawal,options);
}