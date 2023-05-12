import { Box, HStack, Icon, Image, ScrollView, VStack, View } from "native-base";
import AppBar from "../../../../components/AppBar";
import SafeScaffold from "../../../../components/SafeScaffold";
import { XPADDING } from "../../../config/constants.config";
import { useContext, useState } from "react";
import AppContext from "../../../contexts/AppContext";
import EmptyPage from "../../../../components/EmptyPage";
import AppBtn from "../../../../components/AppBtn";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../config/routes.config";
import { Store } from "../../../config/data_types/store_types";
import { TouchableOpacity } from "react-native";
import CText from "../../../../components/CText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useProfile } from "../../../api/queries/account.queries";

export default function SelectStore(){
    const appContext = useContext(AppContext);
    const [stores,setStores] = useState(appContext.profileData?.stores ?? [])
    const navigation = useNavigation<AppNavProps>();
    useProfile({
        onSuccess: (data) => {
            appContext.setProfileData({...appContext.profileData,...data?.data});
            setStores(data?.data?.stores ?? []);
        }
    })

    const [selectedStore,setSelectedStore] = useState<Store>(appContext?.profileData?.current_store ?? null);
    const onApplySelection = async () => {
        appContext.setProfileData({...appContext.profileData, current_store: selectedStore});
        navigation.replace(routes.vendorDashboard)
    }

    return (
        <SafeScaffold>
            <AppBar title="Select Store" subtitle="Select a store you wish to manage"  />
            <View flex={1} px={XPADDING} pt="20px">
                {
                    (stores.length > 0)?
                    <View flex={1}>
                    <ScrollView flex={1}>
                        {
                            stores.map((store) => (
                                <TouchableOpacity onPress={() => setSelectedStore(store)}  key={store?.id}>
                                    <HStack borderWidth={(selectedStore?.id === store?.id)? 1:0} borderColor="success.400" space={2} alignItems="center" rounded="md" bgColor={(selectedStore?.id === store?.id)? "success.100":"gray.100"} my="6px" px="15px" py="10px" >
                                        <Image rounded={"md"} bgColor={"gray.300"} source={{uri:store?.store_logo}} width="50px" height="50px" />
                                        <VStack flex={1}>
                                            <CText numberOfLines={1}>{store?.store_name}</CText>
                                            <CText color="gray.400" variant="body4">{store?.store_telephone}</CText>
                                            <CText color="gray.400" variant="body4">{store?.store_address}</CText>
                                        </VStack>
                                        <Box> 
                                            <Icon color={(selectedStore?.id === store?.id)? "success.500":"gray.400"} size="md" as={<MaterialCommunityIcons name={(selectedStore?.id === store?.id)?  "checkbox-marked-circle":"checkbox-blank-circle-outline"} />} />
                                        </Box>
                                    </HStack>
                                </TouchableOpacity>
                                
                            ))
                        }
                        
                    </ScrollView>
                    <Box py="10px">
                        <AppBtn onPress={() => onApplySelection()} textVariant="body3">Apply Selection</AppBtn>
                    </Box>
                    </View>:
                    <EmptyPage title='No Store Found' subtitle="You don't have any store in your profile yet">
                        <AppBtn onPress={() => navigation.navigate(routes.joinStore)} gradient={true} textVariant="body4">Join a store</AppBtn>
                    </EmptyPage>
                }
               
            </View>
        </SafeScaffold>
    )
}