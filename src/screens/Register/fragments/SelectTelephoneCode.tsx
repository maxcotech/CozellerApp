import { Actionsheet, Box, HStack, Image, Spinner } from "native-base";
import React, { useState,useMemo,useEffect } from "react";
import { TouchableOpacity } from 'react-native';
import CText from "../../../../components/CText";
import { Feather } from "@expo/vector-icons";
import { useCountries } from "../../../api/queries/country.queries";
import { APP_COLOR_LIGHT } from './../../../config/constants.config';

export default function SelectTelephoneCode({value,setValue}: {value: any, setValue: (val: any) => void}){
    const [optionsVisible,setOptionsVisible] = useState(false);
    const {isLoading,data} = useCountries({});
    const selectedCountry = useMemo(() => {
        if(value && data?.data?.length > 0){
            return data.data.find((country) => country.country_tel_code === value);
        }
        return undefined;
    },[value])

    const onSelectOption = (val: string) => {
        setValue(val);
        setOptionsVisible(false);
    }

    return (
        <>
             <TouchableOpacity onPress={() => setOptionsVisible(!optionsVisible)}>
                {
                    (isLoading)? <Spinner color={APP_COLOR_LIGHT} /> : 
                    <HStack space={3} pr="5px" mr="5px" borderRightColor={"gray.200"}  borderRightWidth={"1px"}>
                        <Box>{(value && selectedCountry)? <HStack space={2} alignItems={"center"}>
                            <Image alt={selectedCountry.country_name} height={"16px"} width="25px"  source={{uri: selectedCountry.country_logo}} />
                            <CText variant="body2">{selectedCountry.country_tel_code}</CText>
                        </HStack>: <CText color="gray.400" variant="body2">Eg. +234</CText>}</Box>
                        <Feather size={20} name="chevron-down" color="gray" />
                    </HStack>
                }
            </TouchableOpacity>
            <Actionsheet isOpen={optionsVisible} onClose={() => setOptionsVisible(false)}>
                <Actionsheet.Content>
                {
                    (data && data?.data?.length > 0)?
                    <>
                        {
                            data.data.map((item) => <Actionsheet.Item onPress={() => onSelectOption(item.country_tel_code)} key={item.id} >
                                <HStack space={2}>
                                    <Image alt={item.country_name} height={"20px"} width="30px" source={{uri: item.country_logo}} />
                                    <CText>{item.country_name} ({item.country_tel_code})</CText>
                                </HStack>
                            </Actionsheet.Item>)
                        }
                    </>:<></>
                }
                </Actionsheet.Content>
            </Actionsheet>
        </>
    )
}