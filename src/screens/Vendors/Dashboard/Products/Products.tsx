import { Actionsheet, Box, Fab, HStack, View } from "native-base";
import AppBar from "../../../../../components/AppBar";
import SafeScaffold from "../../../../../components/SafeScaffold";
import EmptyPage from "../../../../../components/EmptyPage";
import AppBtn from "../../../../../components/AppBtn";
import { APP_COLOR, XPADDING } from "../../../../config/constants.config";
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import ProductListSkeleton from "./fragments/ProductListSkeleton";
import { useStoreProducts } from "../../../../api/queries/product.queries";
import { useContext, useState } from "react";
import AppContext from "../../../../contexts/AppContext";
import { StoreProductParams } from "../../../../config/data_types/product_types";
import { CustomSearchInput } from "../../../../../components/CustomInput";
import ProductListItem from './fragments/ProductListItem';
import PaginatedScrollView from './../../../../../components/PaginatedScrollView';
import CText from "../../../../../components/CText";
import { TouchableOpacity } from "react-native";
import { ResourceStatuses } from "../../../../config/enum.config";
import { getResourceStatusText } from "../../../../helpers/status.helpers";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../../config/routes.config";



export default function Products() {
    const appContext = useContext(AppContext);
    const navigation = useNavigation<AppNavProps>();
    const { current_store } = appContext.profileData;
    const [filtersVisibility, setFiltersVisibility] = useState(false);
    const [params, setParams] = useState<StoreProductParams>({} as StoreProductParams)
    const { isLoading, data, isRefetching } = useStoreProducts({store_id: current_store?.id, ...params });
    const onFilterByStatus = (status: ResourceStatuses) => {
        setFiltersVisibility(false);
        setParams({...params,status})
    }
    return (
        <>
            <SafeScaffold>
                <AppBar subtitle="Create and manage products" title="Manage Products" right={
                    <TouchableOpacity onPress={() => setFiltersVisibility(true)}>
                        <MaterialCommunityIcons size={25} name="filter" />
                    </TouchableOpacity>} />

                <View flex={1} pt="15px" px={XPADDING}>
                    <Box py="5px">
                        <CustomSearchInput backgroundColor={"gray.200"} placeholder="Search Products" isLoading={isRefetching} onChangeText={(query) => setParams({ ...params, query })} value={params.query} />
                    </Box>
                    {
                        (isLoading) ?
                            <ProductListSkeleton /> :
                            <>
                                {
                                    (data?.data?.data && data?.data?.data?.length > 0) ?
                                        <PaginatedScrollView paginationData={data?.data} pageParams={{ ...params, store_id: current_store?.id } as StoreProductParams} onLoadNewPage={(params: StoreProductParams) => {
                                            setParams(params)
                                        }} style={{ flex: 1 }}>
                                            {
                                                data?.data?.data?.map((item) => (
                                                    <View key={item.id} py={"10px"}>
                                                        <ProductListItem data={item} />
                                                    </View>
                                                ))
                                            }
                                        </PaginatedScrollView> :
                                        <EmptyPage subtitle="You haven't added any product yet">
                                            <AppBtn onPress={() => navigation.navigate(routes.vendorCreateProduct)} textVariant="body3" gradient={true}>Add New Product</AppBtn>
                                        </EmptyPage>
                                }
                            </>
                    }
                    <Fab renderInPortal={false} onPress={() => navigation.navigate(routes.vendorCreateProduct)} label={<AntDesign color="white" size={20} name="plus" />} backgroundColor={APP_COLOR} bottom={5} />
                </View>
            </SafeScaffold>
            <Actionsheet onClose={() => setFiltersVisibility(false)} isOpen={filtersVisibility}>
                <Actionsheet.Content>
                    <CText variant="body1">Filter By Status</CText>

                    <Actionsheet.Item onPress={() => onFilterByStatus(ResourceStatuses.Active)} alignSelf="stretch">
                        <HStack py="5px" borderBottomColor={"gray.200"} width="full" alignItems="center" justifyContent={"space-between"}>
                            <CText >{getResourceStatusText(ResourceStatuses.Active)}</CText>
                            <Box ml="auto">
                                <MaterialIcons size={20} name="arrow-forward" />
                            </Box>
                        </HStack>
                    </Actionsheet.Item>
                    <Actionsheet.Item onPress={() => onFilterByStatus(ResourceStatuses.InReview)} alignSelf="stretch">
                        <HStack py="5px" borderBottomColor={"gray.200"} width="full" alignItems="center" justifyContent={"space-between"}>
                            <CText >{getResourceStatusText(ResourceStatuses.InReview)}</CText>
                            <Box ml="auto">
                                <MaterialIcons size={20} name="arrow-forward" />
                            </Box>
                        </HStack>
                    </Actionsheet.Item>
                    <Actionsheet.Item onPress={() => onFilterByStatus(ResourceStatuses.InDraft)} alignSelf="stretch">
                        <HStack py="5px" borderBottomColor={"gray.200"} width="full" alignItems="center" justifyContent={"space-between"}>
                            <CText >{getResourceStatusText(ResourceStatuses.InDraft)}</CText>
                            <Box ml="auto">
                                <MaterialIcons size={20} name="arrow-forward" />
                            </Box>
                        </HStack>
                    </Actionsheet.Item>
                    <Actionsheet.Item onPress={() => onFilterByStatus(ResourceStatuses.Blacklisted)} alignSelf="stretch">
                        <HStack py="5px" borderBottomColor={"gray.200"} width="full" alignItems="center" justifyContent={"space-between"}>
                            <CText >{getResourceStatusText(ResourceStatuses.Blacklisted)}</CText>
                            <Box ml="auto">
                                <MaterialIcons size={20} name="arrow-forward" />
                            </Box>
                        </HStack>
                    </Actionsheet.Item>
                    <Actionsheet.Item onPress={() => onFilterByStatus(ResourceStatuses.Inactive)} alignSelf="stretch">
                        <HStack py="5px" borderBottomColor={"gray.200"} width="full" alignItems="center" justifyContent={"space-between"}>
                            <CText >{getResourceStatusText(ResourceStatuses.Inactive)}</CText>
                            <Box ml="auto">
                                <MaterialIcons size={20} name="arrow-forward" />
                            </Box>
                        </HStack>
                    </Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>
        </>
    )
}