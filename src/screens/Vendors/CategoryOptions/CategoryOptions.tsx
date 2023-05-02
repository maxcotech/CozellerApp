import { useEffect, useState } from "react";
import AppBar from "../../../../components/AppBar";
import SafeScaffold from "../../../../components/SafeScaffold";
import { Category, CategoryParams } from "../../../config/data_types/category_types";
import { Box, View } from "native-base";
import { CustomSearchInput } from "../../../../components/CustomInput";
import { XPADDING } from "../../../config/constants.config";
import PaginatedScrollView from "../../../../components/PaginatedScrollView";
import { useCategories } from "../../../api/queries/category.queries";
import EmptyPage from "../../../../components/EmptyPage";
import ProductListSkeleton from "../Dashboard/Products/fragments/ProductListSkeleton";
import CategoryOption from "./fragments/CategoryOption";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavProps } from "../../../config/routes.config";
import AppBtn from "../../../../components/AppBtn";

export enum SelectOptions {
    selectCategory = 1,
    browseSubCategories = 2,
}
export interface RouteParams {
    onSelect: (selected: Category) => void,
    returnRoute: string
}
export default function CategoryOptions(){
    const [selectedCategory,setSelectedCategory] = useState<Category>(null);
    const navigation = useNavigation<AppNavProps>();
    const route = useRoute();
    const [routeParams,setRouteParams] = useState<RouteParams>({} as RouteParams)
    const [params,setParams] = useState<CategoryParams>({
        levels: 1,
        verbose: 3
    })
    const {data,isLoading} = useCategories(params);
    useEffect(() => {
        if(route?.params){
            setRouteParams(route?.params as RouteParams)
        }
    },[route?.params])
 
    return (
        <SafeScaffold>
            <AppBar 
                right={(params.parent)? <AppBtn onPress={() => {
                    setParams({...params,parent:undefined});
                    setSelectedCategory(null);
                }}  borderRadius={8} textVariant="body4" gradient={true}>Back to main</AppBtn>:<></>}
                subtitle={selectedCategory?.category_title ?? "Main Categories"} title="Select Category" />
            <View py="5px" paddingX={XPADDING} flex={1}>
                <CustomSearchInput onChangeText={(val) => setParams({...params,search:val})} my="10px" placeholder="Search Categories" />
                { 
                    (isLoading)?
                    <ProductListSkeleton />:
                    <>
                        {
                            (data?.data?.data && data?.data?.data?.length > 0)?
                            <PaginatedScrollView showsVerticalScrollIndicator={false} paginationData={data?.data} pageParams={params} onLoadNewPage={(newParams: CategoryParams) => setParams({...params,...newParams})} style={{flex:1}}>
                                {
                                    data?.data?.data?.map((item) => (
                                        <Box py="8px">
                                            <CategoryOption onPress={(option) => {
                                                setSelectedCategory(item);
                                                if(option === SelectOptions.browseSubCategories){
                                                    setParams({...params,parent: item.id})
                                                }
                                                if(option === SelectOptions.selectCategory){
                                                    routeParams?.onSelect(item);
                                                    navigation.replace(routeParams?.returnRoute);
                                                }
                                            }} data={item} />
                                        </Box>
                                    ))
                                }
                            </PaginatedScrollView>:
                            <EmptyPage />
                        }
                    </>
                }
                
            </View>
        </SafeScaffold>
    )
}