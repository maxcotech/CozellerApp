import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import AppBar from "../../../../../components/AppBar";
import SafeScaffold from "../../../../../components/SafeScaffold";
import { AppNavProps } from "../../../../config/routes.config";
import { useEffect, useMemo, useState } from "react";
import { SubOrderParams } from "../../../../config/data_types/order.types";
import { useSubOrder } from "../../../../api/queries/order.queries";
import { Box, Center, HStack, Icon, ScrollView, Spinner, View } from "native-base";
import { APP_COLOR, APP_COLOR_LIGHT, APP_COLOR_LIGHTER, XPADDING } from './../../../../config/constants.config';
import EmptyPage from "../../../../../components/EmptyPage";
import AppBtn from "../../../../../components/AppBtn";
import { getOrderStatusLabel } from "../../../../helpers/status.helpers";
import CText from "../../../../../components/CText";
import OrderProductItemComp from './Fragment/OrderProductItemComp';
import OrderStatusOptions from "./Fragment/OrderStatusOptions";
import { OrderStatuses } from "../../../../config/enum.config";
import Money from "../../../../../components/Money";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import OrderStatusIcon from "./Fragment/OrderStatusIcon";

export interface OrderDetailsProps extends RouteProp<ParamListBase> {
    params?: Partial<SubOrderParams>
}

export const ItemValueRow = ({title,value}:{title:string,value:any}) => {
    return (
        <HStack alignItems="center" my="2px" space={2}>
            <Box width="1/3">
                <CText variant="body3" color="gray.400" textAlign="right">{title}</CText>
            </Box>
            <Box flex={1}>
                <CText>{value}</CText>
            </Box>
        </HStack>
    )
}
export default function OrderDetails(){
    const route = useRoute<OrderDetailsProps>();
    const [showStatusOptions,setShowStatusOptions] = useState(false);
    const navigation = useNavigation<AppNavProps>();
    const [loading,setLoading] = useState(false);
    const [queryParams,setQueryParams] = useState({} as SubOrderParams)
    useEffect(() => {
        if(route?.params){
            setQueryParams({...queryParams,...route.params,with_items: 1})
        }
    },[route?.params])

    const {isLoading,data} = useSubOrder(queryParams,{
        enabled: (!!queryParams?.sub_order_id)
    })

    const billingAddress = useMemo(() => {
        return data?.data?.order?.billing_address;
    },[data?.data?.order?.billing_address])

    const orderSettled = useMemo(() => {
        switch(data?.data?.status){
            case OrderStatuses.STATUS_COMPLETED:
            case OrderStatuses.STATUS_CANCELLED:
            case OrderStatuses.STATUS_REFUNDED: return true;
            default: return false;
        }
    },[data?.data?.status]);

    return (
        <>
        <SafeScaffold>
            <AppBar 
             right={<AppBtn disabled={orderSettled} isLoading={loading} onPress={() => setShowStatusOptions(true)} borderRadius={10} paddingX={20} paddingY={8} textVariant="body4" gradient={true}>{getOrderStatusLabel(data?.data?.status)}</AppBtn>}
            title="Order Details" subtitle={(data?.data?.order?.order_number)? `Order ${data?.data?.order?.order_number}`:undefined} />
            <View flex={1} px={XPADDING} py="10px">
                {
                    (isLoading)?
                    <Center flex={1}><Spinner size="lg" color={APP_COLOR} /></Center>:
                    <>
                        {
                            (data?.data && data?.data?.id)?
                            <ScrollView  flex={1}>
                                <Box px="10px" py="10px" mt="10px" mb="20px" bgColor={APP_COLOR} borderRadius={"md"}>
                                    <HStack alignItems="center" >
                                        <Box mr="10px">
                                        <OrderStatusIcon color="white" iconSize="lg" status={data?.data?.status} />
                                        </Box>
                                        {/* <Icon mr="10px" color="white" size="lg" as={<SimpleLineIcons name="handbag" />} /> */}
                                        <Box>
                                            
                                            <Money color="white" variant="subheading">{data?.data?.amount}</Money>
                                            <CText color="white" variant="body4" textTransform={"uppercase"}>{data?.data?.payment_status_text}</CText>
                                        </Box>
                                        <Box ml="auto">
                                            <CText textAlign={"right"} variant="body4" fontWeight={"bold"} color="gray.300">EXPECTED BY</CText>
                                            <CText textAlign={"right"} color="white">{data?.data?.delivery_date}</CText>
                                        </Box>
                                    </HStack>
                                </Box>
                                <Box>
                                    <CText mb="5px" color="gray.500">Billing Address</CText>
                                    <Box px="10px" py="10px" bgColor={APP_COLOR_LIGHTER} borderRadius={"md"}>
                                        <ItemValueRow title="FIRST NAME" value={billingAddress?.first_name} />
                                        <ItemValueRow title="LAST NAME" value={billingAddress?.last_name} />
                                        <ItemValueRow title="PHONE NUMBER" value={billingAddress?.telephone_code+billingAddress?.phone_number} />
                                        <ItemValueRow title="STREET ADDRESS" value={billingAddress?.street_address} />
                                        <ItemValueRow title="CITY" value={billingAddress?.city?.city_name} />
                                        <ItemValueRow title="STATE" value={billingAddress?.state?.state_name} />
                                        <ItemValueRow title="COUNTRY" value={billingAddress?.country?.country_name} />
                                    </Box>
                                    <CText mt="10px" mb="5px" color="gray.500">
                                        Ordered Items
                                    </CText>
                                    <Box>
                                        {
                                            (data?.data?.items && data?.data?.items?.length > 0)?
                                            <>
                                              {
                                                data?.data?.items?.map((item) => (
                                                    <OrderProductItemComp data={item} />
                                                ))
                                              }
                                            </>:<EmptyPage title="No Order Items" />
                                        }
                                    </Box>
                                </Box>
                            </ScrollView>:<EmptyPage title="Not Found" subtitle="The Order details you seek does not exist." />

                        }
                    </>
                }
            </View>
        </SafeScaffold>
        <OrderStatusOptions iloader={setLoading}  order={data?.data} isOpen={showStatusOptions} onClose={() => setShowStatusOptions(false)} />
        </>
    )
}