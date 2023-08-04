import { Box, FlatList, HStack, Icon, Image, View } from "native-base";
import { Widget } from "../../../../config/data_types/widgets_types";
import { useMemo } from "react";
import { useCatalogLinkNav } from "../../../../hooks/navigation.hooks";
import { TouchableOpacity } from 'react-native';
import CText from "../../../../../components/CText";
import { APP_COLOR_LIGHT, APP_COLOR_LIGHTER, APP_COLOR_LIGHTER_2, NEW_XPADDING } from "../../../../config/constants.config";
import { APP_COLOR } from './../../../../config/constants.config';
import { AntDesign } from "@expo/vector-icons";

export default function FourItemWidget({ pageWidth, widget }: { pageWidth: number, widget: Widget }) {
     const { onNavigate } = useCatalogLinkNav();
     const oneFourthWidth = useMemo(() => {
          return pageWidth / 2;
     }, [pageWidth])
     return (
          <View>
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
               <FlatList numColumns={2} data={widget.items} keyExtractor={(item) => item.id?.toString()} renderItem={({ item }) => {
                    if (!!item.item_image_url === false) return <></>
                    return (<TouchableOpacity onPress={() => onNavigate(item.item_link)}>
                         <Image
                              progressiveRenderingEnabled={true}
                              alt={" "}
                              loadingIndicatorSource={require('../../../../../assets/loading.gif')}
                              style={{ aspectRatio: 1 }}
                              width={oneFourthWidth}
                              source={{ uri: item.item_image_url }}
                         />
                         {
                              (!!item?.item_title) ?
                                   <Box px="5px" py="3px" bgColor={APP_COLOR_LIGHTER} bottom={0} right={0} left={0} position={"absolute"}>
                                        <CText color={APP_COLOR} variant="body3" textAlign={"center"}>{item.item_title}</CText>
                                   </Box> : <></>
                         }

                    </TouchableOpacity>)
               }}
               />

          </View>
     )
}