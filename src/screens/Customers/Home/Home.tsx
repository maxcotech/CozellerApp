import { HStack, Icon, View, ScrollView } from "native-base";
import { Dimensions, ImageBackground, TouchableOpacity } from "react-native";
import { APP_COLOR, APP_COLOR_LIGHTER, NEW_XPADDING } from "../../../config/constants.config";
import CText from "../../../../components/CText";
import { Image } from "native-base";
import CartIcon from "../components/CartIcon";
import { AntDesign } from "@expo/vector-icons";
import HomeBanners from "./components/HomeBanners";
import { useWidgets } from "../../../api/queries/widgets.queries";
import { DeviceTypesEnum, ResourceStatuses, WidgetTypes } from "../../../config/enum.config";
import MultipleItemWidget from "./components/MultipleItemWidget";
import SingleItemWidget from "./components/SingleItemWidget";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../config/routes.config";
import { useMemo } from 'react';
import FourItemWidget from "./components/FourItemWidget";
import { LinearGradient } from "expo-linear-gradient";
import RecentlyViewedSection from "../Catalog/fragments/RecentlyViewedSection";
import WidgetsSkeleton from "./components/WidgetsSkeleton";


export default function Home() {
     const dimensions = Dimensions.get("screen");
     const widgets = useWidgets({ status: ResourceStatuses.Active, device_type: DeviceTypesEnum.mobile });
     const navigation = useNavigation<AppNavProps>();
     const HomeContents = useMemo(() => {
          return (
               <>
                    <View mt={2}>
                         <HomeBanners pageWidth={dimensions.width} />
                    </View>
                    {
                         (widgets?.isLoading) ?
                              <WidgetsSkeleton pageWidth={dimensions.width} /> :
                              <>
                                   {
                                        widgets?.data?.data?.data.map((item) => {
                                             if (item.widget_type === WidgetTypes.multipleItems) {
                                                  return <View key={item.id} mt={2}><MultipleItemWidget pageWidth={dimensions.width} widget={item} /></View>
                                             }
                                             if (item.widget_type === WidgetTypes.singleItem) {
                                                  return <View key={item.id} mt={2}>
                                                       <SingleItemWidget pageWidth={dimensions.width} widget={item} />
                                                  </View>
                                             }
                                             if (item.widget_type === WidgetTypes.fourItems) {
                                                  return <View key={item.id} mt={2}>
                                                       <FourItemWidget widget={item} pageWidth={dimensions.width} />
                                                  </View>
                                             }
                                             return <></>
                                        })

                                   }
                              </>
                    }

                    <View mt={5}>
                         <RecentlyViewedSection width={dimensions.width} />
                    </View>
               </>
          )
     }, [JSON.stringify(widgets.data?.data?.data), widgets?.isLoading])
     return <>

          <ScrollView backgroundColor={APP_COLOR_LIGHTER} flex={1}>
               {/* <StatusBar backgroundColor="black" translucent /> */}
               <ImageBackground alt="App Background View" blurRadius={1} style={{ width: dimensions.width }} source={require("../../../../assets/home-page-banner2.jpg")}>
                    <LinearGradient colors={[APP_COLOR, "rgba(0,0,0,0.5)", "transparent"]} style={{ flex: 1, paddingHorizontal: NEW_XPADDING, paddingTop: 10, paddingBottom: 10 }}>
                         <HStack alignItems="center" justifyContent={"space-between"}>
                              <HStack alignItems="center">
                                   <Image alt="App Logo Icon" style={{ height: 35, width: 35, marginHorizontal: -6 }} source={require("../../../../assets/adaptive-icon_old2.png")} />
                                   <CText color="white" variant="heading" fontWeight="bold">OZELLER</CText>
                              </HStack>
                              <CartIcon />
                         </HStack>
                         <TouchableOpacity onPress={() => navigation.navigate(routes.customerSearch)}>
                              <HStack borderStyle={"solid"} borderWidth="1px" borderColor={"rgba(255, 255, 255, 0.3)"} alignItems="center" mt={20} mb={5} px={5} py={3} style={{ borderRadius: 30, backgroundColor: "rgba(255, 255, 255, 0.4)" }}>
                                   <Icon size="lg" color="white" as={<AntDesign name="search1" />} />
                                   <CText pl="3" color="white">Search our catalog</CText>
                              </HStack>
                         </TouchableOpacity>
                    </LinearGradient>
               </ImageBackground>
               {HomeContents}


          </ScrollView>
     </>
}