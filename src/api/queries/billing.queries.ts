import { QueryFunction, UseQueryOptions, useQuery } from "react-query"
import { HttpDataResponse, PaginatedDataResponse } from "../../config/data_types/general.types"
import { BillingAddress, BillingAddressesParams } from "../../config/data_types/billing_address.types"
import { fetchBillingAddresses } from "../services/billing.services"

export const BillingAddressKeys = {
     fetchBillingAddresses: "fetch/billing-addresses"
}
export const useBillingAddresses = (params: BillingAddressesParams, options?: UseQueryOptions<BillingAddressesParams, HttpDataResponse, PaginatedDataResponse<BillingAddress[]>>) => {
     return useQuery<BillingAddressesParams, HttpDataResponse, PaginatedDataResponse<BillingAddress[]>>(
          [BillingAddressKeys.fetchBillingAddresses, params],
          (() => fetchBillingAddresses(params)) as QueryFunction<BillingAddressesParams>,
          options
     )
}