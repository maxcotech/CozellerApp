import { useEffect, useMemo } from "react"
import { isIos } from "../../../../helpers/platform.helpers"
import { ActionSheetIOS } from "react-native"
import { SubOrder } from "../../../../config/data_types/order.types";
import { OrderStatuses } from "../../../../config/enum.config";
import { SubOrderOptionsType } from "./SubOrderItem";
import { Actionsheet } from "native-base";
import CText from "../../../../../components/CText";

export default function SubOrderOptions({ data, show, onAction, title = "", onClose }: { title?: string, onAction: (action: SubOrderOptionsType) => void, data: SubOrder, show: boolean, onClose: () => void }) {
     const canMarkAsDelivered = useMemo(() => {
          if (
               data?.status !== OrderStatuses.STATUS_COMPLETED &&
               data?.status !== OrderStatuses.STATUS_AWAITING_REFUND &&
               data?.status !== OrderStatuses.STATUS_CANCELLED &&
               data?.status !== OrderStatuses.STATUS_REFUNDED &&
               data?.status !== OrderStatuses.STATUS_DISPUTED
          ) {
               return true;
          }
          return false
     }, [data?.status])
     useEffect(() => {
          if (isIos() && show) {
               const options = ['Cancel', 'Copy Delivery Code', 'Toggle Code Visibility'];
               if (canMarkAsDelivered) {
                    options.push('Mark as delivered')
               }
               ActionSheetIOS.showActionSheetWithOptions({
                    options,
                    cancelButtonIndex: 0
               }, (btnIndex) => {
                    switch (btnIndex) {
                         case 1: return onAction(SubOrderOptionsType.CopyCode);
                         case 2: return onAction(SubOrderOptionsType.ToggleCodeVisibility);
                         case 3: return onAction(SubOrderOptionsType.MarkAsDelivered);
                         default: return onClose();
                    }
               });
          }
     }, [show])
     if (isIos()) return <></>
     return (
          <Actionsheet isOpen={show} onClose={onClose}>

               <Actionsheet.Content>
                    <CText>Select option</CText>
                    <Actionsheet.Item onPress={() => onAction(SubOrderOptionsType.CopyCode)}>
                         Copy Delivery Code
                    </Actionsheet.Item>
                    <Actionsheet.Item onPress={() => onAction(SubOrderOptionsType.ToggleCodeVisibility)}>
                         Toggle Code Visibility
                    </Actionsheet.Item>
                    {
                         (canMarkAsDelivered) ?
                              <Actionsheet.Item onPress={() => onAction(SubOrderOptionsType.MarkAsDelivered)}>
                                   Mark as delivered
                              </Actionsheet.Item> : <></>
                    }
               </Actionsheet.Content>
          </Actionsheet>
     )
}