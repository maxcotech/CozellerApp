import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { OrderStatuses } from "../../../../../config/enum.config";

export interface OrderStatusIconProps {
    status: OrderStatuses,
    iconSize?: number,
    color?: string
}

export default function OrderStatusIcon({status,iconSize = 20,color = "black"}:OrderStatusIconProps){
    switch(status){
        
        case OrderStatuses.STATUS_DISPUTED: return <MaterialIcons size={iconSize} color={color} name="report-problem" />;
        case OrderStatuses.STATUS_COMPLETED: return <Ionicons color={color} size={iconSize} name="checkmark-done-circle-sharp" />
        case OrderStatuses.STATUS_SHIPPED:
        case OrderStatuses.STATUS_AWAITING_PICKUP: return <MaterialCommunityIcons color={color} size={iconSize} name="truck-delivery-outline" />
        case OrderStatuses.STATUS_CANCELLED: return <MaterialCommunityIcons color={color} name="cancel" size={iconSize} />
        case OrderStatuses.STATUS_REFUNDED:
        case OrderStatuses.STATUS_AWAITING_REFUND: return <MaterialCommunityIcons color={color} size={iconSize} name="cash-refund" />
        case OrderStatuses.STATUS_AWAITING_FULFILLMENT: 
        case OrderStatuses.STATUS_AWAITING_SHIPPING:
        case OrderStatuses.STATUS_PENDING:
        case OrderStatuses.STATUS_PARTIALLY_SHIPPED: 
        default: return <MaterialIcons color={color} size={iconSize} name="pending-actions" />
    }
}