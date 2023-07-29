import { Ionicons } from "@expo/vector-icons";
import { Icon } from "native-base";
import { TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../config/routes.config";

export default function AccountIcon({ color = "white", size = "lg" }) {
     const navigation = useNavigation<AppNavProps>();

     return (
          <TouchableOpacity onPress={() => navigation.navigate(routes.customerIndex, { screen: routes.customerAccount })}>
               <Icon color={color} size={size} as={<Ionicons name="person-outline" />} />
          </TouchableOpacity>
     )
}