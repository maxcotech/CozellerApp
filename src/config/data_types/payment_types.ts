import { PaymentOptionTypes } from "../enum.config";
import { Account } from "./account_types";

export interface InitPaymentPayload {
     reference: string,
     paystack_public_key: string,
     flutterwave_public_key: string,
     total_payment: number,
     total_in_base_rate: number,
     customer_details: Account
}

export interface VerifyPaymentPayload {
     gateway_code: PaymentOptionTypes,
     gateway_reference: string,
     transaction_id: string,
     site_reference: string
}