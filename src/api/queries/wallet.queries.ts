import { QueryFunction, UseQueryOptions, useQuery } from "react-query";
import { WalletParams, WalletViewData } from "../../config/data_types/wallet_types";
import { fetchStoreWallet } from './../services/wallet.services';
import { GenericDataResponse, HttpDataResponse } from "../../config/data_types/general.types";
                                                                                               
export const WalletQueryKeys = {
    fetchStoreWallet : "fetch/store-wallet"
}
export const useStoreWallet = (params: Partial<WalletParams>,options?: UseQueryOptions<Partial<WalletParams>,HttpDataResponse,GenericDataResponse<WalletViewData>>) =>  {
    return useQuery<Partial<WalletParams>,HttpDataResponse,GenericDataResponse<WalletViewData>>(
        [WalletQueryKeys.fetchStoreWallet, params],
        (() => fetchStoreWallet(params)) as QueryFunction<Partial<WalletParams>>,
        options                                                                                                                                                                                                                                                                                                                                                                                               
    )                                                                                                                                                                                                                                                                                                                                                                                                                                            
}
  