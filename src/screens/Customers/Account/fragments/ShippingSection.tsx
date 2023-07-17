import { Box, HStack, View } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CText from "../../../../../components/CText";
import routes, { AppNavProps } from "../../../../config/routes.config";

export default function BillingSection() {
    const navigation = useNavigation<AppNavProps>();
    return (
        <>
            <View mb="20px">
                <CText mb="8px" fontWeight="bold">Billing / Shipping</CText>
                <Box borderRadius="lg" backgroundColor={"rgba(0,148,69,0.1)"} >
                    <TouchableOpacity onPress={() => navigation.navigate(routes.customerBillingAddresses)}>
                        <HStack p="12px" alignItems="center" justifyContent={"space-between"}>

                            <HStack space={2} alignItems="center">
                                <MaterialCommunityIcons size={18} name="bus-marker" />
                                <CText>My Billing Addresses</CText>
                            </HStack>
                            <MaterialIcons size={20} name="keyboard-arrow-right" />
                        </HStack>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate(routes.customerCreateAddress)}>
                        <HStack p="12px" alignItems="center" justifyContent={"space-between"}>

                            <HStack space={2} alignItems="center">
                                <MaterialCommunityIcons size={18} name="car-2-plus" />
                                <CText>New Billing Address</CText>
                            </HStack>
                            <MaterialIcons size={20} name="keyboard-arrow-right" />
                        </HStack>
                    </TouchableOpacity>

                </Box>
            </View>

        </>
    )
}