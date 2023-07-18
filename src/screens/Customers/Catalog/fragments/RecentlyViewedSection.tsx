import { Divider, FlatList, HStack, Icon, View } from "native-base";
import CText from "../../../../../components/CText";
import { APP_COLOR_LIGHTER_2, NEW_XPADDING } from "../../../../config/constants.config";
import routes, { AppNavProps } from "../../../../config/routes.config";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRecentlyViewed } from "../../../../api/queries/product.queries";
import { useMemo } from "react";
import { useProfile } from "../../../../api/queries/account.queries";
import ProductCard from "./ProductCard";

export default function RecentlyViewedSection({ width }: { width: number }) {
     const navigation = useNavigation<AppNavProps>();
     const { data, isLoading } = useRecentlyViewed({ limit: 10 });
     const profile = useProfile({});
     const itemWidth = useMemo(() => {
          return width / 2;
     }, [width])
     if (isLoading || data?.data?.data?.length === 0) return <></>
     return (
          <View backgroundColor="white" width="full"   >
               <HStack space={2} alignItems="center" justifyContent={"space-between"} paddingX={NEW_XPADDING + "px"} paddingY={2}>
                    <CText fontWeight={"bold"}>Recently Viewed</CText>
                    <TouchableOpacity onPress={() => navigation.navigate(routes.customerCatalog)}>
                         <HStack space={2} alignItems="center">
                              <CText color="gray.400">View all</CText>
                              <Icon color="gray.400" size="sm" as={<AntDesign name={"right"} />} />
                         </HStack>
                    </TouchableOpacity>

               </HStack>
               <Divider color="gray.300" thickness={0.3} />
               <View paddingX={NEW_XPADDING + "px"} paddingY={2}>
                    <FlatList
                         ItemSeparatorComponent={() => <View width={2} height={2}></View>}
                         horizontal={true}
                         data={data?.data?.data}
                         keyExtractor={(item) => item.id?.toString()}
                         renderItem={(context) => <View width={itemWidth}>
                              <ProductCard backgroundColor={APP_COLOR_LIGHTER_2} hideCartBtn={true} currency={profile?.data?.data?.currency} item={context.item.product} />
                         </View>}
                    />
               </View>
          </View>
     )
}