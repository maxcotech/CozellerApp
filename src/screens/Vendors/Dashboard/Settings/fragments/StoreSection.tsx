import { Box, HStack, Spinner, View } from "native-base";
import CText from "../../../../../../components/CText";
import { TouchableOpacity } from "react-native";
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../../../config/routes.config";

export default function StoreSection() {
    const navigation = useNavigation<AppNavProps>();
    return (
        <>
            <View mb="20px">
                <CText mb="8px" fontWeight="bold">Store Settings</CText>
                <Box borderRadius="lg" backgroundColor={"rgba(0,148,69,0.1)"} >
                    <TouchableOpacity onPress={() => navigation.navigate(routes.joinStore)}>
                        <HStack p="12px" alignItems="center" justifyContent={"space-between"}>

                            <HStack space={2} alignItems="center">
                            <MaterialCommunityIcons size={18} name="location-enter" />
                                <CText >Join A Store</CText>
                            </HStack>

                            <MaterialIcons size={20} name="keyboard-arrow-right" />
                        </HStack>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate(routes.vendorRequestWithdrawal)}>
                        <HStack p="12px" alignItems="center" justifyContent={"space-between"}>
                            <HStack space={2} alignItems="center">
                                <AntDesign size={18} name="team" />
                                <CText>Manage Store Staffs</CText>
                            </HStack>
                            <MaterialIcons size={20} name="keyboard-arrow-right" />
                        </HStack>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate(routes.vendorRequestWithdrawal)}>
                        <HStack p="12px" alignItems="center" justifyContent={"space-between"}>
                            <HStack space={2} alignItems="center">
                                <Ionicons size={18} name="md-barcode-outline" />
                                <CText>Staff Tokens</CText>
                            </HStack>
                            <MaterialIcons size={20} name="keyboard-arrow-right" />
                        </HStack>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate(routes.vendorRequestWithdrawal)}>
                        <HStack p="12px" alignItems="center" justifyContent={"space-between"}>
                            <HStack space={2} alignItems="center">
                                <MaterialIcons size={18} name="published-with-changes" />
                                <CText>Change Current Store</CText>
                            </HStack>
                            <MaterialIcons size={20} name="keyboard-arrow-right" />
                        </HStack>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate(routes.vendorRequestWithdrawal)}>
                        <HStack p="12px" alignItems="center" justifyContent={"space-between"}>
                            <HStack space={2} alignItems="center">
                                <SimpleLineIcons size={18} name="pencil" />
                                <CText>Update Store</CText>
                            </HStack>
                            <MaterialIcons size={20} name="keyboard-arrow-right" />
                        </HStack>
                    </TouchableOpacity>
                </Box>
            </View>

        </>
    )
}