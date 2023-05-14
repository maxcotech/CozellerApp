import { TextInput, TextInputProps, NativeSyntheticEvent, TextInputFocusEventData} from "react-native";
import React, {useState, useMemo, useEffect, ReactNode} from "react";
import { Actionsheet, Box, Center, FlatList, HStack, Pressable, ScrollView, Spinner, View } from "native-base";
import { APP_COLOR } from "../src/config/constants.config";
import CText from "./CText";
import { Feather, Ionicons } from "@expo/vector-icons";
import CustomInput from "./CustomInput";

export interface CustomInputProps<T> extends TextInputProps {
    searchPlaceholder?: string,
    includeSearch?: boolean,
    value?: any, error?: string | string[],
    isLoading?: boolean,
    titleKey? : keyof T,
    valueKey? : keyof T,
    options: T[],
    prefix?: React.ReactNode,
    suffix?: React.ReactNode,
    px?: any, py?: any,
    mx?: any, my?: any,
    borderRadius?: any,
    backgroundColor?: any,
    labelText?: string,
    label?: React.ReactNode,
    onValueChange: (val: any, iloader: (val: boolean) => void) => void,
    width?: any,
    height?: any,
    onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void,
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void,
    renderItem?: (item: T, index: number) => JSX.Element
}


export default function CustomSelect<T>({ 
    renderItem,
    error,isLoading = false, includeSearch = false,searchPlaceholder = "Search Items",
    labelText,label,options, value, onValueChange, titleKey = "title" as keyof T, valueKey = "value" as keyof T,
    onFocus, onBlur, backgroundColor = "#F5F5F5", width = "full", height, prefix,suffix,borderRadius = "8px", px = "15px", py = "10px", mx="0px", my="0px",...props}: CustomInputProps<T>){
    const [focused,setFocused] = useState(false);
    const [optionsCopy,setOptionsCopy] = useState([...options]);
    const [search,setSearch] = useState("");
    const [loading,setLoading] = useState(false);
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
        return options?.find((item) => item[valueKey] == value)
    },[value])

    const onSearchChange = (newQuery = "") => {
        setSearch(newQuery);
        if(newQuery){
            const newOptions = options.filter((item) => item[titleKey]?.includes(newQuery));
            setOptionsCopy(newOptions);
        } else {
            setOptionsCopy([...options]);
        }
    }

    const onCloseSearch = () => {
        setSearch("");
        setOptionsCopy([...options]);
    }

    useEffect(() => {
        setOptionsCopy([...options]);
    },[JSON.stringify(options)])


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
                        <TextInput editable={false} value={(selectedValue)? selectedValue[titleKey] ?? "" : ""}  {...props} onBlur={handleOnBlur} onFocus={handleOnFocus}  style={{ flex:1,color:"black"}}  />
                        { (loading || isLoading)? <Spinner size="sm" color={APP_COLOR} /> : ((!!suffix)? <Center>{suffix}</Center>:<Center><Feather size={20} name="chevron-down" color="gray" /></Center>)}
                    </HStack>
                    {
                        (error && ((Array.isArray(error)? error.length > 0 : !!error )))? <CText color="red.400" variant="body4">{(Array.isArray(error))? error.join("\n") : error}</CText> :<></>
                    }
                </View>
            </Pressable>
            <Actionsheet removeClippedSubviews={true} onClose={onClose}  isOpen={optionsVisible}>
                
        
                <Actionsheet.Content maxHeight={"full"}>
                      {
                        (includeSearch)?
                        <Box px="10px" alignSelf={"stretch"} width="full">
                            <CustomInput autoFocus={true} backgroundColor={"gray.200"} borderRadius={30} suffix={(search?.length > 0)? <Ionicons onPress={onCloseSearch} size={20} name="close" />:<></>} onChangeText={onSearchChange} value={search}  prefix={<Ionicons color="gray" size={20} name="search" />} placeholder={searchPlaceholder} />
                        </Box>:<></>
                      }
                        
                    
                {
                    <FlatList width={"full"} renderItem={({item,index}) => (
                        <Actionsheet.Item key={item[valueKey]+"/"+index} onPress={() => {onValueChange(item[valueKey],setLoading); onClose();}}>
                            {
                                (!!renderItem)? renderItem(item,index):<CText>{ item[titleKey] as ReactNode}</CText>
                            }
                            
                        </Actionsheet.Item>
                    )} data={optionsCopy} />

                }
                </Actionsheet.Content>
                
            </Actionsheet>
        </>
    )
}