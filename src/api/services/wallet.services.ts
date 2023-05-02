import client from "../../config/client.config";
import { WalletParams } from "../../config/data_types/wallet_types";

export const fetchStoreWallet = (params: Partial<WalletParams>) => {
    return client.get(`store/wallet`,{params});
}