import { Product } from "../../../../config/data_types/product_types";
import AppBtn from "../../../../../components/AppBtn";
import { HStack } from "native-base";
import CText from "../../../../../components/CText";
import { APP_COLOR, APP_COLOR_LIGHT } from "../../../../config/constants.config";
import { useMemo } from 'react';

export default function AddToCartBtn({ product }: { product: Product }) {
     const outOfStock = useMemo(() => {
          return (product.amount_in_stock === 0)
     }, [product.amount_in_stock])
     const bgColor = useMemo(() => {
          return (outOfStock) ? APP_COLOR_LIGHT : APP_COLOR
     }, [outOfStock])
     const elevation = useMemo(() => {
          return (outOfStock) ? 0 : 4
     }, [outOfStock])
     if (product.cart_quantity > 0) {
          return (
               <HStack justifyContent={"space-between"} alignItems={"center"}>
                    <AppBtn textVariant="body1" elevation={4} paddingY={5} borderRadius={5}>
                         +
                    </AppBtn>
                    <CText>{product.cart_quantity}</CText>
                    <AppBtn textVariant="body1" elevation={4} paddingY={5} borderRadius={5}>
                         -
                    </AppBtn>

               </HStack>
          )
     }
     return (
          <AppBtn backgroundColor={bgColor} disabled={outOfStock} elevation={elevation} paddingY={8} borderRadius={8}>
               Add to cart
          </AppBtn>
     )
}