import { Ionicons } from "@expo/vector-icons";
import { Box, Icon } from "native-base";
import CText from "../../../../components/CText";
import { useCartCount } from "../../../api/queries/shopping_cart.queries";

export default function CartIcon({ color = "white", size = "lg" }) {
     const { data } = useCartCount();
     return (
          <Box >
               <Icon color={color} size={size} as={<Ionicons name="cart-outline" />} />
               {
                    (data?.data > 0) ?
                         <Box bgColor={"danger.400"} px={1} borderRadius={"full"} top={-2} right={-2} position={"absolute"}>
                              <CText color={"white"} variant="body4"> {(data?.data > 9) ? "9+" : data?.data} </CText>
                         </Box> : <></>
               }

          </Box>
     )
}