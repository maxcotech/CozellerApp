import { Box, HStack, VStack } from "native-base";
import { XPADDING } from "../src/config/constants.config";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AppNavProps } from "../src/config/routes.config";
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import CText from "./CText";
import { TouchableOpacity } from "react-native";
import { ColorType } from "native-base/lib/typescript/components/types";

export interface AppBarProps {
    title: string,
    subtitle?: string,
    left?: React.ReactNode,
    right?: React.ReactNode,
    backgroundColor?: string | ColorType,
    shadow?: number
}

export default function AppBar({title,subtitle,left,right,backgroundColor = "white",shadow = 3}: AppBarProps){
    const navigation = useNavigation<AppNavProps>();
    return (
        <HStack backgroundColor={backgroundColor} width="full" shadow={shadow} alignItems="center" py="10px" px={XPADDING} >
            <Box   alignItems={"flex-start"}>{
                (left)? left :
                ((navigation.canGoBack())? <TouchableOpacity onPress={() => navigation.goBack()}> 
                        <AntDesign style={{margin:-4}} size={20} name="left" />
                    </TouchableOpacity>:<></>)
            }</Box>
            <Box flex={1}>
                <VStack alignSelf={"center"}>
                    <CText textAlign={"center"} numberOfLines={1} variant="subheading">{title}</CText>
                    {
                        (subtitle)? <CText numberOfLines={2} mt="-5px" textAlign="center" color="gray.400" variant="body2">{subtitle}</CText>:<></>
                    }
                </VStack>
            </Box>
            
                {right}
            
        </HStack>
    )
}