import { useEffect } from 'react';
import { isIos } from '../../../../helpers/platform.helpers';
import { ActionSheetIOS } from 'react-native';
import { openUrl } from '../../../../helpers/url.helpers';
import { INSTAGRAM_BUYERS, INSTAGRAM_VENDORS } from '../../../../config/constants.config';
import { Actionsheet } from 'native-base';
import CText from '../../../../../components/CText';

export default function InstagramOptions({ show, onClose }: { show: boolean, onClose: () => void }) {
     const title = "Instagram Help Options";
     useEffect(() => {
          if (show && isIos()) {
               ActionSheetIOS.showActionSheetWithOptions({
                    title,
                    options: ["Vendors' Handle", "Shopping Handle ", "Cancel"],
                    cancelButtonIndex: 2
               }, (btnIndex) => {
                    switch (btnIndex) {
                         case 0: return openUrl(INSTAGRAM_VENDORS);
                         case 1: return openUrl(INSTAGRAM_BUYERS);
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
                    <Actionsheet.Item onPress={() => openUrl(INSTAGRAM_VENDORS)}>Vendors' Handle</Actionsheet.Item>
                    <Actionsheet.Item onPress={() => openUrl(INSTAGRAM_BUYERS)}>Shopping Handle</Actionsheet.Item>
               </Actionsheet.Content>
          </Actionsheet>
     )
}