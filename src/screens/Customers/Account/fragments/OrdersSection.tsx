import { Box, HStack, View } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CText from "../../../../../components/CText";
import routes, { AppNavProps } from "../../../../config/routes.config";

export default function OrdersSection() {
     const navigation = useNavigation<AppNavProps>();
     return (
          <>
               <View mb="20px">
                    <CText mb="8px" fontWeight="bold">Orders / Feedback</CText>
                    <Box borderRadius="lg" backgroundColor={"rgba(0,148,69,0.1)"} >
                         <TouchableOpacity onPress={() => navigation.navigate(routes.customerOrders)}>
                              <HStack p="12px" alignItems="center" justifyContent={"space-between"}>

                                   <HStack space={2} alignItems="center">
                                        <MaterialCommunityIcons size={18} name="shopping" />
                                        <CText>My orders</CText>
                                   </HStack>
                                   <MaterialIcons size={20} name="keyboard-arrow-right" />
                              </HStack>
                         </TouchableOpacity>
                         <TouchableOpacity onPress={() => navigation.navigate(routes.customerBillingAddresses)}>
                              <HStack p="12px" alignItems="center" justifyContent={"space-between"}>

                                   <HStack space={2} alignItems="center">
                                        <MaterialCommunityIcons size={18} name="star-check" />
                                        <CText>My Pending Reviews</CText>
                                   </HStack>
                                   <MaterialIcons size={20} name="keyboard-arrow-right" />
                              </HStack>
                         </TouchableOpacity>

                    </Box>
               </View>

          </>
     )
}