import { FlatList, Image, View } from "native-base";
import { Widget } from "../../../../config/data_types/widgets_types";

export default function FourItemWidget({ pageWidth, widget }: { pageWidth: number, widget: Widget }) {
     const oneFourthWidth = pageWidth / 4;
     return (
          <View>
               <FlatList horizontal={true} directionalLockEnabled={true} data={widget.items} keyExtractor={(item) => item.id?.toString()} renderItem={({ item }) => <Image alt={item.item_title ?? "Widget View "} loadingIndicatorSource={require('../../../../../assets/loading.gif')} style={{ aspectRatio: 1 }} width={oneFourthWidth} source={{ uri: item.item_image_url }} />} />
          </View>
     )
}