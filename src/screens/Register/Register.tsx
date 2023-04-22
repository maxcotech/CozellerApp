import React, {useState,useMemo} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { APP_COLOR } from "../../config/constants.config";
import { Avatar, Box, Center, CloseIcon, HStack, Image, Pressable, ScrollView, Select, View } from "native-base";
import CText from "../../../components/CText";
import AppBtn from "../../../components/AppBtn";
import { useNavigation } from "@react-navigation/native";
import CustomInput from "../../../components/CustomInput";
import { AntDesign, Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import SelectTelephoneCode from "./fragments/SelectTelephoneCode";
import { APP_COLOR_LIGHT } from './../../config/constants.config';
import routes from "../../config/routes.config";
import CustomSelect from "../../../components/CustomSelect";

export default function Register(){
    const navigation = useNavigation();
    const [showPassword,setShowPassword] = useState(false);
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
                <Center width="full" px="15px" pt="15px">
                    <Image alt={"App Logo"} size="md" source={require("../../../assets/icon.png")} />
                    <CText variant="heading">Sign Up</CText>
                    <CText variant="body2" textAlign={"center"} mb="5px"  px="20px" color="gray.500">Join our community of buyers and sellers today! Register now to start shopping and selling with Cozeller – it's quick and easy.</CText>
                    <CText mb="18px">Already have an account ? <CText onPress={() => navigation.navigate(routes.login as never)} fontWeight="bold" color={APP_COLOR_LIGHT}>Login</CText></CText> 
                    <CustomInput onChangeText={(val) => setFormValue(val,"first_name")} prefix={<AntDesign color="gray" name="user" size={16} />} value={formState.first_name} labelText="First Name" my="8px" placeholder="Enter First Name" />
                    <CustomInput onChangeText={(val) => setFormValue(val,"last_name")} prefix={<AntDesign color="gray" name="user" size={16} />} value={formState.last_name} labelText="Last Name" my="8px" placeholder="Enter Last Name" />
                    <CustomInput onChangeText={(val) => setFormValue(val,"email")} prefix={<AntDesign color="gray" name="mail" size={16} />} keyboardType="email-address" value={formState.email} labelText="Email Address" my="8px" placeholder="Enter Email Address" />
                    <CustomInput  
                        onChangeText={(val) => setFormValue(val,"phone_number")}
                        prefix={<SelectTelephoneCode setValue={(val) => setFormValue(val,"telephone_code")} value={formState.telephone_code} />}
                        keyboardType="phone-pad" value={formState.phone_number} labelText="Phone Number" my="8px" placeholder="eg. 7067532057" 
                    />
                    <CustomSelect />
                    <CustomInput onChangeText={(val) => setFormValue(val,"password")} prefix={<AntDesign color="gray" name="lock" size={16} />} secureTextEntry={!showPassword} value={formState.password} labelText="Password" my="8px" placeholder="Enter a password" />
                    <CustomInput onChangeText={(val) => setFormValue(val,"confirm_password")} prefix={<AntDesign color="gray" name="lock" size={16} />} secureTextEntry={!showPassword} value={formState.confirm_password} labelText="Confirm Password" my="8px" placeholder="Confirm Password" />

                    <Box width={"full"} mt="30px">
                        <AppBtn toUppercase={true} gradient={true}>
                            Register
                        </AppBtn>
                    </Box>
                    
                </Center>
               
            </ScrollView>
        </SafeAreaView>
    )
}