import { HStack, Icon, VStack, View, useClipboard } from "native-base";
import { SubOrder } from "../../../../config/data_types/order.types";
import { APP_COLOR_LIGHTER_2 } from './../../../../config/constants.config';
import CText from "../../../../../components/CText";
import { MaterialIcons } from "@expo/vector-icons";
import Money from "../../../../../components/Money";
import { useProfile } from "../../../../api/queries/account.queries";
import { PaymentStatuses } from "../../../../config/enum.config";
import OrderStatusIcon from "../../../Vendors/Dashboard/Orders/Fragment/OrderStatusIcon";
import { getOrderStatusColorScheme, getOrderStatusLabel } from "../../../../helpers/status.helpers";
import { useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import SubOrderOptions from "./SubOrderOptions";

export enum SubOrderOptionsType {
     ToggleCodeVisibility,
     CopyCode,
     MarkAsDelivered
}

export default function SubOrderItem({ item }: { item: SubOrder }) {
     const profile = useProfile({})
     const [showOptions, setShowOptions] = useState(false);
     const [showPassword, setShowPassword] = useState(false);
     const clipboard = useClipboard();
     const orderStatusLabel = useMemo(() => {
          return getOrderStatusLabel(item?.status);
     }, [item?.status])
     const orderColorScheme = useMemo(() => {
          return getOrderStatusColorScheme(item?.status)
     }, [item?.status])

     const onSelectOption = async (option: SubOrderOptionsType) => {
          switch (option) {
               case SubOrderOptionsType.CopyCode: {
                    try {
                         await clipboard.onCopy(item.fund_lock_password?.lock_password)
                         toast.show("Delivery code copied to clipboard", { type: "success" })

                    } catch (e) {
                         toast.show(e.message, { type: "danger" })
                    }
               }; break;
               case SubOrderOptionsType.MarkAsDelivered: {

               }
          }
     }
     return (
          <>
               <View borderRadius={8} backgroundColor={APP_COLOR_LIGHTER_2}>
                    <TouchableOpacity onPress={() => setShowOptions(true)} >
                         <HStack justifyContent="space-between" alignItems="flex-start" py="10px" px="10px" >
                              <VStack>
                                   <CText>{item?.store?.store_name}</CText>
                                   <CText variant="body3" color="gray.400">Order No: {item?.order?.order_number}</CText>
                                   <CText mt="10px">
                                        <HStack space={1} borderRadius={8} paddingX="5px" paddingY="2px" backgroundColor={orderColorScheme?.bgColor} alignItems="center">
                                             <OrderStatusIcon iconSize="15px" color={orderColorScheme?.color} status={item?.order?.status} />
                                             <CText variant="body4" color={orderColorScheme?.color}>{orderStatusLabel}</CText>
                                        </HStack>
                                   </CText>



                              </VStack>
                              <VStack alignItems="flex-end">
                                   <Money fontWeight={"bold"} currencySym={profile?.data?.data?.currency?.currency_sym}>{item?.amount}</Money>
                                   <CText color={(item?.payment_status === PaymentStatuses.STATUS_PAID) ? "success.500" : "danger.500"} variant="body3">{item?.payment_status_text}</CText>
                                   <TouchableOpacity onPress={(e) => {
                                        e.stopPropagation();
                                        setShowPassword(!showPassword)
                                   }}>
                                        <HStack space={1} alignItems="center">
                                             <CText>{(showPassword) ? item?.fund_lock_password?.lock_password : "*******"}</CText>
                                             <Icon size="sm" as={<MaterialIcons name={(showPassword) ? "visibility-off" : "visibility"} />} />
                                        </HStack>
                                   </TouchableOpacity>

                                   <CText color="gray.400" variant="body4">Delivery Code</CText>
                              </VStack>
                         </HStack>
                    </TouchableOpacity>

               </View>
               <SubOrderOptions onAction={onSelectOption} data={item} show={showOptions} onClose={() => setShowOptions(false)} />
          </>
     )
}