import { OrderStatuses, PaymentStatuses, ResourceStatuses } from "../config/enum.config";

export const getResourceStatusColorScheme = (status: ResourceStatuses) => {
    switch(status){
        case ResourceStatuses.Blacklisted:
        case ResourceStatuses.Inactive: return {color: "danger.500", bgColor: "danger.200"};
        case ResourceStatuses.InReview: return {color: "info.500", bgColor: "info.200"};
        case ResourceStatuses.InDraft: return {color: "gray.200", bgColor: "gray.500"};
        case ResourceStatuses.Active:
        default: return {color: "success.200", bgColor: "success.500"}; 
    }
}

export const getResourceStatusText = (status: ResourceStatuses) => {
    switch(status){
        case ResourceStatuses.Blacklisted: return "Blacklisted";
        case ResourceStatuses.Inactive: return "Inactive";
        case ResourceStatuses.InReview: return "In Review";
        case ResourceStatuses.InDraft: return "In Draft";
        case ResourceStatuses.Active: return "Active";
        default: "Unknown";
    }
}

export const getOrderStatusLabel = (status: OrderStatuses) => {
    switch(status){
        case OrderStatuses.STATUS_AWAITING_FULFILLMENT: return "Awaiting Fulfillment";
        case OrderStatuses.STATUS_AWAITING_PICKUP: return "Awaiting Pickup";
        case OrderStatuses.STATUS_AWAITING_REFUND: return "Awaiting Refund";
        case OrderStatuses.STATUS_AWAITING_SHIPPING: return "Awaiting Shipping";
        case OrderStatuses.STATUS_CANCELLED: return "Cancelled";
        case OrderStatuses.STATUS_COMPLETED: return "Completed";
        case OrderStatuses.STATUS_DISPUTED: return 'Disputed';
        case OrderStatuses.STATUS_PARTIALLY_SHIPPED: return "Partially Shipped";
        case OrderStatuses.STATUS_PENDING: return "Pending";
        case OrderStatuses.STATUS_REFUNDED: return "Refunded";
        case OrderStatuses.STATUS_SHIPPED: return "Shipped";
        default: return 'Unknown';
    }
}

export const getOrderStatusColorScheme = (status: OrderStatuses) => {
    switch(status){
        case OrderStatuses.STATUS_REFUNDED:
        case OrderStatuses.STATUS_CANCELLED: return {color: "danger.500", bgColor: "danger.200"};
        case OrderStatuses.STATUS_AWAITING_SHIPPING:
        case OrderStatuses.STATUS_AWAITING_FULFILLMENT: return {color: "info.500", bgColor: "info.200"};
        case OrderStatuses.STATUS_AWAITING_REFUND:
        case OrderStatuses.STATUS_DISPUTED:
        case OrderStatuses.STATUS_PENDING: return {color: "gray.500", bgColor: "gray.200"};
        case OrderStatuses.STATUS_SHIPPED:
        case OrderStatuses.STATUS_COMPLETED:
        case OrderStatuses.STATUS_AWAITING_PICKUP:
        default: return {color: "success.500", bgColor: "success.200"}; 
    }
}

export const getPaymentStatusColorScheme = (status: PaymentStatuses) => {
    if(status === PaymentStatuses.STATUS_NOT_PAID){
        return {color: "danger.500", bgColor: "danger.200"}
    }
    return {color: "success.500", bgColor: "success.200"}
}