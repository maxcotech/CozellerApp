import { QueryFunction, UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "react-query"
import { Currency, CurrencyData, CurrencyParams } from "../../config/data_types/currency_types"
import { changeCurrency, fetchCurrencies } from "../services/currency.services"
import { GenericDataResponse, HttpDataResponse } from "../../config/data_types/general.types"

export const CurrencyQueryKey = {
    fetchCurrencies: "fetch/currencies"
}

export const useCurrencies = (params: CurrencyParams, options?: UseQueryOptions<CurrencyParams,HttpDataResponse,GenericDataResponse<Currency[]>> ) => {
    return useQuery<CurrencyParams,HttpDataResponse,GenericDataResponse<Currency[]>>([CurrencyQueryKey.fetchCurrencies,params],(() => fetchCurrencies(params)) as QueryFunction<CurrencyParams>,options)
}

export const useChangeCurrency = (options?: UseMutationOptions<HttpDataResponse,HttpDataResponse,CurrencyData>) => {
    return useMutation<HttpDataResponse,HttpDataResponse,CurrencyData>(changeCurrency,options)
}