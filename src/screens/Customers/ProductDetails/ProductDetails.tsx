import { useNavigation, useRoute } from "@react-navigation/native"
import { ProductQueryKeys, useCatalog, useProduct } from "../../../api/queries/product.queries"
import { AppRouteProp } from "../../../config/data_types/general.types"
import IconLoadingPage from "../../../../components/IconLoadingPage"
import { Box, Divider, FlatList, HStack, ScrollView, Spinner, View } from "native-base"
import AppBar from "../../../../components/AppBar"
import { APP_COLOR, NEW_XPADDING } from "../../../config/constants.config"
import CartIcon from "../components/CartIcon"
import SearchIcon from "../components/SearchIcon"
import ProductSliders from "./fragments/ProductSilders"
import { Dimensions, useWindowDimensions } from 'react-native';
import CText from "../../../../components/CText"
import AppBtn from "../../../../components/AppBtn"
import { Icon } from "native-base"
import { AntDesign } from "@expo/vector-icons"
import routes, { AppNavProps } from "../../../config/routes.config"
import AddToCartBtn from "../Catalog/fragments/AddToCartBtn"
import { useMemo } from 'react';
import Money from "../../../../components/Money"
import { percentageDiff, sumReviewCounts } from "../../../helpers/value.helpers"
import { TouchableOpacity } from 'react-native';
import { WishListKeys, useAddWishlistItem, useDeleteWishlistItem } from "../../../api/queries/wishlist.queries"
import { useQueryClient } from "react-query"
import RatingStars from "../Catalog/fragments/RatingStars"
import RenderHTML from "react-native-render-html"
import ProductCard from "../Catalog/fragments/ProductCard"

export interface ProductParams extends AppRouteProp {
     params: {
          id: string | number
     }
}

export default function ProductDetails() {
     const route = useRoute<ProductParams>()
     const { width } = useWindowDimensions();
     const dimensions = Dimensions.get("screen");
     const navigation = useNavigation<AppNavProps>();
     const queryClient = useQueryClient();
     const { data, isLoading } = useProduct(route.params?.id, {
          enabled: !!route.params?.id
     })
     const catalogHandle = useCatalog({ category_parameter: data?.data?.category?.category_slug }, {
          enabled: (!!data?.data?.category?.category_slug)
     })
     const onRefreshActions = () => {
          queryClient.invalidateQueries({ queryKey: [ProductQueryKeys.fetchProduct] })
          queryClient.invalidateQueries({ queryKey: [ProductQueryKeys.fetchProducts] })
          queryClient.invalidateQueries({ queryKey: [ProductQueryKeys.fetchCategoryProducts] })
          queryClient.invalidateQueries({ queryKey: [WishListKeys.fetchWishlist] })
     }
     const wishListAdd = useAddWishlistItem({
          onSuccess: (data) => {
               toast.show(data.message, { type: "success" });
               onRefreshActions();
          }
     })
     const wishListDelete = useDeleteWishlistItem({
          onSuccess: (data) => {
               toast.show(data.message, { type: "success" });
               onRefreshActions();
          }
     })

     const item = useMemo(() => {
          return data?.data;
     }, [data?.data])

     const runningOut = useMemo(() => {
          return ((data?.data?.amount_in_stock ?? 0) <= 5)
     }, [data?.data?.amount_in_stock])


     if (isLoading) return <IconLoadingPage />;
     return (
          <View flex={1}>
               <AppBar right={
                    <HStack alignItems="center" space={5}>
                         <SearchIcon />
                         <CartIcon />
                    </HStack>
               } textColor="white" backgroundColor={APP_COLOR} title={'Details'} />
               <ScrollView backgroundColor={"rgb(241,241,242)"} flex={1}>
                    <ProductSliders pageWidth={dimensions.width} isLoading={isLoading} data={data.data?.images} />
                    <View width={"full"} backgroundColor={"white"} paddingY={2} paddingX={NEW_XPADDING + "px"}>
                         <HStack width="full" justifyContent={"space-between"} alignItems="center">
                              <Box flex={1}>
                                   <CText variant="body1" numberOfLines={3}>{item.product_name}</CText>
                              </Box>

                         </HStack>

                         <Divider color="gray.100" marginY={3} thickness={0.3} />
                         <HStack space={2} alignItems="center">
                              <Money variant="heading" fontWeight={"bold"} currencySym={item.currency?.currency_sym}>{item.current_price}</Money>
                              {
                                   (item.regular_price > item.current_price) ?
                                        <>
                                             <Money variant="body1" style={{ textDecorationLine: "line-through" }} color="gray.400" currencySym={item.currency?.currency_sym}>{item.regular_price}</Money>
                                             <Box paddingX={2} paddingY={1} backgroundColor={"success.100"} borderRadius={3}>
                                                  <CText fontWeight={"bold"} variant="body2" color="success.500">{Math.round(percentageDiff(item.current_price, item.regular_price))}%</CText>
                                             </Box>
                                        </> : <></>
                              }

                         </HStack>
                         <CText variant="body3" color={(runningOut) ? "danger.500" : "success.500"}>{(item.amount_in_stock === 0) ? "Out of stock" : ((runningOut) ? `${item.amount_in_stock} left` : `${item.amount_in_stock} in stock`)}</CText>
                         <HStack alignItems="center" justifyContent={"space-between"}>
                              <HStack space={2} alignItems="center">
                                   <RatingStars rating={item.review_average} />
                                   <CText>( {sumReviewCounts(item.review_summary)} Reviews ) </CText>
                              </HStack>
                              <Box>
                                   {
                                        (wishListAdd.isLoading || wishListDelete.isLoading) ?
                                             <Box >
                                                  <Spinner size="sm" />
                                             </Box> :

                                             <TouchableOpacity onPress={(e) => {
                                                  if (item.in_wishlist) {
                                                       wishListDelete.mutate({ product_id: item.id })
                                                  } else {
                                                       wishListAdd.mutate({ product_id: item.id })
                                                  }
                                                  e.stopPropagation();
                                             }}>
                                                  <Icon color={(item.in_wishlist) ? APP_COLOR : "gray.400"} size="md" as={<AntDesign name={"heart"} />} />
                                             </TouchableOpacity>
                                   }

                              </Box>

                         </HStack>
                    </View>
                    <Box marginY={1} paddingX={NEW_XPADDING + "px"}>
                         <CText fontWeight={"bold"} color="gray.400">Product Details</CText>
                    </Box>
                    <View width="full" backgroundColor="white"  >
                         <Box paddingX={NEW_XPADDING + "px"} paddingY={2}>
                              <CText fontWeight={"bold"}>Simple Description</CText>
                         </Box>
                         <Divider color="gray.300" thickness={0.3} />
                         <View paddingX={NEW_XPADDING + "px"} >
                              <RenderHTML
                                   source={{ html: item.simple_description }}
                              />
                         </View>
                         {
                              (item.description) ?
                                   <>
                                        <Box paddingX={NEW_XPADDING + "px"} paddingY={2}>
                                             <CText fontWeight={"bold"}>Description</CText>
                                        </Box>
                                        <Divider color="gray.300" thickness={0.3} />
                                        <View paddingX={NEW_XPADDING + "px"} >
                                             <RenderHTML
                                                  source={{ html: item.description }}
                                             />
                                        </View>
                                   </> : <></>
                         }
                         {
                              (item.key_features) ?
                                   <>
                                        <Box paddingX={NEW_XPADDING + "px"} paddingY={2}>
                                             <CText fontWeight={"bold"}>Key Features</CText>
                                        </Box>
                                        <Divider color="gray.300" thickness={0.3} />
                                        <View paddingX={NEW_XPADDING + "px"} >
                                             <RenderHTML
                                                  source={{ html: item.key_features }}
                                             />
                                        </View>
                                   </> : <></>
                         }

                    </View>
                    <Box marginY={1} paddingX={NEW_XPADDING + "px"}>
                         <CText fontWeight={"bold"} color="gray.400">Seller Information</CText>
                    </Box>
                    <View width="full" backgroundColor="white"  >
                         <Box paddingX={NEW_XPADDING + "px"} paddingY={2}>
                              <CText fontWeight={"bold"}>{item.store?.store_name}</CText>
                         </Box>
                         <Divider color="gray.300" thickness={0.3} />
                         <Box paddingX={NEW_XPADDING + "px"} paddingY={2}>
                              <HStack space={2} alignItems={"center"}>
                                   <CText fontWeight={"bold"} color="gray.400">Store Address:</CText>
                                   <CText>{item.store?.store_address ?? "-----"}</CText>
                              </HStack>
                              <HStack space={2} alignItems={"center"}>
                                   <CText fontWeight={"bold"} color="gray.400">City / Region:</CText>
                                   <CText>{(!!item.store?.city) ? ((typeof item.store?.city === "object" && "city_name" in item.store?.city) ? item.store?.city?.city_name : item.store?.city?.toString()) : "-----"}</CText>
                              </HStack>
                              <HStack space={2} alignItems={"center"}>
                                   <CText fontWeight={"bold"} color="gray.400">State:</CText>
                                   <CText>{(!!item.store?.city) ? ((typeof item.store?.state === "object" && "state_name" in item.store?.state) ? item.store?.state?.state_name : item.store?.state?.toString()) : "-----"}</CText>
                              </HStack>
                              <HStack space={2} alignItems={"center"}>
                                   <CText fontWeight={"bold"} color="gray.400">Country:</CText>
                                   <CText>{item.store?.country?.country_name ?? "-----"}</CText>
                              </HStack>
                         </Box>
                    </View>
                    {
                         (catalogHandle?.data?.data?.data?.length > 0) ?
                              <>
                                   <Box marginY={1} paddingX={NEW_XPADDING + "px"}>
                                        <CText fontWeight={"bold"} color="gray.400">You may also like</CText>
                                   </Box>
                                   <View width="full"   >
                                        <HStack backgroundColor="white" space={2} alignItems="center" justifyContent={"space-between"} paddingX={NEW_XPADDING + "px"} paddingY={2}>
                                             <CText fontWeight={"bold"}>From {item.category?.category_title}</CText>
                                             <TouchableOpacity onPress={() => navigation.navigate(routes.customerCatalog, { category_parameter: item.category?.category_slug })}>
                                                  <HStack space={2} alignItems="center">
                                                       <CText color="gray.400">View all</CText>
                                                       <Icon color="gray.400" size="sm" as={<AntDesign name={"right"} />} />
                                                  </HStack>
                                             </TouchableOpacity>

                                        </HStack>
                                        <Divider color="gray.300" thickness={0.3} />
                                        <View paddingX={NEW_XPADDING + "px"} paddingY={2}>
                                             <FlatList
                                                  ItemSeparatorComponent={() => <View width={2} height={2}></View>}
                                                  horizontal={true}
                                                  data={catalogHandle?.data?.data?.data}
                                                  keyExtractor={(item) => item.id?.toString()}
                                                  renderItem={(context) => <View width={width / 2}>
                                                       <ProductCard hideCartBtn={true} currency={item.currency} item={context.item} />
                                                  </View>}
                                             />
                                        </View>
                                   </View>
                              </> : <></>
                    }

               </ScrollView>
               <HStack space={1} paddingY={2} paddingX={NEW_XPADDING + "px"} alignItems="center">
                    <Box>
                         <AppBtn onPress={() => navigation.navigate(routes.customerHome)} paddingX={10} paddingY={10} borderRadius={4}>
                              <Icon size="md" color="white" as={<AntDesign name="home" />} />
                         </AppBtn>
                    </Box>
                    <Box flex={1}>
                         <AddToCartBtn expandedBtnY={7} singleBtnY={11} product={data?.data} currency={data?.data?.currency} />
                    </Box>

               </HStack>
          </View>
     )
}