import React from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, TouchableOpacityProps, ColorValue } from 'react-native';
import { APP_COLOR, SECONDARY_COLOR } from "../src/config/constants.config";
import { ColorType } from "native-base/lib/typescript/components/types";
import CText from "./CText";
import { CircularProgress, Spinner } from "native-base";



export interface AppBtnProps extends TouchableOpacityProps {
   textVariant?: "heading" | "subheading" | "body1" | "body2" | "body3" | "body4",
   isLoading?: boolean,
   toUppercase?: boolean,
   gradient?: boolean,
   colors?: string[],
   borderRadius?: number,
   block?: boolean,
   paddingX?: number,
   paddingY?: number,
   elevation?: number,
   backgroundColor? : ColorValue | string,
   textColor? : ColorType | string
}


export default function AppBtn({
    children, elevation = 0, toUppercase = true , textVariant = "body3",
    isLoading = false, backgroundColor = APP_COLOR, paddingX = 16, paddingY = 11, textColor = "white",
    block = true, borderRadius = 20, gradient = false, colors = [APP_COLOR, "#007971"], ...props}: AppBtnProps){
    const buttonShapeStyle = { elevation,shadowOffset:{height:0,width: 0},shadowOpacity:0.1,shadowRadius:0,  borderRadius, alignSelf:(block)? "stretch":"auto", paddingHorizontal: paddingX, paddingVertical: paddingY}
    return (gradient)? (
        
            <TouchableOpacity disabled={isLoading} style={[{opacity: (isLoading)? 0.6 : 1}]} {...props}>
                <LinearGradient  style={[buttonShapeStyle]} colors={colors}>
                    {
                        (isLoading)?
                        <Spinner size="sm" color={textColor} /> :
                        <CText  alignItems={"center"} variant={textVariant} style={{textTransform:(toUppercase)? "uppercase":"none"}} textAlign="center" fontWeight={"bold"} color={textColor}>{children}</CText>

                    }
                </LinearGradient>
            </TouchableOpacity>
    ) : (
            <TouchableOpacity disabled={isLoading} style={[buttonShapeStyle,{backgroundColor,opacity: (isLoading)? 0.6 : 1}]} {...props}>
                {(isLoading)?
                    <Spinner size="sm" color={textColor} /> :
                    <CText variant={textVariant} style={{textTransform:(toUppercase)? "uppercase":"none"}} alignItems={"center"} textAlign="center" fontWeight={"bold"} color={textColor}>{children}</CText>
                }
            </TouchableOpacity>
    )
}