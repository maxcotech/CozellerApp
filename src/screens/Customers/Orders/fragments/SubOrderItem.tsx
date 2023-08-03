import { Center, Divider, FlatList, HStack, Icon, VStack, View, useClipboard } from "native-base";
import { SubOrder } from "../../../../config/data_types/order.types";
import { APP_COLOR, APP_COLOR_LIGHTER_2 } from './../../../../config/constants.config';
import CText from "../../../../../components/CText";
import { MaterialIcons } from "@expo/vector-icons";
import Money from "../../../../../components/Money";
import { useProfile } from "../../../../api/queries/account.queries";
import { OrderStatuses, PaymentStatuses } from "../../../../config/enum.config";
import OrderStatusIcon from "../../../Vendors/Dashboard/Orders/Fragment/OrderStatusIcon";
import { getOrderStatusColorScheme, getOrderStatusLabel } from "../../../../helpers/status.helpers";
import { useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import SubOrderOptions from "./SubOrderOptions";
import { OrderQueryKeys, useUpdateSubOrderStatus } from "../../../../api/queries/order.queries";
import { useQueryClient } from "react-query";
import ConfirmDialog from "../../../../../components/ConfirmDialog";
import SubOrderProduct from "./SubOrderProduct";

export enum SubOrderOptionsType {
     ToggleCodeVisibility,
     CopyCode,
     MarkAsDelivered
}

export default function SubOrderItem({ item }: { item: SubOrder }) {
     const profile = useProfile({})
     const [expanded, setExpanded] = useState(false);
     const [confirmStatusChange, setConfirmStatusChange] = useState(false);
     const queryClient = useQueryClient();
     const updateHandle = useUpdateSubOrderStatus({
          onError(data) {
               toast.show(data?.message, { type: "danger" })
          },
          onSuccess(data) {
               toast.show(data?.message, { type: "success" })
               queryClient.invalidateQueries({ queryKey: [OrderQueryKeys.fetchSubOrders] })
               queryClient.invalidateQueries({ queryKey: [OrderQueryKeys.fetchSubOrder] })
          },
     })
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
                         toast.show(`Delivery code copied to clipboard`, { type: "success" });
                    } catch (e) {
                         toast.show(e.message, { type: "danger" })
                    }
               }; break;
               case SubOrderOptionsType.MarkAsDelivered: {

               }; break;

          }
          setShowOptions(false);
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
                    <Divider />
                    <View py="10px">
                         <FlatList

                              data={(expanded) ? item?.items : [item?.items[0]]}
                              renderItem={({ item }) => (
                                   <View mb="10px">
                                        <SubOrderProduct currency={profile?.data?.data?.currency} item={item} />
                                   </View>
                              )
                              }
                         />
                         {
                              (item?.items?.length > 1) ?
                                   <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                                        <Center >
                                             <CText color={APP_COLOR}>{(expanded) ? "View Less" : "View More"}</CText>
                                        </Center>
                                   </TouchableOpacity> : <></>
                         }


                    </View>
               </View>
               <SubOrderOptions onAction={onSelectOption} data={item} show={showOptions} onClose={() => setShowOptions(false)} />
               <ConfirmDialog onConfirm={() => {
                    setConfirmStatusChange(false);
                    updateHandle.mutate({
                         sub_order_id: item.id,
                         fund_password: item.fund_lock_password?.lock_password,
                         new_status: OrderStatuses.STATUS_COMPLETED
                    })
               }} title="Mark as delivered ??" message="This action will be irreversible, press 'Continue' to proceed." isOpen={confirmStatusChange} onClose={() => setConfirmStatusChange(false)} />
          </>
     )
}