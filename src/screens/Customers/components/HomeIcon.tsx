import { useNavigation } from "@react-navigation/native"
import routes, { AppNavProps } from "../../../config/routes.config"
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "native-base";



export default function HomeIcon({ color = "white", size = "lg" }) {
     const navigation = useNavigation<AppNavProps>();

     return (
          <Icon onPress={() => navigation.navigate(routes.customerHome)} color={color} size={size} as={<Ionicons name="home-outline" />} />
     )
}