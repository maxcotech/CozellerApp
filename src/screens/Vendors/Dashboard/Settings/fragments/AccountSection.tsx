import { AlertDialog, Box, HStack, Spinner, View } from "native-base";
import CText from "../../../../../../components/CText";
import { TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useContext, useRef, useState } from "react";
import ConfirmDialog from "../../../../../../components/ConfirmDialog";
import { useLogoutAccount } from "../../../../../api/queries/account.queries";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../../../config/routes.config";
import AppContext from "../../../../../contexts/AppContext";
import { useQueryClient } from "react-query";
import {Storage} from "expo-storage"
import { AUTH_STORAGE_KEY } from "../../../../../config/constants.config";

export default function AccountSection() {
    const [showLogout, setShowLogout] = useState(false);
    const appContext = useContext(AppContext);
    const queryClient = useQueryClient();
    const navigation = useNavigation<AppNavProps>();
    const {mutate,isLoading} = useLogoutAccount({
        onSuccess: async (data) => {
            queryClient.clear();
            await queryClient.resetQueries();
            appContext.setAuthData(undefined);
            appContext.setProfileData(undefined);
            await Storage.removeItem({key: AUTH_STORAGE_KEY});
            navigation.replace(routes.login)
        }
    });

    const onLogout = () => {
        setShowLogout(false);
        if(!isLoading){
            mutate({})
        }
    }

    return (
        <>
            <View mb="20px" >
                <CText mb="8px" fontWeight="bold">Account</CText>
                <Box borderRadius="lg" backgroundColor={"rgba(0,148,69,0.1)"} >
                    <TouchableOpacity onPress={() => navigation.navigate(routes.changePassword)}>
                        <HStack p="12px" alignItems="center" justifyContent={"space-between"}>

                            <HStack space={2} alignItems="center">
                                <Ionicons size={18} name="key-outline" />
                                <CText>Reset Password</CText>
                            </HStack>

                            <MaterialIcons size={20} name="keyboard-arrow-right" />
                        </HStack>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowLogout(true)}>
                        <HStack p="12px" alignItems="center" justifyContent={"space-between"}>

                            <HStack space={2} alignItems="center">
                                {
                                    (isLoading)?
                                    <Spinner color="red.400" />:
                                    <Ionicons color="red" size={18} name="ios-log-out-outline" />
                                }
                                <CText color="red.400" fontWeight={"bold"}>Sign Out</CText>
                            </HStack>

                            <MaterialIcons size={20} name="keyboard-arrow-right" />
                        </HStack>
                    </TouchableOpacity>
                </Box>
            </View>
            <ConfirmDialog message="You will be logged out of your current session" onConfirm={onLogout} isOpen={showLogout} onClose={() => setShowLogout(false)} />

        </>
    )
}