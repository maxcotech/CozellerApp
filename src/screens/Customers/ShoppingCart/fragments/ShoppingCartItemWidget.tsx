import { Box, HStack, Icon, Image, Spinner, VStack } from "native-base";
import { ShoppingCartItem } from "../../../../config/data_types/shopping_cart.types";
import { useMemo } from 'react';
import CText from "../../../../../components/CText";
import { ProductTypes } from "../../../../config/enum.config";
import Money from "../../../../../components/Money";
import { Currency } from "../../../../config/data_types/currency_types";
import { percentageDiff } from "../../../../helpers/value.helpers";
import { AntDesign } from "@expo/vector-icons";
import AddToCartBtn from "../../Catalog/fragments/AddToCartBtn";
import { TouchableOpacity } from 'react-native';
import ConfirmDialog from "../../../../../components/ConfirmDialog";
import { useState } from 'react';
import { ShoppingCartKeys, useDeleteCartItem } from "../../../../api/queries/shopping_cart.queries";
import { useQueryClient } from "react-query";



export default function ShoppingCartItemWidget({ item, currency }: { item: ShoppingCartItem, currency: Currency }) {
     const [showConfirmRemove, setShowConfirmRemove] = useState(false);
     const queryClient = useQueryClient();
     const deleteHandle = useDeleteCartItem({
          onError(data) {
               toast.show(data?.message, { type: "danger" })
          },
          onSuccess(data) {
               setShowConfirmRemove(false);
               toast.show(data?.message, { type: "success" })
               queryClient.invalidateQueries({ queryKey: [ShoppingCartKeys.fetchCount] })
               queryClient.invalidateQueries({ queryKey: [ShoppingCartKeys.fetchItems] })

          }
     });
     const isSimpleProduct = useMemo(() => {
          return (item.item_type === ProductTypes.SimpleProduct)
     }, [item.item_type])
     const data = useMemo(() => {
          const d = {
               image: (isSimpleProduct) ? item.product?.product_image : item.variation?.variation_image,
               product_name: item.product?.product_name,
               variation_name: item.variation?.variation_name ?? null,
               cart_quantity: item.quantity ?? 0,
               amount_in_stock: (isSimpleProduct) ? item.product.amount_in_stock : item.variation?.amount_in_stock,
               cart_id: item.id,
               id: (isSimpleProduct) ? item.product.id : item.variation.id,
               product_type: ProductTypes.SimpleProduct,
               product_id: undefined,
               current_price: (isSimpleProduct) ? item.product?.current_price : item.variation?.current_price,
               regular_price: (isSimpleProduct) ? item.product?.regular_price : item.variation?.regular_price
          }
          if (!isSimpleProduct) {
               d.product_id = item.product.id;
          }
          return d;
     }, [item])
     return (
          <>
               <HStack backgroundColor={"rgba(255,255,255,0.4)"} borderRadius={8} overflow={"hidden"}>
                    <Image width={100} style={{ aspectRatio: 1 }} source={{ uri: data.image }} />
                    <VStack paddingX={1} paddingY={1} flex={1}>
                         <CText numberOfLines={(item.item_type === ProductTypes.SimpleProduct) ? 2 : 1}>{data.product_name}</CText>
                         {
                              (data.variation_name !== null) ?
                                   <CText numberOfLines={1} variant={"body3"} color="gray.400">Variation: {data.variation_name}</CText> : <></>
                         }
                         <HStack space={1} alignItems="center">
                              <Money fontWeight="bold" currencySym={currency?.currency_sym} variant={"body1"}>{data.current_price}</Money>
                              {
                                   (data.regular_price > data.current_price) ?
                                        <>
                                             <Money color={"gray.400"} style={{ textDecorationLine: "line-through" }} currencySym={currency?.currency_sym} variant={"body2"}>{data.regular_price}</Money>
                                             <Box paddingX={2} paddingY={1} backgroundColor={"success.100"} borderRadius={3}>
                                                  <CText fontWeight={"bold"} variant="body4" color="success.500">{Math.round(percentageDiff(data.current_price, data.regular_price))}%</CText>
                                             </Box>
                                        </> : <></>
                              }
                         </HStack>
                         <HStack marginTop={1} alignItems="center" justifyContent={"space-between"}>
                              {
                                   (deleteHandle.isLoading) ?
                                        <Spinner size="sm" /> :
                                        <TouchableOpacity onPress={() => setShowConfirmRemove(true)}>
                                             <HStack space={1} alignItems={"center"}>
                                                  <Icon color="danger.500" size="sm" as={<AntDesign name="delete" />} />
                                                  <CText color="danger.500">Remove</CText>
                                             </HStack>
                                        </TouchableOpacity>
                              }

                              <Box>
                                   <AddToCartBtn currency={currency} expanded={true} product={data} />
                              </Box>
                         </HStack>
                    </VStack>

               </HStack>
               <ConfirmDialog isLoading={deleteHandle.isLoading} onConfirm={() => {
                    setShowConfirmRemove(false);
                    deleteHandle.mutate(item.id);
               }} message="The selected item will be completely removed from your shopping cart." title={`Removing ${data?.variation_name ?? data?.product_name} from cart?`} isOpen={showConfirmRemove} onClose={() => setShowConfirmRemove(false)} />
          </>
     )
}