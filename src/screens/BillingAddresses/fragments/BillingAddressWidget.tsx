import { Actionsheet, HStack, Icon, Spinner, View } from "native-base";
import { BillingAddress } from "../../../config/data_types/billing_address.types";
import CText from "../../../../components/CText";
import { NEW_XPADDING } from './../../../config/constants.config';
import { Feather, Fontisto } from "@expo/vector-icons";
import { TouchableOpacity, ActionSheetIOS } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../config/routes.config";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import { ManageResourceActions } from "../../../config/enum.config";
import { isIos } from "../../../helpers/platform.helpers";
import { BillingAddressKeys, useDeleteBillingAddress, useMarkAsCurrentAddr } from "../../../api/queries/billing.queries";
import { useQueryClient } from "react-query";
import { PaymentQueryKeys } from "../../../api/queries/payment.queries";

export default function BillingAddressWidget({ item }: { item: BillingAddress }) {
     const [showDetails, setShowDetails] = useState(false);
     const [showConfirmDelete, setShowConfirmDelete] = useState(false);
     const queryClient = useQueryClient();
     const onRefresh = (message: string) => {
          toast.show(message, { type: "success" });
          queryClient.invalidateQueries({ queryKey: [BillingAddressKeys.fetchBillingAddresses] })
          queryClient.invalidateQueries({ queryKey: [PaymentQueryKeys.fetchCheckout] })
     }
     const markAsCurrentHandle = useMarkAsCurrentAddr({
          onSuccess(data) {
               onRefresh(data?.message);
          }
     })
     const deleteHandle = useDeleteBillingAddress({
          onSuccess(data) {
               onRefresh(data?.message)
          }
     })

     const navigation = useNavigation<AppNavProps>();
     const onDelete = () => {
          setShowConfirmDelete(false);
          deleteHandle.mutate(item.id)
     }

     const onAction = (action: ManageResourceActions) => {
          setShowDetails(false);
          switch (action) {
               case ManageResourceActions.Update: {
                    navigation.navigate(routes.customerUpdateAddress, { defaultData: item });
               }; break;
               case ManageResourceActions.Delete: {
                    setShowConfirmDelete(true)
               }; break;
               case ManageResourceActions.ManageSubResource: {
                    markAsCurrentHandle.mutate(item.id);
               }; break;
               default: { console.log('No legitimate action for billing') }
          }
     }

     useEffect(() => {
          const options = ['Update Address', 'Cancel', 'Delete Address'];
          if (item.is_current !== 1) {
               options.push("Mark as current");
          }
          if (showDetails && isIos()) {
               ActionSheetIOS.showActionSheetWithOptions({
                    options,
                    destructiveButtonIndex: 2,
                    cancelButtonIndex: 1
               }, (btnIndex) => {
                    switch (btnIndex) {
                         case 0: return onAction(ManageResourceActions.Update);
                         case 1: return setShowDetails(false);
                         case 2: return onAction(ManageResourceActions.Delete);
                         case 3: return onAction(ManageResourceActions.ManageSubResource);
                         default: return console.log(`Hello world`);
                    }
               })
          }

     }, [showDetails])



     return (
          <>
               <TouchableOpacity onPress={() => setShowDetails(true)}>
                    <HStack alignItems="center" paddingY={2} paddingX={NEW_XPADDING + "px"} borderRadius={6} backgroundColor={"white"}>
                         <HStack alignItems="center" flex={1} space={2}>
                              {
                                   (markAsCurrentHandle.isLoading) ?
                                        <Spinner size="sm" /> :
                                        <Icon color={(item.is_current) ? "success.500" : "gray.400"} size="md" as={<Fontisto name={(item.is_current) ? "radio-btn-active" : "radio-btn-passive"} />} />
                              }
                              <View flex={1}>
                                   <CText >{item.first_name ?? "----"} {item.last_name ?? "-----"}</CText>
                                   <CText color="gray.400">
                                        {item.street_address ?? "----"}
                                   </CText>
                                   <CText color="gray.400">
                                        {item.city?.city_name ?? "-----"}
                                   </CText>
                                   <CText variant="body3" color="gray.400">
                                        {item.state?.state_name}, {item.country?.country_name}
                                   </CText>
                              </View>
                         </HStack>
                         <View>
                              {
                                   (deleteHandle.isLoading) ?
                                        <Spinner size="sm" /> :
                                        <Icon size="lg" color={"gray.400"} as={<Feather name="more-vertical" />} />
                              }
                         </View>
                    </HStack>
               </TouchableOpacity>
               {
                    (isIos()) ? <></> :
                         <Actionsheet onClose={() => setShowDetails(false)} isOpen={showDetails}>
                              <Actionsheet.Content>
                                   <Actionsheet.Item onPress={() => onAction(ManageResourceActions.Update)}>Update Address</Actionsheet.Item>
                                   {
                                        (item.is_current !== 1) ?
                                             <Actionsheet.Item onPress={() => onAction(ManageResourceActions.ManageSubResource)}>Mark as current</Actionsheet.Item> : <></>
                                   }
                                   <Actionsheet.Item onPress={() => onAction(ManageResourceActions.Delete)}><CText variant="body1" color="danger.400">Delete Address</CText></Actionsheet.Item>

                              </Actionsheet.Content>
                         </Actionsheet>
               }

               <ConfirmDialog onConfirm={onDelete} isOpen={showConfirmDelete} onClose={() => setShowConfirmDelete(false)} title="Delete Billing address ?" message="Once you delete this address, you won't be able to restore it or associated data." />
          </>
     )
}