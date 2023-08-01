import { OrderStatuses, PaymentStatuses, ProductTypes } from "../enum.config";
import { Account } from "./account_types";
import { BillingAddress } from "./billing_address.types";
import { PaginationParams } from "./general.types";
import { ProductSummary } from "./product_types";
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

export interface SubOrderStatusUpdateData {
    new_status: OrderStatuses,
    store_id?: number,
    user_id?: number,
    sub_order_id: number,
    fund_password?: string
}

export interface FundLockPassword {
    id: number,
    lock_password: string,
    status: 0 | 1,
    sub_order_id: number,
    user_id: number,
    status_text: string
}

export interface SubOrder {
    fund_lock_password: FundLockPassword,
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
    store: Partial<Store>,
    items?: OrderProductItem[]
}

export interface SubOrderStatusParams {
    new_status: OrderStatuses,
    store_id: number,
    user_id: number,
    sub_order_id: number,
    fund_password: string,
}

export interface OrderProductItem {
    id: number,
    user_id: number,
    paid_amount: number,
    quantity: number,
    product_type: ProductTypes,
    sub_order_id: number,
    product_id: number,
    variation_id: null | number,
    product: Partial<ProductSummary>,
    variation: any

}