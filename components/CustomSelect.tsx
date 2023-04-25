import { TextInput, TextInputProps, NativeSyntheticEvent, TextInputFocusEventData} from "react-native";
import React, {useState, useMemo} from "react";
import { Actionsheet, Center, HStack, Pressable, View } from "native-base";
import { APP_COLOR } from "../src/config/constants.config";
import CText from "./CText";
import { Feather } from "@expo/vector-icons";

export type CustomSelectOption = {value: any, title: any}
export interface CustomInputProps extends TextInputProps {
    value?: any, error?: string | string[],
    titleKey? : string,
    valueKey? : string,
    options: CustomSelectOption[],
    prefix?: React.ReactNode,
    suffix?: React.ReactNode,
    px?: any, py?: any,
    mx?: any, my?: any,
    borderRadius?: any,
    backgroundColor?: any,
    labelText?: string,
    label?: React.ReactNode,
    onValueChange: (val: any) => void,
    width?: any,
    height?: any,
    onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void,
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
}


export default function CustomSelect({ 
    error,
    labelText,label,options, value, onValueChange, titleKey = "title", valueKey = "value",
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

    const selectedValue = useMemo(() => {
        return options?.find((item) => item.value == value)
    },[value])

    const onClose = () => setOptionsVisible(false);

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
                        <TextInput editable={false} value={selectedValue?.title ?? ""}  {...props} onBlur={handleOnBlur} onFocus={handleOnFocus}  style={{ flex:1,color:"black"}}  />
                        { (!!suffix)? <Center>{suffix}</Center>:<Center><Feather size={20} name="chevron-down" color="gray" /></Center>}
                    </HStack>
                    {
                        (error && ((Array.isArray(error)? error.length > 0 : !!error )))? <CText color="red.400" variant="body4">{(Array.isArray(error))? error.join("\n") : error}</CText> :<></>
                    }
                </View>
            </Pressable>
            <Actionsheet collapsable={true} onClose={onClose}  isOpen={optionsVisible}>
                <Actionsheet.Content>
                {
                    (options && options?.length > 0)?
                    <>
                        {
                            options.map((item) => (
                                <Actionsheet.Item key={item[valueKey]} onPress={() => {onValueChange(item[valueKey]); onClose();}}>
                                    <CText>{item[titleKey]}</CText>
                                </Actionsheet.Item>
                            ))
                        }
                    </>:<></>
                }
                </Actionsheet.Content>
            </Actionsheet>
        </>
    )
}