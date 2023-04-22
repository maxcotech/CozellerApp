import { TextInput, TextInputProps, NativeSyntheticEvent, TextInputFocusEventData} from "react-native";
import React, {useState} from "react";
import { Actionsheet, Center, HStack, Pressable, View } from "native-base";
import { APP_COLOR } from "../src/config/constants.config";
import CText from "./CText";


export interface CustomInputProps extends TextInputProps {
    prefix?: React.ReactNode,
    suffix?: React.ReactNode,
    px?: any, py?: any,
    mx?: any, my?: any,
    borderRadius?: any,
    backgroundColor?: any,
    labelText?: string,
    label?: React.ReactNode,
    width?: any,
    height?: any,
    onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void,
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
}


export default function CustomSelect({ 
    labelText,label,
    onFocus, onBlur, backgroundColor = "#F5F5F5", width = "full", height, prefix,suffix,borderRadius = "8px", px = "15px", py = "10px", mx="0px", my="0px",...props}: CustomInputProps){
    const [focused,setFocused] = useState(false);
    const [optionsVisible,setOptionsVisible] = useState(false);
    const handleOnFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(true);
        if(onFocus) onFocus(e);
    }

    const handleOnBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(false);
        if(onBlur) onBlur(e);
    }

    return (
        <> 
           <Pressable onPress={() => setOptionsVisible(!optionsVisible)}>
                <View mx={mx} my={my} width="full">
                    {
                        (label)? label : ((labelText)? <CText width="full"  mb="3px" variant="body2" color="gray.500">{labelText}</CText>:<></>)
                    }
                    <HStack  style={(focused)? {
                        borderColor: APP_COLOR,
                        borderWidth: 1,
                        borderStyle: "solid"
                    }:undefined} py={py} px={px}  borderRadius={borderRadius} backgroundColor={backgroundColor} height={height} width={width} space={1}>
                        { (!!prefix)? <Center>{prefix}</Center>:<></>}
                        <TextInput editable={false}  {...props} onBlur={handleOnBlur} onFocus={handleOnFocus} style={{ flex:1}}  />
                        { (!!suffix)? <Center>{suffix}</Center>:<></>}
                    </HStack>
                </View>
            </Pressable>
            <Actionsheet>

            </Actionsheet>
        </>
    )
}