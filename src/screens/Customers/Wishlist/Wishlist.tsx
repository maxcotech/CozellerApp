import { HStack, View } from "native-base";
import AppBar from "../../../../components/AppBar";
import SearchIcon from "../components/SearchIcon";
import CartIcon from "../components/CartIcon";
import { APP_COLOR } from "../../../config/constants.config";
import { useWishlist } from "../../../api/queries/wishlist.queries";
import IconLoadingPage from "../../../../components/IconLoadingPage";
import EmptyPage from "../../../../components/EmptyPage";
import ProductCard from "../Catalog/fragments/ProductCard";
import { useProfile } from "../../../api/queries/account.queries";
import { PaginationParams } from "../../../config/data_types/general.types";
import { useState } from 'react';
import PaginatedFlatList from "../../../../components/PaginatedFlatList";
import { NEW_XPADDING } from './../../../config/constants.config';

export default function Wishlist() {
     const [params, setParams] = useState<PaginationParams>({})
     const { data, isLoading } = useWishlist({});
     const profileHandle = useProfile({});
     if (isLoading || profileHandle.isLoading) return <IconLoadingPage />
     return (
          <View flex={1}>
               <AppBar textColor="white" backgroundColor={APP_COLOR} title="Wishlist" right={
                    <HStack space={5} alignItems="center">
                         <SearchIcon />
                         <CartIcon />
                    </HStack>
               } />
               <View paddingX={NEW_XPADDING + "px"} flex={1}>
                    {
                         (data?.data?.data?.length > 0) ?
                              <PaginatedFlatList
                                   contentContainerStyle={{ paddingVertical: 5 }}
                                   pageParams={params}
                                   onLoadNewPage={(newParams) => setParams(newParams)}
                                   paginationData={data?.data}
                                   columnWrapperStyle={{ gap: 8 }}
                                   data={data?.data?.data}
                                   keyExtractor={(item) => item.id?.toString()}
                                   numColumns={2}
                                   renderItem={({ item }) => (<View style={{ flex: 1, gap: 2, marginBottom: 8, flexDirection: 'column' }}>
                                        <ProductCard currency={profileHandle?.data?.data?.currency} item={{ ...item?.product, in_wishlist: true }} />
                                   </View>)
                                   }
                              /> :
                              <EmptyPage title="No item in wishlist" subtitle="You haven't added any favourite item" />
                    }
               </View>
          </View>
     )
}