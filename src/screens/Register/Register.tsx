import React, {useState, useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { APP_COLOR } from "../../config/constants.config";
import { Box, Center, Checkbox, CloseIcon, HStack, Image, Pressable, ScrollView, Switch, View } from "native-base";
import CText from "../../../components/CText";
import AppBtn from "../../../components/AppBtn";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomInput from "../../../components/CustomInput";
import { AntDesign } from "@expo/vector-icons";
import SelectTelephoneCode from "./fragments/SelectTelephoneCode";
import { APP_COLOR_LIGHT } from './../../config/constants.config';
import routes from "../../config/routes.config";
import CustomSelect from "../../../components/CustomSelect";
import { AccountGroups, AccountTypes } from "../../config/enum.config";
import {useRegister} from "../../api/queries/account.queries";
import { createFormErrorObject } from "../../helpers/message.helpers";
import { Linking } from "react-native";

export default function Register(){
    const navigation = useNavigation();
    const [agreed,setAgreed] = useState(false)
    const route = useRoute();
    const [showPassword,setShowPassword] = useState(false);
    const [accountGroup,setAccountGroup] = useState<AccountGroups>();
   
    const [formState,setFormState] = useState({
        first_name:"",
        last_name:"",
        phone_number:"",
        email:"",
        password:"",
        confirm_password:"",
        telephone_code:"",
        account_type:1,
        staff_token: ""
    })

    const [errors,setErrors] = useState(createFormErrorObject(formState));
    const setFormValue = (val: any, key: keyof typeof formState) => {
        setFormState({
            ...formState,
            [key]: val
        })
    }
    const {isLoading, mutate} = useRegister({
        onError:(error) => { setErrors(error.data);},
        onSuccess: (data) => {
            toast.show(data.message,{type:"success"});
            navigation.navigate(routes.emailVerification as never,{email:formState.email} as never)
        }
    })
    useEffect(() => {
        const routeParams = route.params as {accountGroup: AccountGroups};
        if(routeParams && routeParams.accountGroup){
            setAccountGroup(routeParams.accountGroup);
        }

    },[route.params])

    
    return (
        <SafeAreaView style={{flex:1,backgroundColor: APP_COLOR}}>
            <ScrollView flex={1} backgroundColor="white">
                {
                    (navigation.canGoBack())?
                    <View p="20px">
                        <Pressable onPress={() => navigation.goBack()}>
                            <CloseIcon  />
                        </Pressable>
                    </View>:<></>
                }
                
                <Center width="full" px="20px" pt="15px">
                    <Image alt={"App Logo"} size="md" source={require("../../../assets/launcher_icon.png")} />
                    <CText variant="heading">Sign Up</CText>
                    <CText variant="body2" textAlign={"center"} mb="5px"  px="20px" color="gray.500">Join our community of buyers and sellers today! Register now to start shopping and selling with Cozeller – it's quick and easy.</CText>
                    <CText mb="18px">Already have an account ? <CText onPress={() => navigation.navigate(routes.login as never)} fontWeight="bold" color={APP_COLOR}>Login</CText></CText> 
                    <CustomInput error={errors.first_name} onChangeText={(val) => setFormValue(val,"first_name")} prefix={<AntDesign color="gray" name="user" size={16} />} value={formState.first_name} labelText="First Name" my="8px" placeholder="Enter First Name" />
                    <CustomInput error={errors.last_name} onChangeText={(val) => setFormValue(val,"last_name")} prefix={<AntDesign color="gray" name="user" size={16} />} value={formState.last_name} labelText="Last Name" my="8px" placeholder="Enter Last Name" />
                    <CustomInput error={errors.email} onChangeText={(val) => setFormValue(val,"email")} prefix={<AntDesign color="gray" name="mail" size={16} />} keyboardType="email-address" value={formState.email} labelText="Email Address" my="8px" placeholder="Enter Email Address" />
                    <CustomInput  
                        error={errors.phone_number}
                        onChangeText={(val) => setFormValue(val,"phone_number")}
                        prefix={<SelectTelephoneCode setValue={(val) => setFormValue(val,"telephone_code")} value={formState.telephone_code} />}
                        keyboardType="phone-pad" value={formState.phone_number} labelText="Phone Number" my="8px" placeholder="eg. 7067532057" 
                    />
                    {
                        (accountGroup && accountGroup != AccountGroups.Buyers)?
                        <CustomSelect error={errors.account_type} my="8px" onValueChange={(val) => setFormValue(val,"account_type")} options={[
                            {value: AccountTypes.StoreOwner, title: "Store Owner"},
                            {value: AccountTypes.StoreStaff, title: "Store Staff"},
                        ]} value={formState.account_type} labelText="Account Type" placeholder="Select Account Type" />: 
                        <></>
                    }
                    {
                        (formState.account_type == AccountTypes.StoreStaff)? 
                        <CustomInput error={errors.staff_token} my="8px" labelText="Staff Token" placeholder="Enter token issued to you" value={formState.staff_token} onChangeText={(val) => setFormValue(val,"staff_token")} />:<></>
                    }
                    
                    <CustomInput error={errors.password} onChangeText={(val) => setFormValue(val,"password")} prefix={<AntDesign color="gray" name="lock" size={16} />} secureTextEntry={!showPassword} value={formState.password} labelText="Password" my="8px" placeholder="Enter a password" />
                    <CustomInput error={errors.confirm_password} onChangeText={(val) => setFormValue(val,"confirm_password")} prefix={<AntDesign color="gray" name="lock" size={16} />} secureTextEntry={!showPassword} value={formState.confirm_password} labelText="Confirm Password" my="8px" placeholder="Confirm Password" />
                    <HStack width="full" space={1}>
                        <Switch colorScheme={"success"} value={showPassword} onValueChange={(val) => setShowPassword(val)} />
                        <CText>Password Visibility</CText>
                    </HStack>
                    <HStack alignItems={"center"} mt="10px" width="full" space={2}>
                        <Checkbox colorScheme={"success"} aria-label="agree to terms and conditions" onChange={(val) => setAgreed(val)} value="Terms And Conditions" isChecked={agreed} />
                        <CText variant="body3">By signing in, you agree to the <CText variant="body3" color={APP_COLOR} onPress={() => Linking.openURL("https://cozeller.com/terms-and-conditions")}>Terms and Conditions</CText> governing activities in Cozeller marketplace.</CText>
                    </HStack>
                    <Box width={"full"} my="30px">
                        <AppBtn onPress={() => {
                            if(agreed){
                                mutate(formState)
                            } else {
                                toast.show("Please you must agree to the terms and conditions before you can proceed",{type:"danger"});
                            }
                        } } isLoading={isLoading} toUppercase={true} gradient={true}>
                            Register
                        </AppBtn>
                    </Box>
                    
                </Center>
               
            </ScrollView>
        </SafeAreaView>
    )
}