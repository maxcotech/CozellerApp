import { View } from "native-base";
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { Image } from "native-base";
import HomeBannersSkeleton from "../../Home/components/HomeBannersSkeleton";
import { Image as ImageType } from "../../../../config/data_types/product_types";



export default function ProductSliders({ pageWidth, isLoading, data }: { isLoading: boolean, pageWidth: number, data: Partial<ImageType>[] }) {
     const PAGE_WIDTH = pageWidth;
     const progressValue = useSharedValue<number>(0);

     const baseOptions = {
          vertical: false,
          width: PAGE_WIDTH,
          height: PAGE_WIDTH * 0.6,
     }
     if (isLoading) return <HomeBannersSkeleton height={PAGE_WIDTH * 0.6} />;
     return (

          <View py={1} style={{ alignItems: "center" }}>
               <Carousel
                    {...baseOptions}
                    style={{
                         width: PAGE_WIDTH,
                         height: PAGE_WIDTH
                    }}
                    loop
                    pagingEnabled={true}
                    snapEnabled={true}
                    autoPlay={true}

                    autoPlayInterval={3000}
                    onProgressChange={(_, absoluteProgress) =>
                         (progressValue.value = absoluteProgress)
                    }
                    mode="parallax"
                    modeConfig={{
                         parallaxScrollingScale: 0.9,
                         parallaxScrollingOffset: 50,
                    }}
                    data={data}
                    renderItem={({ index, item }) => <Image alt={"Product Views"} loadingIndicatorSource={require("../../../../../assets/loading.gif")} borderRadius={8} marginX={1} key={index + item.image_url} height={PAGE_WIDTH} source={{ uri: item.image_url }} />}
               />
          </View>
     )
}