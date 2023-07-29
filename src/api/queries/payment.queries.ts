import { QueryFunction, UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "react-query";
import { GenericDataResponse, HttpDataResponse } from "../../config/data_types/general.types";
import { fetchCheckoutData, initPayment, verifyPayment } from "../services/payment.services";
import { CheckoutData } from "../../config/data_types/shipping_types";
import { InitPaymentPayload, VerifyPaymentPayload } from "../../config/data_types/payment_types";

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

export const useInitPayment = (options: UseMutationOptions<GenericDataResponse<InitPaymentPayload>, HttpDataResponse, unknown>) => {
     return useMutation<GenericDataResponse<InitPaymentPayload>, HttpDataResponse, unknown>(initPayment, options)
}

export const useVerifyPayment = (options: UseMutationOptions<GenericDataResponse<any>, HttpDataResponse, VerifyPaymentPayload>) => {
     return useMutation<GenericDataResponse<any>, HttpDataResponse, VerifyPaymentPayload>(verifyPayment, options)
}