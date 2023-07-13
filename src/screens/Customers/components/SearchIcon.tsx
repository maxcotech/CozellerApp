import { useNavigation } from "@react-navigation/native"
import routes, { AppNavProps } from "../../../config/routes.config"
import { AntDesign } from "@expo/vector-icons";
import { Icon } from "native-base";



export default function SearchIcon() {
     const navigation = useNavigation<AppNavProps>();

     return (
          <Icon onPress={() => navigation.navigate(routes.customerSearch)} color="white" size="lg" as={<AntDesign name="search1" />} />
     )
}