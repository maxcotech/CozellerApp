import { ProductTypes } from "../enum.config";
import { BillingAddress } from "./billing_address.types";
import { PaginationParams } from "./general.types";
import { City, Country, State } from "./location_types";

export interface ShippingGroupParams extends PaginationParams {
    store_id: number
}

export interface DeleteShippingGroupParams {
    store_id: number,
    id: number
}

export interface ShippingGroup<DimensionRangeType> {
    id: number,
    store_id: number,
    group_name: string,
    shipping_rate: number,
    high_value_rate: number,
    mid_value_rate: number,
    low_value_rate: number,
    dimension_range_rates: DimensionRangeType,
    delivery_duration: number,
    door_delivery_rate: number
}

export interface DimensionRangeRates {
    max: number,
    min: number,
    rate: number
}

export interface ShippingGroupFormData {
    store_id: number,
    group_name: string,
    shipping_rate: number,
    high_value_rate: number,
    mid_value_rate: number,
    low_value_rate: number,
    door_delivery_rate: number,
    delivery_duration: number
    dimension_range_rates: string
}

export interface ShippingLocation {
    id: number,
    city: Partial<City>,
    state: Partial<State>,
    country: Partial<Country>,
    country_id: number,
    state_id: number,
    city_id: number,
    store_id: number,
    shipping_group_id: number
}

export interface ShippingLocationFormData {
    store_id: number,
    shipping_group_id: number,
    country_id: number,
    state: string,
    city: string
}

export interface ShippingLocationsParams extends PaginationParams {
    store_id: number,
    shipping_group_id: number
}

export interface LocationDeleteParams {
    location_id: number,
    store_id: number
}


export interface DeliveryNote {
    minimum_delivery_date: string,
    maximum_delivery_date: string
}

export interface GroupShippingDetailItem {
    item_id: number,
    variant_id: number | null,
    item_type: ProductTypes,
    item_name: string,
    quantity: number
}

export interface GroupShippingDetail {
    shipping_label: string,
    store_id: number,
    total_shipping_fee: number,
    delivery_duration: number,
    delivery_note: DeliveryNote,
    items: GroupShippingDetailItem[]
}

export interface ShippingDetails {
    group_shipping_details: GroupShippingDetail[],
    grand_total_shipping_fees: number
}

export interface CheckoutData {
    shipping_details: ShippingDetails,
    cart_total_price: number,
    current_billing_address: BillingAddress | null
}