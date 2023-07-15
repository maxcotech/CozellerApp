import { useNavigation } from "@react-navigation/native"
import routes, { AppNavProps } from "../../../config/routes.config"
import { AntDesign } from "@expo/vector-icons";
import { Icon } from "native-base";



export default function SearchIcon({ color = "white", size = "lg" }) {
     const navigation = useNavigation<AppNavProps>();

     return (
          <Icon onPress={() => navigation.navigate(routes.customerSearch)} color={color} size={size} as={<AntDesign name="search1" />} />
     )
}