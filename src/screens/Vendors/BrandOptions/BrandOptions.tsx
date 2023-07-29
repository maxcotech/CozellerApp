import { View } from "native-base";
import AppBar from "../../../../components/AppBar";
import AppBtn from "../../../../components/AppBtn";
import SafeScaffold from "../../../../components/SafeScaffold";
import { XPADDING } from "../../../config/constants.config";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Brand, BrandParams } from "../../../config/data_types/brand_types";
import { useEffect, useState } from "react";
import CustomInput, { CustomSearchInput } from "../../../../components/CustomInput";
import { ResourceStatuses } from "../../../config/enum.config";
import { useBrands } from "../../../api/queries/brand.queries";
import ProductListSkeleton from "../Dashboard/Products/fragments/ProductListSkeleton";
import EmptyPage from "../../../../components/EmptyPage";
import PaginatedScrollView from "../../../../components/PaginatedScrollView";
import BrandOption from "./fragments/BrandOption";
import routes, { AppNavProps } from "../../../config/routes.config";

export interface BrandRouteParams {
    onSelect: (selected: Brand) => void,
    returnRoute?: string,
    returnRouteParams?: Record<string, any>
}

export default function BrandOptions() {
    const route = useRoute();
    const [params, setParams] = useState({} as BrandRouteParams);
    const navigation = useNavigation<AppNavProps>();
    const [queryParams, setQueryParams] = useState<BrandParams>({
        status: ResourceStatuses.Active
    } as BrandParams)
    const { isLoading, data } = useBrands(queryParams);
    const onProposeNew = () => {
        navigation.navigate(routes.vendorCreateBrand)
    }

    useEffect(() => {
        if (route?.params) {
            setParams(route.params as BrandRouteParams)
        }

    }, [route?.params])
    return (
        <SafeScaffold>
            <AppBar title="Select Brand" right={<AppBtn onPress={onProposeNew} borderRadius={12} textVariant="body4" gradient={true}>Propose New</AppBtn>} />
            <View px={XPADDING} flex={1}>
                <CustomSearchInput onChangeText={(query) => setQueryParams({ ...setQueryParams, query })} my="15px" borderRadius={30} placeholder="Search Brands..." />
                {
                    (isLoading) ?
                        <ProductListSkeleton /> :
                        <>
                            {
                                (data?.data?.data && data?.data?.data?.length > 0) ?
                                    <PaginatedScrollView paginationData={data?.data} onLoadNewPage={(val: BrandParams) => setQueryParams({ ...val })} pageParams={queryParams}>
                                        {
                                            data?.data?.data?.map((item) => (
                                                <BrandOption onSelect={(val) => {
                                                    params.onSelect(val);
                                                    if (params?.returnRoute) {
                                                        navigation.replace(params.returnRoute);
                                                    }

                                                }} data={item} />
                                            ))
                                        }
                                    </PaginatedScrollView> : <EmptyPage title="No Brands Found" subtitle="Could not find brands that matched your search"><AppBtn onPress={onProposeNew} borderRadius={12} textVariant="body4" gradient={true}>Propose New</AppBtn></EmptyPage>
                            }
                        </>
                }
            </View>
        </SafeScaffold>
    )
}