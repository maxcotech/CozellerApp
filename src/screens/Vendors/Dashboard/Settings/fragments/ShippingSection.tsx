import { Box, HStack, View } from "native-base";
import CText from "../../../../../../components/CText";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../../../config/routes.config";

export default function ShippingSection() {
    const navigation = useNavigation<AppNavProps>();
    return (
        <>
            <View mb="20px">
                <CText mb="8px" fontWeight="bold">Shipping Settings</CText>
                <Box borderRadius="lg" backgroundColor={"rgba(0,148,69,0.1)"} >
                    <TouchableOpacity onPress={() => navigation.navigate(routes.shippingGroups)}>
                        <HStack p="12px" alignItems="center" justifyContent={"space-between"}>

                            <HStack space={2} alignItems="center">
                                <MaterialCommunityIcons size={18} name="bus-marker" />
                                <CText>Manage Shipping / Billing</CText>
                            </HStack>

                            <MaterialIcons size={20} name="keyboard-arrow-right" />
                        </HStack>
                    </TouchableOpacity>

                </Box>
            </View>

        </>
    )
}