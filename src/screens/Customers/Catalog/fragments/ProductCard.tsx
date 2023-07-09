import { Box, HStack, Icon, View } from "native-base";
import { Product } from "../../../../config/data_types/product_types";
import CText from "../../../../../components/CText";
import { Image } from "native-base";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { City, State } from "../../../../config/data_types/location_types";
import { TouchableOpacity } from 'react-native';
import Money from "../../../../../components/Money";
import { Currency } from "../../../../config/data_types/currency_types";
import RatingStars from "./RatingStars";
import AddToCartBtn from "./AddToCartBtn";
import { percentageDiff } from "../../../../helpers/value.helpers";
import { useMemo } from 'react';
import { APP_COLOR } from './../../../../config/constants.config';


export default function ProductCard({ item, currency }: { item: Product, currency: Currency }) {
     const inSales = useMemo(() => {
          return item.regular_price > item.current_price;
     }, [item.current_price, item.regular_price])
     return (
          <View backgroundColor={"white"} borderRadius={8} overflow={"hidden"}>
               <TouchableOpacity style={{ height: 200, width: "100%" }} >
                    <Image source={{ uri: item.product_image }} width="100%" height={"100%"} />
                    {
                         (inSales) ?
                              <Box right={1} top={3} paddingX={2} paddingY={1} position={"absolute"} backgroundColor={"success.100"} borderRadius={3}>
                                   <CText fontWeight={"bold"} variant="body4" color="success.500">{Math.round(percentageDiff(item.current_price, item.regular_price))}%</CText>
                              </Box> : <></>
                    }
                    {
                         (item.amount_in_stock <= 5) ?
                              <Box left={0} top={3} paddingX={3} paddingY={1} position={"absolute"} backgroundColor={"danger.600"} borderRightRadius={8}>
                                   <CText fontWeight={"bold"} variant="body4" color="white">{(item.amount_in_stock === 0) ? "Out of stock" : `${item.amount_in_stock} left`}</CText>
                              </Box> : <></>
                    }

                    <Icon color={(item.in_wishlist) ? APP_COLOR : "white"} position={"absolute"} bottom={3} size="md" right={2} as={<AntDesign name={"heart"} />} />

                    <TouchableOpacity onPress={(e) => {
                         toast.show("idiot.....")
                         e.stopPropagation();
                    }}>
                         <Icon color={APP_COLOR} position={"absolute"} bottom={3} size="md" right={2} as={<AntDesign name={"hearto"} />} />
                    </TouchableOpacity>


               </TouchableOpacity>
               <View padding={2}>
                    <HStack alignItems="center">
                         <Icon size="sm" color="gray.400" as={<EvilIcons name="location" />} />
                         <View flex={1}>
                              <CText variant="body3" color="gray.400" numberOfLines={1}>{(item.store?.city as City)?.city_name}, {(item.store?.state as State)?.state_name}, {(item.store?.country)?.country_name}</CText>

                         </View>
                    </HStack>
                    <CText numberOfLines={2} variant="body3">{item.product_name}</CText>
                    <HStack space={1} marginTop={1} alignItems='center'>
                         <Money currencySym={currency?.currency_sym} fontWeight={"bold"} variant="body1">{item.current_price}</Money>
                         {
                              (inSales) ?
                                   <Money style={{ textDecorationStyle: "solid", textDecorationLine: "line-through" }} currencySym={currency?.currency_sym} variant="body3" color="gray.400">{item.regular_price}</Money> :
                                   <></>

                         }
                    </HStack>
                    <View marginTop={1}>
                         <RatingStars rating={item.review_average} />
                    </View>
                    <View marginTop={2}>
                         <AddToCartBtn product={item} />
                    </View>

               </View>


          </View>
     )
}