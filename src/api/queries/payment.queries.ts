import { QueryFunction, UseQueryOptions, useQuery } from "react-query";
import { GenericDataResponse, HttpDataResponse } from "../../config/data_types/general.types";
import { fetchCheckoutData } from "../services/payment.services";
import { CheckoutData } from "../../config/data_types/shipping_types";

export const PaymentQueryKeys = {
     fetchCheckout: "fetch/payment/checkout"
}


export const useCheckout = (options?: UseQueryOptions<unknown, HttpDataResponse, GenericDataResponse<any>>) => {
     return useQuery<unknown, HttpDataResponse, GenericDataResponse<CheckoutData>>(
          [PaymentQueryKeys.fetchCheckout],
          (() => fetchCheckoutData()) as QueryFunction<unknown>,
          options
     )
}