import { AspectRatio, HStack, Image, View } from "native-base";
import { Widget } from "../../../../config/data_types/widgets_types";
import CText from "../../../../../components/CText";
import { NEW_XPADDING } from "../../../../config/constants.config";

export default function SingleItemWidget({ widget, pageWidth }: { widget: Widget, pageWidth?: number }) {
     return (
          <View>
               <HStack backgroundColor={"danger.200"} py={2} alignItems={"center"} justifyContent="space-between" px={NEW_XPADDING + "px"}>
                    <CText>{widget.widget_title}</CText>
                    <CText>{widget.widget_link_text}</CText>
               </HStack>
               {
                    widget.items.map((item) => (

                         <Image resizeMode="cover" loadingIndicatorSource={require('../../../../../assets/loading.gif')} source={{ uri: item.item_image_url }} width="full" style={{ aspectRatio: 1 }} />

                    ))
               }
          </View>
     )
}