import { TouchableOpacity } from "react-native";
import AppBar from "../../../../../components/AppBar";
import CText from "../../../../../components/CText";
import SafeScaffold from "../../../../../components/SafeScaffold";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useSubOrders } from "../../../../api/queries/order.queries";
import { SubOrderParams } from "../../../../config/data_types/order.types";
import { View } from "native-base";
import EmptyPage from "../../../../../components/EmptyPage";
import OrderSkeleton from "./Fragment/OrderSkeleton";
import PaginatedScrollView from "../../../../../components/PaginatedScrollView";
import { XPADDING } from "../../../../config/constants.config";


export default function Orders(){
    const [filtersVisibility,setFiltersVisibility] = useState(false);
    const [queryParams,setQueryParams] = useState<Partial<SubOrderParams>>({} as Partial<SubOrderParams>)
    const {isLoading,data} = useSubOrders({})
    return (
        <SafeScaffold>
            <AppBar title="Manage Orders" right={
                <TouchableOpacity onPress={() => setFiltersVisibility(true)}>
                    <MaterialCommunityIcons size={25} name="filter" />
                </TouchableOpacity>
                } 
            />
            <View px={XPADDING} pt="20px" flex={1}>
                {
                    (isLoading)?
                    <OrderSkeleton />:
                    <>
                        {
                        (data?.data?.data && data?.data?.data?.length > 0)?
                        <PaginatedScrollView onLoadNewPage={(newParams: Partial<SubOrderParams>) => setQueryParams({...newParams})} pageParams={queryParams} paginationData={data?.data}>
                            {
                                data?.data?.data?.map((item) => (
                                    <></>
                                ))
                            }
                        </PaginatedScrollView>:<EmptyPage title="No Orders Found" subtitle="Either you have no orders yet or there are no orders found within current search criteria." />
                        }
                    </>
                 
                    
                }
            
            </View>
        </SafeScaffold>
    )
}