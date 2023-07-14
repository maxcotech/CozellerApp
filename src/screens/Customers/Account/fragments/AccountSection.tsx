import { Box, HStack, View } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CText from "../../../../../components/CText";
import routes, { AppNavProps } from "../../../../config/routes.config";

export default function AccountSection() {
     const navigation = useNavigation<AppNavProps>();
     return (
          <>
               <View mb="20px">
                    <CText mb="8px" fontWeight="bold">Account / Preference</CText>
                    <Box borderRadius="lg" backgroundColor={"rgba(0,148,69,0.1)"} >
                         <TouchableOpacity onPress={() => navigation.navigate(routes.customerBillingAddresses)}>
                              <HStack p="12px" alignItems="center" justifyContent={"space-between"}>

                                   <HStack space={2} alignItems="center">
                                        <MaterialCommunityIcons size={18} name="cash" />
                                        <CText>Update Currency</CText>
                                   </HStack>
                                   <MaterialIcons size={20} name="keyboard-arrow-right" />
                              </HStack>
                         </TouchableOpacity>
                         <TouchableOpacity onPress={() => navigation.navigate(routes.customerBillingAddresses)}>
                              <HStack p="12px" alignItems="center" justifyContent={"space-between"}>

                                   <HStack space={2} alignItems="center">
                                        <MaterialCommunityIcons size={18} name="key-change" />
                                        <CText>Change Password</CText>
                                   </HStack>
                                   <MaterialIcons size={20} name="keyboard-arrow-right" />
                              </HStack>
                         </TouchableOpacity>
                         <TouchableOpacity onPress={() => navigation.navigate(routes.customerBillingAddresses)}>
                              <HStack p="12px" alignItems="center" justifyContent={"space-between"}>

                                   <HStack space={2} alignItems="center">
                                        <MaterialCommunityIcons color="red" size={18} name="logout" />
                                        <CText color="danger.500">Sign out</CText>
                                   </HStack>
                                   <MaterialIcons color="red" size={20} name="keyboard-arrow-right" />
                              </HStack>
                         </TouchableOpacity>
                         <TouchableOpacity onPress={() => navigation.navigate(routes.customerBillingAddresses)}>
                              <HStack p="12px" alignItems="center" justifyContent={"space-between"}>

                                   <HStack space={2} alignItems="center">
                                        <MaterialCommunityIcons color="red" size={18} name="delete-forever" />
                                        <CText color="danger.500">Delete Account</CText>
                                   </HStack>
                                   <MaterialIcons color="red" size={20} name="keyboard-arrow-right" />
                              </HStack>
                         </TouchableOpacity>

                    </Box>
               </View>

          </>
     )
}