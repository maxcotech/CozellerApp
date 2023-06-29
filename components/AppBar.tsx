import { Box, HStack, VStack } from "native-base";
import { XPADDING } from "../src/config/constants.config";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AppNavProps } from "../src/config/routes.config";
import { MaterialIcons } from "@expo/vector-icons";
import CText from "./CText";
import { TouchableOpacity } from "react-native";
import { ColorType } from "native-base/lib/typescript/components/types";

export interface AppBarProps {
    title: string,
    subtitle?: string,
    left?: React.ReactNode,
    right?: React.ReactNode,
    backgroundColor?: string | ColorType,
    shadow?: number,
    centered?: boolean,
    textColor?: string,
    subTextColor?: string
}

export default function AppBar({ title, subtitle, left, right, textColor, subTextColor = "gray.400", centered = false, backgroundColor = "white", shadow = 3 }: AppBarProps) {
    const navigation = useNavigation<AppNavProps>();
    return (
        <HStack backgroundColor={backgroundColor} width="full" space={1} shadow={shadow} alignItems="center" py="12px" px={XPADDING} >
            <Box alignItems={"flex-start"}>{
                (left) ? left :
                    ((navigation.canGoBack()) ? <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons color={textColor} style={{ marginLeft: -10 }} size={30} name="keyboard-arrow-left" />
                    </TouchableOpacity> : <></>)
            }</Box>
            <Box flex={1}>
                <VStack alignSelf={(centered) ? "center" : "flex-start"}>
                    <CText color={textColor} numberOfLines={1} variant="body1" mb="2px" fontWeight={"bold"}>{title}</CText>
                    {
                        (subtitle) ? <CText color={subTextColor ?? textColor} numberOfLines={2} mt="-5px" variant="body2">{subtitle}</CText> : <></>
                    }
                </VStack>
            </Box>

            {right}

        </HStack>
    )
}