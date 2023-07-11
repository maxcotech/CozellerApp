import { Product, ProductVariation } from "../../../../config/data_types/product_types";
import AppBtn from "../../../../../components/AppBtn";
import { HStack, Spinner } from "native-base";
import CText from "../../../../../components/CText";
import { APP_COLOR, APP_COLOR_LIGHT } from "../../../../config/constants.config";
import { useMemo } from 'react';
import { ShoppingCartKeys, useAddToCart, useUpdateCart } from "../../../../api/queries/shopping_cart.queries";
import { useQueryClient } from "react-query";
import { ProductQueryKeys } from "../../../../api/queries/product.queries";
import VariationCartList from "./VariationCartList";
import { useState } from 'react';
import { Currency } from "../../../../config/data_types/currency_types";

export default function AddToCartBtn({ currency, variation, product, expanded = false }: { product?: Product, variation?: ProductVariation, currency: Currency, expanded?: boolean }) {
     const queryClient = useQueryClient();
     const [showVariations, setShowVariations] = useState(false);
     const entity = useMemo(() => {
          if (variation) return variation;
          return product;
     }, [product, variation]);

     const outOfStock = useMemo(() => {
          return (entity?.amount_in_stock === 0 || entity?.amount_in_stock === null)
     }, [entity?.amount_in_stock])
     const bgColor = useMemo(() => {
          return (outOfStock) ? APP_COLOR_LIGHT : APP_COLOR
     }, [outOfStock])
     const elevation = useMemo(() => {
          return (outOfStock) ? 0 : 4
     }, [outOfStock])
     const availabilityExhaused = useMemo(() => {
          return (entity?.cart_quantity >= entity?.amount_in_stock)
     }, [entity?.cart_quantity, entity?.amount_in_stock])

     const onRefreshActions = () => {
          queryClient.invalidateQueries({ queryKey: [ProductQueryKeys.fetchProducts] })
          queryClient.invalidateQueries({ queryKey: [ProductQueryKeys.fetchProduct] })
          queryClient.invalidateQueries({ queryKey: [ProductQueryKeys.fetchStoreProducts] })
          queryClient.invalidateQueries({ queryKey: [ShoppingCartKeys.fetchItems] })
          queryClient.invalidateQueries({ queryKey: [ShoppingCartKeys.fetchCount] })
     }

     const updateHandle = useUpdateCart({
          onError: (err) => {
               toast.show(err.message, { type: "danger" })
          },
          onSuccess: (data) => {
               toast.show(data.message, { type: "success" });
               onRefreshActions();
          }
     })

     const createHandle = useAddToCart({
          onError: (err) => {
               toast.show(err.message, { type: "danger" })
          },
          onSuccess: (data) => {
               toast.show(data.message, { type: "success" });
               onRefreshActions();
          }
     })


     const onAddToCart = () => {
          const data = {
               item_id: ("product_id" in entity) ? entity.product_id : entity.id,
               variant_id: ("product_id" in entity) ? entity.id : null
          }

          if (entity?.cart_quantity === 0) {
               createHandle.mutate({ ...data })
          } else {
               updateHandle.mutate({
                    quantity: (entity?.cart_quantity ?? 0) + 1,
                    ...data
               })
          }

     }

     const onInitAddToCart = () => {
          if (product.variations?.length > 0) {
               setShowVariations(true);
          } else {
               onAddToCart()
          }

     }

     const onSubtractFromCart = () => {
          const cartQuantity = entity.cart_quantity ?? 0;
          if (cartQuantity > 0) {
               updateHandle.mutate({
                    quantity: cartQuantity - 1,
                    item_id: ("product_id" in entity) ? entity.product_id : entity.id,
                    variant_id: ("product_id" in entity) ? entity.id : null
               })
          }
     }
     if (entity?.cart_quantity > 0 || expanded) {
          return (
               <HStack justifyContent={"space-between"} alignItems={"center"} space={2}>
                    <AppBtn onPress={onAddToCart} disabled={outOfStock || availabilityExhaused} textVariant="body1" elevation={4} paddingY={5} borderRadius={5}>
                         +
                    </AppBtn>
                    {
                         (updateHandle.isLoading || createHandle.isLoading) ?
                              <Spinner size="sm" /> :
                              <CText>{entity?.cart_quantity ?? 0}</CText>
                    }

                    <AppBtn onPress={onSubtractFromCart} disabled={(entity?.cart_quantity ?? 0) === 0} textVariant="body1" elevation={4} paddingY={5} borderRadius={5}>
                         -
                    </AppBtn>

               </HStack>
          )
     }
     return (
          <>
               <AppBtn isLoading={updateHandle.isLoading || createHandle.isLoading} onPress={onInitAddToCart} backgroundColor={bgColor} disabled={outOfStock} elevation={elevation} paddingY={8} borderRadius={8}>
                    Add to cart
               </AppBtn>
               {
                    (entity.hasOwnProperty("variations")) ?
                         <VariationCartList currency={currency} variations={(entity as Product)?.variations as ProductVariation[]} show={showVariations} onClose={() => setShowVariations(false)} /> : <></>

               }
          </>
     )
}