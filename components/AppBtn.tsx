import React from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, TouchableOpacityProps, ColorValue } from 'react-native';
import { APP_COLOR, SECONDARY_COLOR } from "../src/config/constants.config";
import { ColorType } from "native-base/lib/typescript/components/types";
import CText from "./CText";



export interface AppBtnProps extends TouchableOpacityProps {
   isLoading?: boolean,
   gradient?: boolean,
   colors?: string[],
   borderRadius?: number,
   block?: boolean,
   paddingX?: number,
   paddingY?: number,
   backgroundColor? : ColorValue | string,
   textColor? : ColorType | string
}


export default function AppBtn({
    children,
    isLoading = false, backgroundColor = APP_COLOR, paddingX = 16, paddingY = 10, textColor = "white",
    block = true, borderRadius = 20, gradient = false, colors = [APP_COLOR, SECONDARY_COLOR], ...props}: AppBtnProps){
    const buttonShapeStyle = {  borderRadius, alignSelf:(block)? "stretch":"auto", paddingHorizontal: paddingX, paddingVertical: paddingY}
    return (gradient)? (
        
            <TouchableOpacity style={[buttonShapeStyle]} {...props}>
                <LinearGradient style={{flex:1}} colors={colors}>
                    <CText textAlign="center" fontWeight={"bold"} color={textColor}>{children}</CText>
                </LinearGradient>
            </TouchableOpacity>
    ) : (
            <TouchableOpacity style={[buttonShapeStyle,{backgroundColor}]} {...props}>
                <CText textAlign="center" fontWeight={"bold"} color={textColor}>{children}</CText>
            </TouchableOpacity>
    )
}