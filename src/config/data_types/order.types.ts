import { OrderStatuses, PaymentStatuses } from "../enum.config";
import { Account } from "./account_types";
import { BillingAddress } from "./billing_address.types";
import { PaginationParams } from "./general.types";
import { Store } from "./store_types";

export interface Order {
    id: number,
    user_id: number,
    order_number: number,
    total_amount: number,
    status: OrderStatuses,
    billing_address_id: number,
    converted_amount: number,
    billing_address: Partial<BillingAddress>
}

export interface SubOrderParams extends PaginationParams {
    with_items: number,
    user_id: number
    status: OrderStatuses,
    store_id: number,
    sub_order_id: number
}

export interface SubOrder {
    id: number,
    order_id: number,
    user_id: number,
    store_id: number,
    amount: number,
    shipping_fee: number,
    delivery_date: string,
    status: OrderStatuses,
    payment_status: PaymentStatuses,
    wallet_fund_id: null | number,
    created_at: string,
    updated_at: string,
    payment_status_text: string,
    user: Partial<Account>,
    order: Partial<Order>,
    store: Partial<Store>
}