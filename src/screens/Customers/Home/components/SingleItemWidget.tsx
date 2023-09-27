import { HStack, Icon, Image, View } from "native-base";
import { Widget } from "../../../../config/data_types/widgets_types";
import CText from "../../../../../components/CText";
import { NEW_XPADDING } from "../../../../config/constants.config";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native';
import { useCatalogLinkNav } from "../../../../hooks/navigation.hooks";

export default function SingleItemWidget({ widget, pageWidth }: { widget: Widget, pageWidth?: number }) {
     const { onNavigate } = useCatalogLinkNav();
     return (
          <View>
               <HStack backgroundColor={"danger.200"} py={2} alignItems={"center"} justifyContent="space-between" px={NEW_XPADDING + "px"}>
                    <CText color="black" fontWeight={"bold"}>{widget.widget_title}</CText>
                    {
                         (widget.widget_link_text) ?
                              <TouchableOpacity onPress={() => {
                                   onNavigate(widget.widget_link_address)
                              }}>
                                   <HStack space={1} alignItems="center">
                                        <CText color="black" fontWeight={"bold"}>{widget.widget_link_text}</CText>
                                        <Icon fontWeight={"bold"} color="black" size="sm" as={<AntDesign name="right" />} />
                                   </HStack></TouchableOpacity> : <></>
                    }

               </HStack>
               {
                    widget.items.map((item) => (
                         <TouchableOpacity onPress={() => onNavigate(item.item_link)}>
                              <Image progressiveRenderingEnabled={true} key={item.id} alt={"Single item widget"} resizeMode="cover" loadingIndicatorSource={require('../../../../../assets/image-loader.png')} source={{ uri: item.item_image_url }} width="full" style={{ aspectRatio: 1 }} />
                         </TouchableOpacity>
                    ))
               }
          </View>
     )
}