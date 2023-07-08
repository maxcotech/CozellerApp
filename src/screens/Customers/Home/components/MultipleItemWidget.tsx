import { Box, FlatList, HStack, Image, ScrollView, VStack, View } from "native-base";
import { Widget } from "../../../../config/data_types/widgets_types";
import { APP_COLOR_LIGHT, NEW_XPADDING } from "../../../../config/constants.config";
import CText from "../../../../../components/CText";

export default function MultipleItemWidget({ widget, pageWidth }: { widget: Widget, pageWidth: number }) {

     return (
          <View backgroundColor={"white"} >
               <HStack py={2} backgroundColor={APP_COLOR_LIGHT} alignItems={"center"} justifyContent="space-between" px={NEW_XPADDING + "px"}>
                    <CText>{widget.widget_title}</CText>
                    <CText>{widget.widget_link_text}</CText>
               </HStack>
               <FlatList
                    mb={2}
                    horizontal={true}
                    directionalLockEnabled={true}
                    data={widget.items}
                    keyExtractor={(item) => item.item_title + item.id}
                    renderItem={({ item }) => (<VStack key={item.id + widget.id + item.item_title} alignItems="center" width={pageWidth / 3} >
                         <Image alt={"Multiple Items Widget Item"} loadingIndicatorSource={require('../../../../../assets/loading.gif')} resizeMode="contain" width={pageWidth / 3} mx={1} height={pageWidth / 3} source={{ uri: item.item_image_url }} />
                         <CText variant="body3" numberOfLines={1}>{item.item_title}</CText>
                    </VStack>)}
               />

          </View>
     )
}