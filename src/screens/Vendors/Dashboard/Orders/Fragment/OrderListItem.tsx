import { TouchableOpacity } from "react-native";
import { SubOrder } from "../../../../../config/data_types/order.types";
import { Actionsheet, Box, HStack, Icon, Spinner, VStack } from "native-base";
import OrderStatusIcon from "./OrderStatusIcon";
import { useMemo, useState } from "react";
import { getOrderStatusColorScheme, getOrderStatusLabel, getPaymentStatusColorScheme } from "../../../../../helpers/status.helpers";
import { APP_COLOR, APP_COLOR_LIGHTER } from './../../../../../config/constants.config';
import CText from "../../../../../../components/CText";
import Money from "../../../../../../components/Money";
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { ManageResourceActions, OrderStatuses } from "../../../../../config/enum.config";
import OrderStatusOptions from "./OrderStatusOptions";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../../../config/routes.config";

export interface OrderListItemProps {
    data: SubOrder
}

export default function OrderListItem({data}: OrderListItemProps){
    const [showOptions,setShowOptions] = useState(false);
    const navigation = useNavigation<AppNavProps>();
    const [showUpdateStatus,setShowUpdateStatus] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const orderColorScheme = useMemo(() => {
        return getOrderStatusColorScheme(data.status)
    },[data.status])
    const paymentColorScheme = useMemo(() => {
        return getPaymentStatusColorScheme(data.payment_status);
    },[data.payment_status])

    const onSelectItem = (option: ManageResourceActions) => {
        setShowOptions(false);
        if(option === ManageResourceActions.Update){
            setShowUpdateStatus(true);
        }
        if(option === ManageResourceActions.View){
            navigation.navigate(routes.vendorOrderDetails,{sub_order_id: data?.id, store_id: data?.store_id})
        }
    }
    const orderSettled = useMemo(() => {
        switch(data.status){
            case OrderStatuses.STATUS_COMPLETED:
            case OrderStatuses.STATUS_CANCELLED:
            case OrderStatuses.STATUS_REFUNDED: return true;
            default: return false;
        }
    },[data.status]);

    
    return (
        <>
        <TouchableOpacity onPress={() => setShowOptions(true)}>
            <HStack space={2} alignItems="center" px="10px" py="10px" bgColor={APP_COLOR_LIGHTER} borderRadius="lg" my="8px">
                {
                    (isLoading)?<Spinner size="lg" color={APP_COLOR} />:
                    <Box alignItems="center" justifyContent={"center"} bgColor={orderColorScheme.bgColor} borderRadius={"full"} width="50px" height="50px" >
                        <OrderStatusIcon iconSize="30px" status={data?.status} color={orderColorScheme.color}  />
                    </Box>
                }
                
                <VStack flex={1}>
                    <CText numberOfLines={1} fontWeight={"bold"}>{data.user?.first_name+" "+data?.user?.last_name}</CText>
                    {
                        (data?.order?.order_number)?
                        <CText variant="body4" numberOfLines={3} color={"gray.400"}>ORDER NO: <CText variant="body3" color="black">{data.order?.order_number}</CText></CText>:<></>
                    }
                    {
                        (data?.amount)?
                        <CText variant="body4" numberOfLines={3} color={"gray.400"}>AMOUNT: <Money variant="body3" color="black">{data.amount ?? 0}</Money></CText>:<></>
                    } 
                    {
                        (data?.amount)?
                        <HStack alignItems="center" space={2}>
                            <CText alignItems="center" variant="body4" numberOfLines={3} color={"gray.400"}>
                                PAYMENT STATUS: 
                            </CText>
                            <Box  bgColor={paymentColorScheme.bgColor} borderRadius="sm" px="6px" py="1px"><CText variant="body4" color={paymentColorScheme.color}>{data.payment_status_text}</CText></Box> 
                        </HStack>
                        :<></>
                    } 
                    {
                        (data?.shipping_fee)?
                        <CText variant="body4" numberOfLines={3} color={"gray.400"}>SHIPPING FEE: <Money variant="body3" color="black">{data.shipping_fee}</Money></CText>:<></>
                    }
                    {
                        (data?.delivery_date)?
                        <CText variant="body4" numberOfLines={3} color={"gray.400"}>EXPECTED ON: <CText variant="body3" color="black">{data?.delivery_date}</CText></CText>:<></>
                    }
                    {
                        (data?.amount)?
                        <HStack alignItems="center" space={2}>
                            <CText alignItems="center" variant="body4" numberOfLines={3} color={"gray.400"}>
                                STATUS: 
                            </CText>
                            <Box  bgColor={orderColorScheme.bgColor} borderRadius="sm" px="6px" py="1px"><CText variant="body4" color={orderColorScheme.color}>{getOrderStatusLabel(data.status)}</CText></Box> 
                        </HStack>
                        :<></>
                    } 
                </VStack>
                <Icon size="md" as={<MaterialIcons name="arrow-right" />} />
            </HStack>
        </TouchableOpacity>
        <Actionsheet isOpen={showOptions} onClose={() => setShowOptions(false)}>
            <Actionsheet.Content>
                <CText>Manage {data?.user?.first_name ?? data?.user?.email}'s Orders</CText>
                {
                    (orderSettled)?<></>:
                    <Actionsheet.Item onPress={() => onSelectItem(ManageResourceActions.Update)} >
                        <HStack width="full" my="5px"  alignItems="center" justifyContent={"space-between"}>
                            <HStack alignItems="center" space={2}>
                                <Icon size="md" as={<AntDesign name="edit" />} />
                                <CText>Update Order Status</CText>
                            </HStack>
                            <Icon marginLeft={"auto"} size="md" as={<AntDesign name="arrowright" />} />
                        </HStack>
                    </Actionsheet.Item>
                }
                <Actionsheet.Item onPress={() => onSelectItem(ManageResourceActions.View)} >
                    <HStack width="full" my="5px"  alignItems="center" justifyContent={"space-between"}>
                        <HStack alignItems="center" space={2}>
                            <Icon size="md" as={<AntDesign name="folderopen" />} />
                            <CText>View Order Details</CText>
                        </HStack>
                        <Icon marginLeft={"auto"} size="md" as={<AntDesign name="arrowright" />} />
                    </HStack>
                </Actionsheet.Item>
            </Actionsheet.Content>
        </Actionsheet>
        <OrderStatusOptions iloader={setIsLoading}  order={data} isOpen={showUpdateStatus} onClose={() => setShowUpdateStatus(false)} />
        </>
    )
}