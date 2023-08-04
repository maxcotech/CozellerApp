import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Actionsheet, Box, Center, Checkbox, CloseIcon, HStack, KeyboardAvoidingView, ScrollView } from "native-base";
import React, { useState } from "react";
import { useInitEmailPasswordReset, useLogin } from "../../api/queries/account.queries";
import { AccountTypes } from "../../config/enum.config";
import { createFormErrorObject } from "../../helpers/message.helpers";
import routes, { AppParamList } from './../../config/routes.config';
import AppContext from './../../contexts/AppContext';
import { APP_COLOR, AUTH_STORAGE_KEY } from "../../config/constants.config";
import SafeScaffold from "../../../components/SafeScaffold";
import CText from "../../../components/CText";
import { Image } from "native-base";
import SelectAccountGroup from "../Register/fragments/SelectAccountGroup";
import CustomInput, { CustomPasswordInput } from "../../../components/CustomInput";
import AppBtn from "../../../components/AppBtn";
import { Pressable } from "react-native";
import { LoginData } from "../../config/data_types/account_types";
import { Storage } from "expo-storage";
import { AppRouteProp } from "../../config/data_types/general.types";
import { getProperKeyboardAvoidingArea } from "../../helpers/platform.helpers";

export interface LoginRouteParams extends AppRouteProp {
    params: {
        nextRoute: string,
        nextRouteParams: object
    }
}

export default function Login() {
    const [rememberMe, setRememberMe] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<typeof AppParamList>>();
    const route = useRoute<LoginRouteParams>();
    const appContext = React.useContext(AppContext);
    const [signUpDialog, setSignupDialog] = useState(false)
    const [formState, setFormState] = useState<LoginData>({
        email: "",
        password: ""
    } as LoginData)
    const [errors, setErrors] = useState(createFormErrorObject(formState));
    const forgotPasswordHandle = useInitEmailPasswordReset({
        onSuccess: (data) => {
            toast.show(data?.message, { type: "success" });
            setShowForgotPassword(false);
            navigation.navigate(routes.emailPasswordReset, { email: formState.email })
        },
        onError: (data) => {
            toast.show(data?.message, { type: "danger" });
        }
    })
    const { isLoading, mutate } = useLogin({
        onSuccess: async (data) => {
            console.log('login successful')
            const authData = data.data;
            if (authData.user_type != AccountTypes.StoreStaff && authData.user_type != AccountTypes.Customer && authData.user_type != AccountTypes.StoreOwner) {
                console.log('account not supported')
                toast.show("Sorry, we are terminating this process as your account is currently not supported in this version. Support for customers' account will be available in subsequent releases", { type: "danger" });
            } else {
                //toast.show(data.message, {type:"success"});
                console.log('deciding on route to navigate based on user type')
                appContext.setAuthData(data.data);
                if (rememberMe) {
                    await Storage.setItem({
                        key: AUTH_STORAGE_KEY,
                        value: JSON.stringify(data.data)
                    })
                }
                if (route.params?.nextRoute) {
                    console.log(`navigating to nextRoute`, route.params.nextRoute, route.params?.nextRouteParams)
                    navigation.replace(route.params?.nextRoute, route.params?.nextRouteParams ?? {});
                } else {
                    if (authData.user_type === AccountTypes.StoreStaff || authData.user_type === AccountTypes.StoreOwner) {
                        console.log('navigating to vendor index')
                        navigation.replace(routes.vendorIndex)
                    } else {
                        console.log('navigating to customer index')
                        navigation.replace(routes.customerIndex)
                    }
                }

            }
        },
        onError: (data) => {
            toast.show(data?.message, { type: "danger" })
            setErrors(data.data)
        }
    })

    const onInitForgotPassword = () => {
        forgotPasswordHandle.mutate(formState.email)
    }


    return <><SafeScaffold>
        {
            (navigation.canGoBack()) ?
                <Pressable style={{ paddingHorizontal: 20, paddingTop: 20 }} onPress={() => navigation.goBack()}>
                    <CloseIcon />
                </Pressable>
                : <></>
        }
        <KeyboardAvoidingView flex={1} behavior={getProperKeyboardAvoidingArea()}>
            <ScrollView flex={1}>
                <Center flex={1} mt="100px" px={"20px"} >

                    <Image alt={"App Logo"} size="md" source={require("../../../assets/launcher_icon.png")} />
                    <CText variant="heading">Welcome Back</CText>
                    <CText variant="body2" textAlign={"center"} mb="5px" px="20px" color="gray.500">Sign in to continue easy and smart shopping.</CText>
                    <CText mb="18px">Don't have an account yet ? <CText onPress={() => setSignupDialog(true)} fontWeight="bold" color={APP_COLOR}>Sign up</CText></CText>
                    <CustomInput my="8px" value={formState.email} onChangeText={(email) => setFormState({ ...formState, email })} error={errors.email} keyboardType="email-address" labelText="Email" placeholder="Enter Email Address" />
                    <CustomPasswordInput my="8px" onChangeText={(password) => setFormState({ ...formState, password })} value={formState.password} error={errors.password} placeholder="Enter your password" label={
                        <HStack>
                            <CText flex={1} mb="3px" variant="body2" color="gray.500">Password</CText>
                            <CText onPress={() => setShowForgotPassword(true)} color={APP_COLOR} fontWeight={"bold"}>forgot password?</CText>
                        </HStack>
                    } />
                    <HStack space={2} width="full">
                        <Checkbox aria-label="remember me check" colorScheme={"success"} tintColor={APP_COLOR} onChange={(val) => setRememberMe(val)} value="Terms And Conditions" isChecked={rememberMe} />
                        <CText variant="body2">Remember me</CText>
                    </HStack>
                    <Box width={"full"} mt="30px" mb="15px">
                        <AppBtn isLoading={isLoading} onPress={() => mutate(formState)} gradient={true}>
                            Login
                        </AppBtn>
                    </Box>
                    <Box mt="auto">
                        <CText fontWeight={"bold"} onPress={() => navigation.navigate(routes.customerIndex)} color={APP_COLOR}>Continue as guest</CText>
                    </Box>
                </Center>
            </ScrollView>
        </KeyboardAvoidingView>
        <SelectAccountGroup isOpen={signUpDialog} onClose={() => setSignupDialog(false)} />
    </SafeScaffold>
        <Actionsheet isOpen={showForgotPassword} onClose={() => setShowForgotPassword(false)}>

            <KeyboardAvoidingView alignSelf={"stretch"} behavior={getProperKeyboardAvoidingArea()}>
                <Actionsheet.Content>
                    <Box px={"15px"} py="20px">
                        <CustomInput onChangeText={(email) => setFormState({ ...formState, email })} value={formState.email} autoFocus={true} backgroundColor={"gray.200"} my="8px" labelText="Enter Recovery Email Address" placeholder="Enter email address" />
                        <Box pt="50px">
                            <AppBtn isLoading={forgotPasswordHandle.isLoading} onPress={onInitForgotPassword} gradient={true}>Continue</AppBtn>
                        </Box>
                    </Box>
                </Actionsheet.Content>
            </KeyboardAvoidingView>

        </Actionsheet>
    </>
}