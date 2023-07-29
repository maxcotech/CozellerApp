import client from "../../config/client.config"
import { VerifyPaymentPayload } from "../../config/data_types/payment_types";

export const fetchCheckoutData = (): Promise<any> => {
     return client.get(`checkout`)
}

export const initPayment = (): Promise<any> => {
     return client.post(`payment/init`);
}

export const verifyPayment = (data: VerifyPaymentPayload): Promise<any> => {
     return client.put('payment/verify', data)
}