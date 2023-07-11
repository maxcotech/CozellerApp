import { Box, HStack, Image, VStack, View } from "native-base";
import { ProductVariation } from "../../../../config/data_types/product_types";
import CText from "../../../../../components/CText";
import { APP_COLOR_LIGHTER, APP_COLOR_LIGHTER_2 } from "../../../../config/constants.config";
import Money from "../../../../../components/Money";
import { Currency } from "../../../../config/data_types/currency_types";
import { useMemo } from 'react';
import AddToCartBtn from "./AddToCartBtn";


export default function VariationListItem({ item, currency }: { currency: Currency, item: ProductVariation }) {
     const hasSales = useMemo(() => {
          return (item.regular_price > item.current_price)
     }, [item.current_price, item.regular_price])
     return (
          <HStack backgroundColor={APP_COLOR_LIGHTER_2} overflow="hidden" borderRadius={8} >
               <Image width={100} style={{ aspectRatio: 1 }} source={{ uri: item.variation_image }} backgroundColor={"gray.300"} />
               <VStack flex={1} paddingX={2} paddingY={2}>
                    <View flex={1}>
                         <CText numberOfLines={2} variant="body3">{item.variation_name ?? "----"}</CText>
                         <HStack space={1} >
                              <Money currencySym={currency?.currency_sym} variant="body1">{item.current_price}</Money>
                              {
                                   (hasSales) ?
                                        <Money color="gray.400" style={{ textDecorationLine: "line-through" }} currencySym={currency?.currency_sym} variant="body3">{item.regular_price}</Money> : <></>

                              }
                         </HStack>
                    </View>

                    <Box paddingY={1} >
                         <AddToCartBtn expanded={true} currency={currency} variation={item} />
                    </Box>
               </VStack>

          </HStack>
     )
}