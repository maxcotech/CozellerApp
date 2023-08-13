import { useNavigation } from "@react-navigation/native"
import routes, { AppNavProps } from "../../../config/routes.config"
import { Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export default function CategoryIcon({ color = "white", size = "md" }) {
     const navigation = useNavigation<AppNavProps>();
     return (
          <Icon title="Categories" onPress={() => navigation.navigate(routes.categoryOptions)} color={color} size={size} as={<Ionicons name="grid-outline" />} />

     )
}