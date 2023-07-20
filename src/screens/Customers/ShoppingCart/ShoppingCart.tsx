import { Box, HStack, Icon, View } from "native-base";
import AppBar from "../../../../components/AppBar";
import { APP_COLOR, NEW_XPADDING } from "../../../config/constants.config";
import PaginatedFlatList from "../../../../components/PaginatedFlatList";
import { useShoppingCart } from "../../../api/queries/shopping_cart.queries";
import { APP_COLOR_LIGHTER } from './../../../config/constants.config';
import IconLoadingPage from "../../../../components/IconLoadingPage";
import EmptyPage from "../../../../components/EmptyPage";
import { useState } from "react";
import { PaginationParams } from "../../../config/data_types/general.types";
import ShoppingCartItemWidget from "./fragments/ShoppingCartItemWidget";
import CText from "../../../../components/CText";
import AppBtn from "../../../../components/AppBtn";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../config/routes.config";
import SafeScaffold from "../../../../components/SafeScaffold";

export default function ShoppingCart() {
     const [params, setParams] = useState<PaginationParams>({})
     const { data, isLoading } = useShoppingCart(params)
     const navigation = useNavigation<AppNavProps>();


     if (isLoading) return <IconLoadingPage />
     return (
          <SafeScaffold>
          <View flex={1}>
               <AppBar textColor={"white"} backgroundColor={APP_COLOR} title="Shopping Cart" />
               <HStack paddingY="5px" paddingX={NEW_XPADDING + "px"} backgroundColor={APP_COLOR_LIGHTER}>
                    <CText>Cart ( {data?.data?.cart_count ?? 0} )</CText>
               </HStack>
               {
                    (data?.data?.data?.length > 0) ?
                         <PaginatedFlatList
                              paddingX={NEW_XPADDING + "px"}
                              flex={1}
                              data={data?.data?.data}
                              paginationData={data?.data}
                              pageParams={params}
                              onLoadNewPage={(newParams) => setParams(newParams)}
                              renderItem={({ item }) => <View marginY={2}><ShoppingCartItemWidget currency={data?.data?.currency} item={item} /></View>}
                         /> : <EmptyPage title="No item in cart" subtitle="You haven't added any item to cart" />
               }
               <HStack space={1} paddingY={2} paddingX={NEW_XPADDING + "px"} alignItems="center">
                    <Box>
                         <AppBtn onPress={() => navigation.navigate(routes.customerHome)} paddingX={10} paddingY={10} borderRadius={4}>
                              <Icon size="md" color="white" as={<AntDesign name="home" />} />
                         </AppBtn>
                    </Box>
                    <Box flex={1}>
                         <AppBtn onPress={() => navigation.navigate(routes.customerCheckout)} borderRadius={4}>
                              CHECKOUT
                         </AppBtn>
                    </Box>

               </HStack>




          </View>
          </SafeScaffold>
     )
}