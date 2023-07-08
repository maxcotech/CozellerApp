import { View } from "native-base";
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { useHomeBanners } from "../../../../api/queries/widgets.queries";
import HomeBannersSkeleton from "./HomeBannersSkeleton";
import { Image } from "native-base";



export default function HomeBanners({ pageWidth }) {
     const PAGE_WIDTH = pageWidth;
     const progressValue = useSharedValue<number>(0);
     const { data, isLoading } = useHomeBanners()

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
                    }}
                    loop
                    pagingEnabled={true}
                    snapEnabled={true}
                    autoPlay={true}
                    autoPlayInterval={1500}
                    onProgressChange={(_, absoluteProgress) =>
                         (progressValue.value = absoluteProgress)
                    }
                    mode="parallax"
                    modeConfig={{
                         parallaxScrollingScale: 0.9,
                         parallaxScrollingOffset: 50,
                    }}
                    data={data.data}
                    renderItem={({ index, item }) => <Image alt={"Banner Slide View"} loadingIndicatorSource={require('../../../../../assets/loading.gif')} borderRadius={8} marginX={1} key={index + item.banner} height={PAGE_WIDTH * 0.6} source={{ uri: item.banner }} />}
               />
          </View>
     )
}