import { Box, HStack, Spinner, View } from "native-base";
import CText from "../../../../../../components/CText";
import { TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../../../config/routes.config";

export default function FundSection() {
    const navigation = useNavigation<AppNavProps>();
    return (
        <>
            <View mb="20px">
                <CText mb="8px" fontWeight="bold">Fund / Wallet</CText>
                <Box borderRadius="lg" backgroundColor={"rgba(0,148,69,0.1)"} >
                    <TouchableOpacity onPress={() => navigation.navigate(routes.vendorBankAccounts)}>
                        <HStack p="12px" alignItems="center" justifyContent={"space-between"}>

                            <HStack space={2} alignItems="center">
                            <MaterialCommunityIcons size={18} name="bank-outline" />
                                <CText fontWeight="bold">Bank Accounts</CText>
                            </HStack>

                            <MaterialIcons size={20} name="keyboard-arrow-right" />
                        </HStack>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate(routes.vendorRequestWithdrawal)}>
                        <HStack p="12px" alignItems="center" justifyContent={"space-between"}>

                            <HStack space={2} alignItems="center">
                                
                                <Ionicons size={18} name="ios-receipt-outline" />
                                
                                <CText  fontWeight="bold">Request Withdrawal</CText>
                            </HStack>

                            <MaterialIcons size={20} name="keyboard-arrow-right" />
                        </HStack>
                    </TouchableOpacity>
                </Box>
            </View>

        </>
    )
}