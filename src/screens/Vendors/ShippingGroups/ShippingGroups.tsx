import { Box, Fab, Icon, View } from "native-base";
import AppBar from "../../../../components/AppBar";
import SafeScaffold from "../../../../components/SafeScaffold";
import { useShippingGroups } from "../../../api/queries/shipping.queries";
import { useContext, useMemo, useState } from "react";
import AppContext from "../../../contexts/AppContext";
import { ShippingGroupParams } from "../../../config/data_types/shipping_types";
import EmptyPage from "../../../../components/EmptyPage";
import PaginatedScrollView from "../../../../components/PaginatedScrollView";
import OrderSkeleton from "../Dashboard/Orders/Fragment/OrderSkeleton";
import ShippingGroupItem from "./fragments/ShippingGroupItem";
import { AntDesign } from '@expo/vector-icons';
import { APP_COLOR, XPADDING } from "../../../config/constants.config";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../config/routes.config";

export default function ShippingGroups(){
    const appContext = useContext(AppContext);
    const navigation = useNavigation<AppNavProps>();
    const [queryParams,setQueryParams] = useState({
        store_id: appContext?.profileData?.current_store?.id
    } as ShippingGroupParams)
    const {data,isLoading} = useShippingGroups(queryParams,{enabled: !!queryParams?.store_id})
    const shippingGroups = useMemo(() => {
        return data?.data?.data ?? []
    },[data?.data?.data])
    return (
        <SafeScaffold>
            <AppBar title="Manage Shipping" subtitle="Setup shipping rates for locations" />
            <View  pt="15px" flex={1}>
                {
                    (isLoading)?
                    <Box paddingX={XPADDING}>
                    <OrderSkeleton />
                    </Box>:
                    <>
                        {
                            (shippingGroups.length > 0)?
                            <PaginatedScrollView onLoadNewPage={(newParams) => setQueryParams(newParams)} pageParams={queryParams} paginationData={data?.data}>
                                {
                                    shippingGroups.map((item) => (
                                        <ShippingGroupItem data={item} key={item.id} />
                                    ))
                                }
                            </PaginatedScrollView>:
                            <EmptyPage title="No Shipping Groups" subtitle="You are yet to add shipping groups" />
                        }
                    </>
                }
                
            </View>
            <Fab renderInPortal={false} onPress={() => navigation.navigate(routes.createShippingGroup)} backgroundColor={APP_COLOR} label={<Icon size="md" color="white" as={<AntDesign  name="plus" />}  />} />
        </SafeScaffold>
    )
}