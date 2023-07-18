import { FlatList, Image, View } from "native-base";
import { Widget } from "../../../../config/data_types/widgets_types";
import { useMemo } from "react";
import { useCatalogLinkNav } from "../../../../hooks/navigation.hooks";
import { TouchableOpacity } from 'react-native';

export default function FourItemWidget({ pageWidth, widget }: { pageWidth: number, widget: Widget }) {
     const { onNavigate } = useCatalogLinkNav();
     const oneFourthWidth = useMemo(() => {
          return pageWidth / 4;
     }, [pageWidth])
     return (
          <View>
               <FlatList horizontal={true} directionalLockEnabled={true} data={widget.items} keyExtractor={(item) => item.id?.toString()} renderItem={({ item }) => {
                    return (<TouchableOpacity onPress={() => onNavigate(item.item_link)}>
                         <Image
                              progressiveRenderingEnabled={true}
                              alt={"Widget View "}
                              loadingIndicatorSource={require('../../../../../assets/loading.gif')}
                              style={{ aspectRatio: 1 }}
                              width={oneFourthWidth}
                              source={{ uri: item.item_image_url }}
                         />
                    </TouchableOpacity>)
               }}
               />

          </View>
     )
}