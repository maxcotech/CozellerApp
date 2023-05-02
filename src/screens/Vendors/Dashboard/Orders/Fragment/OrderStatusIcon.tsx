import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { OrderStatuses } from "../../../../../config/enum.config";
import { Icon } from "native-base";

export interface OrderStatusIconProps {
    status: OrderStatuses,
    iconSize?: number | string,
    color?: string
}

export default function OrderStatusIcon({status,iconSize = 20,color = "black"}:OrderStatusIconProps){
    switch(status){
        
        case OrderStatuses.STATUS_DISPUTED: return <Icon color={color} size={iconSize} as={<MaterialIcons size={iconSize} color={color} name="report-problem" />} />;
        case OrderStatuses.STATUS_COMPLETED: return <Icon color={color} size={iconSize} as={<Ionicons  name="checkmark-done-circle-sharp" />} />;
        case OrderStatuses.STATUS_SHIPPED:
        case OrderStatuses.STATUS_AWAITING_PICKUP: return <Icon color={color} size={iconSize} as={<MaterialCommunityIcons  name="truck-delivery-outline" />} />;
        case OrderStatuses.STATUS_CANCELLED: return <Icon size={iconSize} color={color} as={<MaterialCommunityIcons  name="cancel"  />} />;
        case OrderStatuses.STATUS_REFUNDED:
        case OrderStatuses.STATUS_AWAITING_REFUND: return <Icon color={color} size={iconSize}  as={<MaterialCommunityIcons  name="cash-refund" />} />
        case OrderStatuses.STATUS_AWAITING_FULFILLMENT: 
        case OrderStatuses.STATUS_AWAITING_SHIPPING:
        case OrderStatuses.STATUS_PENDING:
        case OrderStatuses.STATUS_PARTIALLY_SHIPPED: 
        default: return <Icon color={color} size={iconSize} as={<MaterialIcons color={color} name="pending-actions" />} />
    }
}