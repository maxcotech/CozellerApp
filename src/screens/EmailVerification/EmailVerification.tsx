import { SafeAreaView } from "react-native-safe-area-context";
import { APP_COLOR } from "../../config/constants.config";
import { Box, Center, CloseIcon, Image, Spinner, View } from "native-base";
import CText from "../../../components/CText";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState,useEffect } from 'react';
import CodeInput from "./Fragments/CodeInput";
import Counter from "../../../components/Counter";
import { useCompleteEmailVerification, useSendEmailVerification } from "../../api/queries/account.queries";
import { Pressable } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import routes from "../../config/routes.config";
import { AppParamList } from "../../config/routes.config";


export default function EmailVerification(){

    const route = useRoute();
    const navigation = useNavigation<NativeStackNavigationProp<typeof AppParamList>>();
    const [formState,setFormState] = useState({
        password: "",
        email: ""
    })

    const resendCode = useSendEmailVerification({});
    const completeVerification = useCompleteEmailVerification({
        onSuccess: (data) => {
            toast.show(data.message,{type:"success"});
            navigation.replace(routes.login as never);
        }
    });

    const onResendCode = (resetCounter: () => void) => {
            resendCode.mutate(formState.email,{onSuccess:(data) => {
            toast.show(data.message,{type:"success"});
            resetCounter();
        }})
    }
    useEffect(() => {
        if(route.params){
            const {email} = route.params as {email: string}
            setFormState({...formState,email});
        }
    },[route.params])

    return (
        <SafeAreaView style={{backgroundColor:APP_COLOR,flex:1}}>
            <View flex={1}  px="20px" backgroundColor={"white"}>
                <View pt="20px">
                    <Pressable onPress={() => navigation.goBack()}>
                        <CloseIcon  />
                    </Pressable>
                </View>
                <Center  flex={1}>
                    <Image alt={"App Logo"} size="md" source={require("../../../assets/icon.png")} />
                    <CText textAlign={"center"} variant="heading">Verify Your Email</CText>
                    <CText textAlign="center" color="gray.500">Enter the verification code sent to your email address at {formState.email} to complete your email verification.</CText>
                    <Box>
                        {
                            (completeVerification.isLoading)? <Spinner color={APP_COLOR} />:
                            <CodeInput value={formState.password} setValue={(password) => {
                                const newData = {...formState,password}
                                setFormState(newData);
                                if(password.length >= 6){
                                    completeVerification.mutate({...formState,password});
                                }

                            }} />
                        }
                    </Box>
                    <CText mt="10px">Did't receive any code? <Counter 
                        renderActionLabel={ (resetCounter) => {
                            {
                                return (resendCode.isLoading)? <Spinner color={APP_COLOR} />:
                                <CText  color={APP_COLOR} onPress={() => onResendCode(resetCounter)}>Resend Code</CText>
                            }
                        }}
                        renderPendingLabel={(duration) => {
                            return <CText color={APP_COLOR}>Resend in {duration}s</CText>
                        }}  
                    /></CText>
                </Center>
            </View> 
        </SafeAreaView>
    )
}