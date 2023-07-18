import { Box, FlatList, HStack, Icon, Image, ScrollView, VStack, View } from "native-base";
import { Widget } from "../../../../config/data_types/widgets_types";
import { APP_COLOR_LIGHT, NEW_XPADDING } from "../../../../config/constants.config";
import CText from "../../../../../components/CText";
import { useMemo } from "react";
import { TouchableOpacity } from 'react-native';
import { getLastUrlSegment } from "../../../../helpers/string.helpers";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../../config/routes.config";
import { useCatalogLinkNav } from "../../../../hooks/navigation.hooks";
import { AntDesign } from "@expo/vector-icons";

export default function MultipleItemWidget({ widget, pageWidth }: { widget: Widget, pageWidth: number }) {
     const { onNavigate } = useCatalogLinkNav();
     const widgetWidth = useMemo(() => {
          return pageWidth / 3
     }, [pageWidth])
     return (
          <View backgroundColor={"white"} >
               <HStack py={2} backgroundColor={APP_COLOR_LIGHT} alignItems={"center"} justifyContent="space-between" px={NEW_XPADDING + "px"}>
                    <CText fontWeight={"bold"} color="white">{widget.widget_title}</CText>
                    {
                         (widget.widget_link_text) ?
                              <TouchableOpacity onPress={() => {
                                   onNavigate(widget.widget_link_address)
                              }}>
                                   <HStack space={1} alignItems="center">
                                        <CText color="white" fontWeight={"bold"}>{widget.widget_link_text}</CText>
                                        <Icon fontWeight={"bold"} color="white" size="sm" as={<AntDesign name="right" />} />
                                   </HStack></TouchableOpacity> : <></>
                    }
               </HStack>
               <FlatList
                    mb={2}
                    horizontal={true}
                    directionalLockEnabled={true}
                    data={widget.items}
                    keyExtractor={(item) => item.item_title + item.id}
                    renderItem={({ item }) => (
                         <TouchableOpacity onPress={() => {
                              onNavigate(item.item_link);
                         }}>
                              <VStack key={item.id + widget.id + item.item_title} alignItems="center" width={widgetWidth} >
                                   <Image progressiveRenderingEnabled={true} alt={"Multiple Items Widget Item"} loadingIndicatorSource={require('../../../../../assets/loading.gif')} resizeMode="contain" width={widgetWidth} mx={1} height={widgetWidth} source={{ uri: item.item_image_url }} />
                                   <Box width={widgetWidth - 15}><CText variant="body3" textAlign={"center"} numberOfLines={1}>{item.item_title}</CText></Box>
                              </VStack>
                         </TouchableOpacity>
                    )}
               />

          </View>
     )
}