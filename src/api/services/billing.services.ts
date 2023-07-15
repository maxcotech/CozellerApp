import client from "../../config/client.config"
import { BillingAddressesParams } from "../../config/data_types/billing_address.types"


export const fetchBillingAddresses = (params: BillingAddressesParams): Promise<any> => {
     return client.get(`billing/addresses`, { params })
}