import { TextInput, TextInputProps, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";
import React, { LegacyRef, useState } from "react";
import { Center, HStack, Spinner, View } from "native-base";
import { APP_COLOR } from "../src/config/constants.config";
import CText from "./CText";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { debounced } from "../src/helpers/value.helpers";


export interface CustomInputProps extends TextInputProps {
    ref?: React.LegacyRef<TextInput>,
    prefix?: React.ReactNode,
    suffix?: React.ReactNode,
    error?: string | string[],
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

export interface CustomSearchProps extends CustomInputProps {
    isLoading?: boolean
}


export const CustomPasswordInput = (props: CustomInputProps) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    return <CustomInput
        {...props} blurOnSubmit={false} secureTextEntry={!passwordVisible}
        suffix={<MaterialIcons onPress={() => setPasswordVisible(!passwordVisible)} color="gray" size={20} name={(passwordVisible) ? "visibility-off" : "visibility"} />}
    />
}

export const UncontrolledCustomTextInput = ({
    borderRadius = "8px", px = "15px", py = "10px", mx = "0px", my = "0px",
    label, labelText, onFocus, onBlur, backgroundColor = "gray.200", height, width = "full", error, prefix, suffix, placeholder, ref, ...props }: CustomInputProps) => {
    const [focused, setFocused] = useState(false);
    const handleOnFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(true);
        if (onFocus) onFocus(e);
    }

    const handleOnBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(false);
        if (onBlur) onBlur(e);
    }
    return (
        <View mx={mx} my={my} width="full">
            {
                (label) ? label : ((labelText) ? <CText width="full" mb="3px" variant="body2" color="gray.500">{labelText}</CText> : <></>)
            }
            <HStack style={(focused) ? {
                borderColor: APP_COLOR,
                borderWidth: 1,
                borderStyle: "solid"
            } : undefined} py={py} px={px} borderRadius={borderRadius} backgroundColor={backgroundColor} height={height} width={width} space={1}>
                {(!!prefix) ? <Center>{prefix}</Center> : <></>}
                <TextInput onChangeText={props.onChangeText} ref={ref} placeholder={placeholder} onBlur={handleOnBlur} onFocus={handleOnFocus} style={{ flex: 1 }} />
                {(!!suffix) ? <Center>{suffix}</Center> : <></>}
            </HStack>
            {
                (error && ((Array.isArray(error) ? error.length > 0 : !!error))) ? <CText color="red.400" variant="body4">{(Array.isArray(error)) ? error.join("\n") : error}</CText> : <></>
            }
        </View>
    )
}

export const CustomSearchInput2 = ({ prefix, isLoading, ...props }: CustomSearchProps) => {
    const onCancel = () => {
        if (props.onChangeText) {
            props.onChangeText("");
        }
    }
    return <CustomInput
        {...props}
        borderRadius={props.borderRadius ?? 30}
        prefix={prefix ?? <AntDesign color="gray" size={20} name="search1" />}
        onChangeText={(val) => props.onChangeText(val)}
        suffix={(isLoading) ? <Spinner color={APP_COLOR} /> : ((props.suffix) ? props.suffix : (props.value?.length > 0) ? <AntDesign onPress={onCancel} size={20} name="close" /> : <></>)}

    />
}

export const CustomSearchInput = ({ prefix, isLoading, ...props }: CustomSearchProps) => {
    let inputRef: TextInput;
    const onCancel = () => {
        if (inputRef) {
            inputRef.clear();
            props.onChangeText("");
        }

    }

    return <UncontrolledCustomTextInput
        {...props}
        borderRadius={props.borderRadius ?? 30}
        ref={(input) => inputRef = input}
        prefix={prefix ?? <AntDesign color="gray" size={20} name="search1" />}
        onChangeText={(val) => debounced(val, props.onChangeText)}
        suffix={(isLoading) ? <Spinner color={APP_COLOR} /> : ((props.suffix) ? props.suffix : (props.value?.length > 0) ? <AntDesign onPress={onCancel} size={20} name="close" /> : <></>)}
    />
}

export default function CustomInput({
    labelText, label, error, ref,
    onFocus, onBlur, backgroundColor = "#F5F5F5", width = "full", height, prefix, suffix, borderRadius = "8px", px = "15px", py = "10px", mx = "0px", my = 0, ...props }: CustomInputProps) {
    const [focused, setFocused] = useState(false);
    const handleOnFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(true);
        if (onFocus) onFocus(e);
    }

    const handleOnBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(false);
        if (onBlur) onBlur(e);
    }

    return (
        <View mx={mx} my={my} width="full">
            {
                (label) ? label : ((labelText) ? <CText width="full" mb="3px" variant="body2" color="gray.500">{labelText}</CText> : <></>)
            }
            <HStack style={(focused) ? {
                borderColor: APP_COLOR,
                borderWidth: 1,
                borderStyle: "solid"
            } : undefined} py={py} px={px} borderRadius={borderRadius} backgroundColor={backgroundColor} height={height} width={width} space={1}>
                {(!!prefix) ? <Center>{prefix}</Center> : <></>}
                <TextInput ref={ref}  {...props} onBlur={handleOnBlur} onFocus={handleOnFocus} style={{ flex: 1 }} />
                {(!!suffix) ? <Center>{suffix}</Center> : <></>}
            </HStack>
            {
                (error && ((Array.isArray(error) ? error.length > 0 : !!error))) ? <CText color="red.400" variant="body4">{(Array.isArray(error)) ? error.join("\n") : error}</CText> : <></>
            }
        </View>

    )
}