import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box, Button, Center, Input, Text, View } from "native-base";
import React, { useState } from "react";
import { useLogin } from "../../api/queries/account.queries";
import { UserTypes } from "../../config/enum.config";
import { renderErrorText } from "../../helpers/message.helpers";
import routes, { AppParamList } from './../../config/routes.config';
import AppContext from './../../contexts/AppContext';
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

export default function Login(){
    const navigation = useNavigation<NativeStackNavigationProp<typeof AppParamList>>();
    const appContext = React.useContext(AppContext);
    const [formState,setFormState] = useState({
        user_name: "",
        password: ""
    })
    const [passwordVisible,setPasswordVisible] = useState(false);
    const [errors,setErrors] = useState(formState);
    const {isLoading,mutate} = useLogin({
        onSuccess: (data) => {
            if(data.data.user.user_type === UserTypes.customer){
                toast.show(data.message, {type:"success"});
                appContext.setAuthData(data.data);
                navigation.replace(routes.drawer);
            } else {
                toast.show("Sorry , your account is not supported.",{type:"danger"});
            }
        },
        onError:(data) => {
            console.log(data.errors);
            setErrors(data.errors)
        }
    })

    return <View flex={1} backgroundColor="white">
        <Center px={"15px"} mx={"auto"} mt={150} w={["100%","70%","40%"]}>
            
            <Box w="100%">
                <Box my={3}>
                   
                    <Input leftElement={<Box ml={2}><MaterialIcons style={{color:"gray"}} size={18} name="person" /></Box>} fontSize="md" placeholderTextColor={"skyblue"} borderWidth={0} borderBottomWidth={2} onChangeText={(user_name) => setFormState({...formState,user_name})}   placeholder="Username"  value={formState.user_name}  />
                    <Text color="red.400">{renderErrorText(errors?.user_name)}</Text>
                </Box>
                <Box my={3}>
                    
                    
                    <Input rightElement={<Box mr={2}><MaterialIcons onPress={() => setPasswordVisible(!passwordVisible)} size={18} name={(passwordVisible)? "visibility-off":"visibility"} /></Box>} leftElement={<Box ml={2}><MaterialIcons style={{color:"gray"}} size={18} name="lock" /></Box>} fontSize="md" placeholderTextColor={"skyblue"} borderWidth={0} borderBottomWidth={2} onChangeText={(password) => setFormState({...formState,password})}  secureTextEntry={!passwordVisible} placeholder="Password"  value={formState.password}  />
                    <Text color="red.400">{renderErrorText(errors?.password)}</Text>
                </Box>
                <Box mt={10}>
                    <Button py={3} isLoading={isLoading} onPress={() => mutate(formState)}>LOGIN</Button>
                </Box>
            </Box>
        </Center>
    </View>
}