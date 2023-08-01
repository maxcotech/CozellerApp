import AppBar from "../../../../components/AppBar";
import { APP_COLOR } from "../../../config/constants.config";
import SafeScaffold from "../../../../components/SafeScaffold";
import { useSubOrders } from "../../../api/queries/order.queries";
import { useState } from 'react';
import { SubOrderParams } from "../../../config/data_types/order.types";
import { FlatList, HStack, View } from "native-base";
import IconLoadingPage from "../../../../components/IconLoadingPage";
import EmptyPage from "../../../../components/EmptyPage";
import CartIcon from "../components/CartIcon";
import SubOrderItem from "./fragments/SubOrderItem";
import { NEW_XPADDING } from './../../../config/constants.config';

export default function MyOrders() {
     const [params, setParams] = useState<Partial<SubOrderParams>>({ with_items: 1 })
     const query = useSubOrders(params)
     if (query?.isLoading) return <IconLoadingPage />
     return (
          <SafeScaffold>
               <AppBar right={<HStack alignItems="center">
                    <CartIcon />
               </HStack>} backgroundColor={APP_COLOR} textColor="white" title="My Orders" />
               <View flex={1}>
                    {
                         (query?.data?.data?.data?.length > 0) ?
                              <FlatList paddingTop={"10px"} paddingX={NEW_XPADDING + "px"} renderItem={({ item }) => (
                                   <View my="5px">
                                        <SubOrderItem item={item} />
                                   </View>
                              )} data={query?.data?.data?.data} /> :
                              <EmptyPage title="No Orders" subtitle="You don't have any order in your history" />
                    }
               </View>
          </SafeScaffold>
     )
}