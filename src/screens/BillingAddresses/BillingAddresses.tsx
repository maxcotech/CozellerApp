import { Box, Fab, HStack, Icon, View } from "native-base";
import AppBar from "../../../components/AppBar";
import { APP_COLOR, APP_COLOR_LIGHTER_2, XPADDING } from "../../config/constants.config";
import CartIcon from "../Customers/components/CartIcon";
import EmptyPage from "../../../components/EmptyPage";
import { useBillingAddresses } from "../../api/queries/billing.queries";
import { useState } from 'react';
import { BillingAddressesParams } from "../../config/data_types/billing_address.types";
import PaginatedFlatList from "../../../components/PaginatedFlatList";
import BillingAddressWidget from "./fragments/BillingAddressWidget";
import IconLoadingPage from "../../../components/IconLoadingPage";
import HomeIcon from "../Customers/components/HomeIcon";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../config/routes.config";

export default function BillingAddresses() {
     const [params, setParams] = useState<BillingAddressesParams>({})
     const { isLoading, data } = useBillingAddresses(params);
     const navigation = useNavigation<AppNavProps>();
     if (isLoading) return <IconLoadingPage />;
     return (
          <View backgroundColor={APP_COLOR_LIGHTER_2} flex={1}>
               <AppBar right={
                    <HStack space={5}>
                         <HomeIcon />
                         <CartIcon />
                    </HStack>
               } textColor="white" backgroundColor={APP_COLOR} title="My Billing Addresses"
               />
               {
                    (data?.data?.data?.length > 0) ?
                         <>
                              <PaginatedFlatList
                                   paddingX={XPADDING}
                                   paddingY={2}
                                   flex={1}
                                   onLoadNewPage={(params) => setParams(params)}
                                   data={data?.data?.data}
                                   pageParams={params}
                                   paginationData={data?.data}
                                   renderItem={({ item }) => <View marginY={2}>
                                        <BillingAddressWidget item={item} />
                                   </View>}
                              />
                              <Fab onPress={() => navigation.navigate(routes.customerCreateAddress)} renderInPortal={false} backgroundColor={APP_COLOR} label={<Icon color="white" size={"lg"} as={<MaterialCommunityIcons name="plus" />} />} />
                         </>
                         : <EmptyPage title="No billing address" subtitle="You haven't added any billing address" />

               }
          </View>
     )
}