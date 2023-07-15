import { HStack, View } from "native-base";
import AppBar from "../../../components/AppBar";
import { APP_COLOR } from "../../config/constants.config";
import CartIcon from "../Customers/components/CartIcon";
import SearchIcon from "../Customers/components/SearchIcon";
import EmptyPage from "../../../components/EmptyPage";
import { useBillingAddresses } from "../../api/queries/billing.queries";
import { useState } from 'react';
import { BillingAddressesParams } from "../../config/data_types/billing_address.types";
import PaginatedFlatList from "../../../components/PaginatedFlatList";
import BillingAddressWidget from "./fragments/BillingAddressWidget";
import IconLoadingPage from "../../../components/IconLoadingPage";
import HomeIcon from "../Customers/components/HomeIcon";

export default function BillingAddresses() {
     const [params, setParams] = useState<BillingAddressesParams>({})
     const { isLoading, data } = useBillingAddresses(params);

     if (isLoading) return <IconLoadingPage />;
     return (
          <View flex={1}>
               <AppBar right={
                    <HStack space={5}>
                         <HomeIcon />
                         <CartIcon />
                    </HStack>
               } textColor="white" backgroundColor={APP_COLOR} title="My Billing Addresses"
               />
               {
                    (data?.data?.data?.length > 0) ?
                         <PaginatedFlatList
                              flex={1}
                              onLoadNewPage={(params) => setParams(params)}
                              data={[]}
                              pageParams={params}
                              paginationData={data?.data}
                              renderItem={({ item }) => <View marginY={2}>
                                   <BillingAddressWidget item={item} />
                              </View>}
                         />
                         : <EmptyPage title="No billing address" subtitle="You haven't added any billing address" />

               }
          </View>
     )
}