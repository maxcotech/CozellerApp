import { Ionicons } from "@expo/vector-icons";
import { Icon } from "native-base";

export default function CartIcon({ color = "white", size = "lg" }) {
     return (
          <>
               <Icon color={color} size={size} as={<Ionicons name="cart" />} />
          </>
     )
}