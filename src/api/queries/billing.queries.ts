import { QueryFunction, UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "react-query"
import { HttpDataResponse, PaginatedDataResponse } from "../../config/data_types/general.types"
import { BillingAddress, BillingAddressesParams } from "../../config/data_types/billing_address.types"
import { createBillingAddress, deleteBillingAddress, fetchBillingAddresses, markAsCurrentAddress, updateBillingAddress } from "../services/billing.services"

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

export const useCreateBillingAddress = (options?: UseMutationOptions<HttpDataResponse, HttpDataResponse, any>) => {
     return useMutation<HttpDataResponse, HttpDataResponse, any>(
          createBillingAddress,
          options
     )
}

export const useMarkAsCurrentAddr = (options?: UseMutationOptions<HttpDataResponse, HttpDataResponse, number>) => {
     return useMutation<HttpDataResponse, HttpDataResponse, number>(
          markAsCurrentAddress, options
     )
}

export const useDeleteBillingAddress = (options?: UseMutationOptions<HttpDataResponse, HttpDataResponse, number>) => {
     return useMutation<HttpDataResponse, HttpDataResponse, number>(
          deleteBillingAddress, options
     )
}

export const useUpdateBillingAddress = (options?: UseMutationOptions<HttpDataResponse, HttpDataResponse, any>) => {
     return useMutation<HttpDataResponse, HttpDataResponse, any>(
          updateBillingAddress, options
     )
}