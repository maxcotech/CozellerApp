import { useNavigation, useRoute } from "@react-navigation/native";
import AppBar from "../../../../components/AppBar";
import SafeScaffold from "../../../../components/SafeScaffold";
import { APP_COLOR, APP_COLOR_LIGHT, APP_COLOR_LIGHTER, APP_COLOR_LIGHTER_2, NEW_XPADDING, SECONDARY_COLOR } from "../../../config/constants.config";
import { useEffect } from 'react';
import { AppRouteProp } from "../../../config/data_types/general.types";
import { Box, FlatList, HStack, Icon, Image, SimpleGrid, View } from "native-base";
import CartIcon from "../components/CartIcon";
import { AntDesign, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import routes, { AppNavProps } from "../../../config/routes.config";
import { CatalogData, CatalogFilters } from "../../../config/data_types/catalog.types";
import { useState } from 'react';
import { useCatalog } from "../../../api/queries/product.queries";
import { useContext } from 'react';
import CatalogContext from "../../../contexts/CatalogContext";
import { useMemo } from 'react';
import PaginatedScrollView from "../../../../components/PaginatedScrollView";
import CText from "../../../../components/CText";
import IconLoadingPage from "../../../../components/IconLoadingPage";
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ProductSortTypes } from "../../../config/enum.config";
import EmptyPage from "../../../../components/EmptyPage";
import ProductCard from "./fragments/ProductCard";
import { RefreshControl } from "react-native-gesture-handler";

export interface CatalogParams extends AppRouteProp {
     params?: CatalogFilters
}

export default function Catalog() {
     const navigation = useNavigation<AppNavProps>();
     const catalogContext = useContext(CatalogContext);
     const [selectedSort, setSelectedSort] = useState<ProductSortTypes>()
     const [showSort, setShowSort] = useState(false);
     const [listView, setListView] = useState(false);
     const dimensions = Dimensions.get("window");
     const fourItemWidth = useMemo(() => (dimensions.width / 4) - (NEW_XPADDING * 2), [NEW_XPADDING, dimensions.width])
     const twoItemWidth = useMemo(() => (dimensions.width / 2) - (NEW_XPADDING * 2), [NEW_XPADDING, dimensions.width])
     const route = useRoute();
     const [params, setParams] = useState<CatalogFilters>({} as CatalogFilters);
     const query = useCatalog(params, {
          onSuccess(data) {
               catalogContext.setFilterLimits(data?.data?.filters)
          }
     })
     //const query = {} as GenericDataResponse<CatalogData>;
     const catalog = useMemo(() => {
          return query?.data?.data ?? {} as CatalogData
     }, [query.data])
     useEffect(() => {
          if (route.params) {
               setParams(route.params);
          }
     }, [route.params])

     const products = useMemo(() => {
          const products = catalog?.data;
          console.log(products, query?.data?.data?.data);
          if (selectedSort === ProductSortTypes.BestRating) {
               products.sort((a, b) => b.review_average - a.review_average)
          }
          else if (selectedSort === ProductSortTypes.HighestPrice) {
               products.sort((a, b) => b.current_price - a.current_price)
          }
          else if (selectedSort === ProductSortTypes.LowestPrice) {
               products.sort((a, b) => a.current_price - b.current_price)
          }
          else if (selectedSort === ProductSortTypes.NewestFirst) {
               products.sort((a, b) => a.id - b.id)
          }
          else if (selectedSort === ProductSortTypes.OldestFirst) {
               products.sort((a, b) => b.id - a.id)
          }
          return products;

     }, [selectedSort, catalog.data, query?.data])

     if (query.isLoading) return <IconLoadingPage />

     return (

          <View flex={1}>
               <AppBar shadow={9} right={
                    <HStack space={5}>
                         <Icon onPress={() => navigation.navigate(routes.customerSearch)} color="white" size="lg" as={<AntDesign name="search1" />} />
                         <CartIcon size="lg" />
                    </HStack>
               } textColor="white" backgroundColor={APP_COLOR} title={catalog?.filters?.main_category?.category_title ?? "All Products"} />
               <PaginatedScrollView flex={1} backgroundColor={APP_COLOR_LIGHTER_2} stickyHeaderIndices={[0, 1]} onLoadNewPage={(newParams) => setParams(newParams)} pageParams={params} paginationData={query.data?.data} >

                    {
                         (!!catalog?.filters?.main_category) ?
                              <View paddingX={NEW_XPADDING + "px"} mb={3}>
                                   {
                                        (catalog?.filters?.main_category?.category_image) ?
                                             <Image alt="Category Main View" width="100%" mt={3} height={"200px"} style={{ borderRadius: 10 }} source={{ uri: catalog?.filters?.main_category?.category_image }} /> : <></>


                                   }
                                   {
                                        (catalog?.filters?.categories?.length > 0) ?
                                             <SimpleGrid flexWrap={"wrap"} flexDir="row" columns={4} space={4} >
                                                  {
                                                       catalog?.filters?.categories?.map((item) => (

                                                            <Box key={item.id} flex={1} my="5px">
                                                                 <TouchableOpacity key={item.id} onPress={() => {
                                                                      navigation.replace(routes.customerCatalog, { category_parameter: item.category_slug })
                                                                 }}>
                                                                      <Image alt={item.category_title} style={{ borderRadius: 10 }} backgroundColor={APP_COLOR_LIGHTER} width={fourItemWidth} height="70px" source={{ uri: item.category_icon }} />
                                                                      <CText numberOfLines={1} textAlign={"center"} variant="body4">{item.category_title}</CText>
                                                                 </TouchableOpacity>
                                                            </Box>

                                                       ))
                                                  }
                                             </SimpleGrid> : <></>
                                   }
                              </View> : <></>
                    }
                    <HStack height="50px" borderTopWidth={0.5} borderTopColor={"gray.100"} marginRight={-NEW_XPADDING} bgColor={APP_COLOR}>
                         <HStack flex={1} alignItems="center">
                              <TouchableOpacity onPress={() => setListView(!listView)}>
                                   <Box height="100%" display={"flex"} justifyContent={"center"} alignItems={"center"} px={20 + "px"} borderRightWidth={0.5} borderRightColor={"gray.100"}>
                                        <Icon size="md" color="white" as={(listView) ? <Ionicons name="grid" /> : <FontAwesome5 name="th-list" />} />
                                   </Box>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => setListView(!listView)}>
                                   <Box height="100%" display={"flex"} flexDir={"row"} justifyContent={"center"} alignItems={"center"} px={"20px"} borderRightWidth={0.5} borderRightColor={"gray.100"}>
                                        <CText variant="body1" color="white">Sort</CText>
                                        <Icon pl="5px" size="md" color="white" as={<Feather name="chevron-down" />} />
                                   </Box>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => setListView(!listView)}>
                                   <Box height="100%" display={"flex"} flexDir={"row"} justifyContent={"center"} alignItems={"center"} px={"20px"} >
                                        <Icon mr="5px" size="sm" color="white" as={<Feather name="filter" />} />
                                        <CText variant="body1" color="white">Filters</CText>
                                   </Box>
                              </TouchableOpacity>
                         </HStack>
                    </HStack>
                    <View flex={1} paddingX={NEW_XPADDING + "px"} pt="10px">
                         {
                              (products.length > 0) ?
                                   <FlatList
                                        columnWrapperStyle={(listView) ? undefined : { gap: 8 }}
                                        key={(listView) ? 1 : 2}
                                        data={products}
                                        keyExtractor={(item) => item.id?.toString()}
                                        numColumns={(listView) ? 1 : 2}
                                        renderItem={({ item }) => (<View style={{ flex: 1, gap: 2, marginBottom: 8, flexDirection: 'column' }}>
                                             <ProductCard currency={query?.data?.data?.filters?.currency} item={item} />
                                        </View>)
                                        }
                                   /> :
                                   <View mt={"20px"}>
                                        <EmptyPage title="No products found" />
                                   </View>
                         }
                    </View>
               </PaginatedScrollView>
          </View>
     )
}