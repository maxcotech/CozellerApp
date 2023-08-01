import { useEffect } from 'react';
import { isIos } from '../../../../helpers/platform.helpers';
import { ActionSheetIOS } from 'react-native';
import { openUrl } from '../../../../helpers/url.helpers';
import { WHATSAPP_GROUP, WHATSAPP_HELP } from '../../../../config/constants.config';
import { Actionsheet } from 'native-base';
import CText from '../../../../../components/CText';

export default function WhatsappOptions({ show, onClose }: { show: boolean, onClose: () => void }) {
     const title = "Whatsapp Help Options";
     useEffect(() => {
          if (show && isIos()) {
               ActionSheetIOS.showActionSheetWithOptions({
                    title,
                    options: ["Support Group", "Customer Care", "Cancel"],
                    cancelButtonIndex: 2
               }, (btnIndex) => {
                    switch (btnIndex) {
                         case 0: return openUrl(WHATSAPP_GROUP);
                         case 1: return openUrl(WHATSAPP_HELP);
                         default: return onClose()
                    }
               })
          }
     }, [show])

     if (isIos()) return <></>;
     return (
          <Actionsheet isOpen={show} onClose={onClose}>
               <Actionsheet.Content>
                    <CText>{title}</CText>
                    <Actionsheet.Item onPress={() => openUrl(WHATSAPP_GROUP)}>Support Group</Actionsheet.Item>
                    <Actionsheet.Item onPress={() => openUrl(WHATSAPP_HELP)}>Customer Care</Actionsheet.Item>
               </Actionsheet.Content>
          </Actionsheet>
     )
}