import { Center, View, Text, HStack, Button } from "native-base";
import React from "react";
import AppContext from "../../contexts/AppContext";
import { useNavigation } from '@react-navigation/native';
import { AuthData } from "../../config/data_types/account_types";
import { useLogoutAccount } from "../../api/queries/account.queries";
import routes from "../../config/routes.config";

export default function Logout(){
    const appContext = React.useContext(AppContext);
    const navigation = useNavigation();
    const {isLoading,mutate} = useLogoutAccount({
        onSuccess: (data) => {
            appContext.setAuthData({} as AuthData);
            toast.show(data.message,{type:"success"});
            navigation.navigate(routes.login as never);
        }
    })

    return (
        <View px={5} flex={1}>
            <Center my="auto">
                <Text fontSize={25} color={"primary.600"} >
                    Proceed Sign-out ?
                </Text>
                <HStack mt={5} space={3}>
                    <Button isLoading={isLoading} onPress={() => mutate({})} flex={1}>YES</Button>
                    <Button onPress={() => navigation.goBack()} flex={1}>CANCEL</Button>
                </HStack>
            </Center>
        </View>
    )
}