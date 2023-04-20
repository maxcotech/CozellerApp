
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Avatar, Box, Center, HStack, Image, Text } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomAccordion from "../../../../components/CustomAccordion";
import { useNavigation } from '@react-navigation/native';
import routes from "../../../config/routes.config";


export default function DrawerContent(props){
    const navigation = useNavigation();

    return (
        <DrawerContentScrollView {...props} safeArea>
            <Center mt={150} mb={50}>
                <Image width={100} height={100} source={require('../../../../assets/avatar.png')} />
            </Center>
            <Box mx={15}>
                <CustomAccordion
                    title={<HStack space={3} py={3}>
                        <MaterialCommunityIcons size={20} color="primary.600" name="lock" />
                        <Text color="primary.600">Profile</Text>
                    </HStack>}
                >
                <TouchableOpacity  onPress={() => navigation.navigate(routes.accountProfile as never)}>
                    <HStack space={3}>
                        <MaterialCommunityIcons size={18} name="grid" />
                        <Text>My Profile</Text>
                    </HStack>
                </TouchableOpacity>
                </CustomAccordion>
                <TouchableOpacity  onPress={() => navigation.navigate(routes.logout as never)}>
                    <HStack py={3} space={3}>
                        <MaterialCommunityIcons size={20} color="gray" name="power" />
                        <Text color="primary.600">Logout</Text>
                    </HStack>
                </TouchableOpacity>
            </Box>
            
        </DrawerContentScrollView>
    )
}