import { Box, HStack, View } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CText from "../../../../../components/CText";
import routes, { AppNavProps } from "../../../../config/routes.config";
import { useContext, useState } from "react";
import AppContext from "../../../../contexts/AppContext";
import { useQueryClient } from "react-query";
import { useLogoutAccount } from "../../../../api/queries/account.queries";
import { Storage } from "expo-storage"
import { AUTH_STORAGE_KEY } from "../../../../config/constants.config";
import ConfirmDialog from "../../../../../components/ConfirmDialog";
import AppBtn from "../../../../../components/AppBtn";


export default function AccountSection() {
     const navigation = useNavigation<AppNavProps>();
     const [showLogout, setShowLogout] = useState(false);
     const appContext = useContext(AppContext);
     const queryClient = useQueryClient();
     const { mutate, isLoading } = useLogoutAccount({
          onSuccess: async (data) => {
               queryClient.clear();
               await queryClient.resetQueries();
               appContext.setAuthData(undefined);
               appContext.setProfileData(undefined);
               await Storage.removeItem({ key: AUTH_STORAGE_KEY });
               navigation.replace(routes.login)
          }
     });

     const onLogout = () => {
          setShowLogout(false);
          if (!isLoading) {
               mutate({})
          }
     }
     return (
          <>
               <View mb="5px">
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
                         <TouchableOpacity onPress={() => setShowLogout(true)}>
                              <HStack p="12px" alignItems="center" justifyContent={"space-between"}>

                                   <HStack space={2} alignItems="center">
                                        <MaterialCommunityIcons color="red" size={18} name="logout" />
                                        <CText color="danger.500">Sign out</CText>
                                   </HStack>
                                   <MaterialIcons color="red" size={20} name="keyboard-arrow-right" />
                              </HStack>
                         </TouchableOpacity>
                         {/* <TouchableOpacity onPress={() => navigation.navigate(routes.customerBillingAddresses)}>
                              <HStack p="12px" alignItems="center" justifyContent={"space-between"}>

                                   <HStack space={2} alignItems="center">
                                        <MaterialCommunityIcons color="red" size={18} name="delete-forever" />
                                        <CText color="danger.500">Delete Account</CText>
                                   </HStack>
                                   <MaterialIcons color="red" size={20} name="keyboard-arrow-right" />
                              </HStack>
                         </TouchableOpacity> */}

                    </Box>
                    <Box mt="20px">
                         <AppBtn textColor="red.500" backgroundColor={"rgba(255,0,0,0.1)"}>Delete Account</AppBtn>
                    </Box>
               </View>
               <ConfirmDialog message="You will be logged out of your current session" onConfirm={onLogout} isOpen={showLogout} onClose={() => setShowLogout(false)} />

          </>
     )
}