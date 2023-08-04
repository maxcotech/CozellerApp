import AppBar from "../../../../components/AppBar";
import EmptyPage from "../../../../components/EmptyPage";
import IconLoadingPage from "../../../../components/IconLoadingPage";
import PaginatedFlatList from "../../../../components/PaginatedFlatList";
import SafeScaffold from "../../../../components/SafeScaffold";
import { usePendingReviews } from "../../../api/queries/reviews.queries";
import { APP_COLOR } from "../../../config/constants.config";
import { PaginationParams } from "../../../config/data_types/general.types";
import CartIcon from "../components/CartIcon";
import { useState } from 'react';
import { useMemo } from 'react';
import PendingReviewItem from "./fragments/PendingReviewItem";
import { View } from "native-base";
import { NEW_XPADDING } from './../../../config/constants.config';

export default function PendingReviews() {
     const [params, setParams] = useState<PaginationParams>({});
     const query = usePendingReviews(params);
     const data = useMemo(() => {
          return query?.data?.data?.data ?? []
     }, [query?.data?.data?.data])
     if (query.isLoading) return <IconLoadingPage />
     return (
          <SafeScaffold>
               <AppBar right={<CartIcon />} textColor="white" backgroundColor={APP_COLOR} title="Pending Reviews" />
               {
                    (data?.length > 0) ?
                         <PaginatedFlatList
                              paddingTop="15px"
                              paddingX={NEW_XPADDING + "px"}
                              data={data}
                              paginationData={query?.data?.data}
                              pageParams={params}
                              onLoadNewPage={(newParams) => setParams(newParams)}
                              renderItem={({ item }) => (
                                   <>
                                        <View mb="10px">
                                             <PendingReviewItem item={item} />
                                        </View>

                                   </>
                              )}
                         /> :
                         <EmptyPage title="No Pending Reviews" subtitle="You do not have any pending reviews to do." />
               }
          </SafeScaffold>
     )
}