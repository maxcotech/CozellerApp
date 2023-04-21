import React, {useState,useMemo} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { APP_COLOR } from "../../config/constants.config";
import { Avatar, Box, Center, CloseIcon, HStack, Image, Pressable, ScrollView, View } from "native-base";
import CText from "../../../components/CText";
import AppBtn from "../../../components/AppBtn";
import { useNavigation } from "@react-navigation/native";
import CustomInput from "../../../components/CustomInput";
import { AntDesign, Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import SelectTelephoneCode from "./fragments/SelectTelephoneCode";

export default function Register(){
    const navigation = useNavigation();
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

    const setFormValue = (val: any, key: keyof typeof formState) => {
        setFormState({
            ...formState,
            [key]: val
        })
    }

    
    return (
        <SafeAreaView style={{flex:1,backgroundColor: APP_COLOR}}>
            <ScrollView flex={1} backgroundColor="white">
                <View p="15px">
                    <Pressable onPress={() => navigation.goBack()}>
                        <CloseIcon  />
                    </Pressable>
                </View>
                <Center width="full" px="15px" pt="25px">
                    <Image alt={"App Logo"} size="md" source={require("../../../assets/icon.png")} />
                    <CText variant="heading">Sign Up</CText>
                    <CText variant="body2" textAlign={"center"} mb="18px" px="20px" color="gray.500">Join our community of buyers and sellers today! Register now to start shopping and selling with Cozeller – it's quick and easy. Don't miss out on the fun – sign up now!</CText>
                    <CustomInput prefix={<AntDesign color="gray" name="user" size={16} />} value={formState.first_name} labelText="First Name" my="8px" placeholder="Enter First Name" />
                    <CustomInput prefix={<AntDesign color="gray" name="user" size={16} />} value={formState.last_name} labelText="Last Name" my="8px" placeholder="Enter Last Name" />
                    <CustomInput prefix={<AntDesign color="gray" name="mail" size={16} />} keyboardType="email-address" value={formState.email} labelText="Email Address" my="8px" placeholder="Enter Email Address" />
                    <CustomInput  
                        prefix={<SelectTelephoneCode setValue={(val) => setFormValue(val,"telephone_code")} value={formState.telephone_code} />}
                        keyboardType="phone-pad" value={formState.phone_number} labelText="Phone Number" my="8px" placeholder="eg. 7067532057" />

                </Center>
               
            </ScrollView>
        </SafeAreaView>
    )
}