import { Fab, Icon, View } from "native-base";
import AppBar from "../../../../components/AppBar";
import SafeScaffold from "../../../../components/SafeScaffold";
import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ShippingGroup, ShippingLocationsParams } from "../../../config/data_types/shipping_types";
import { APP_COLOR, XPADDING } from "../../../config/constants.config";
import routes, { AppNavProps } from "../../../config/routes.config";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { useShippingLocations } from "../../../api/queries/shipping.queries";
import OrderSkeleton from "../Dashboard/Orders/Fragment/OrderSkeleton";
import PaginatedScrollView from "../../../../components/PaginatedScrollView";
import EmptyPage from "../../../../components/EmptyPage";
import ShippingLocationItem from "./fragments/ShippingLocationItem";

interface RouteParams extends RouteProp<ParamListBase> {
    params: {
        group: ShippingGroup<string>
    }
}

export default function ShippingLocations(){
    const route = useRoute<RouteParams>();
    const navigation = useNavigation<AppNavProps>();
    const [queryParams,setQueryParams] = useState({} as ShippingLocationsParams)
    const {data,isLoading} = useShippingLocations(queryParams,{
        enabled: (!!queryParams.shipping_group_id && !!queryParams.store_id)
    })
    const locations = useMemo(() => {
        return data?.data?.data ?? [];
    },[data?.data?.data])
    useEffect(() => {
        if(route.params?.group){
            const group = route.params?.group;
            setQueryParams({
                shipping_group_id: group.id,
                store_id: group.store_id
            })
        }
    },[route.params?.group])
    return (
        <SafeScaffold>
            <AppBar title="Manage Shipping Locations" subtitle={"For "+(route.params?.group?.group_name ?? "Selected Group")} />
            <View px={XPADDING} pt="15px" flex={1}>
                {
                    (isLoading)?
                    <OrderSkeleton />:
                    <>
                        {
                            (locations.length > 0)?
                            <PaginatedScrollView onLoadNewPage={(newParams) => setQueryParams(newParams)} pageParams={queryParams} paginationData={data?.data} style={{flex:1}}>
                                {
                                    locations.map((item) => (
                                        <ShippingLocationItem group={route.params?.group} data={item} />
                                    ))
                                }
                            </PaginatedScrollView>:
                            <EmptyPage title="No Shipping Locations" subtitle={`You are yet to add shipping locations for ${route?.params?.group?.group_name ?? "the selected"} group`} />
                        }
                    </>
                }
            </View>
            <Fab renderInPortal={false} onPress={() => navigation.navigate(routes.createShippingLocations,{group:route.params?.group})} backgroundColor={APP_COLOR} label={<Icon size="md" color="white" as={<AntDesign  name="plus" />}  />} />
        </SafeScaffold>
    )
}