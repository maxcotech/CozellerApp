import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Actionsheet, HStack } from "native-base";
import { useState } from "react";
import CText from "../../../../components/CText";
import { AccountGroups } from "../../../config/enum.config";
import { useNavigation } from "@react-navigation/native";
import routes from "../../../config/routes.config";

export interface SelectGroupProps {
    onClose: () => void,
    isOpen: boolean,
    onValueChange?: (val: AccountGroups ) => void
}

export default function SelectAccountGroup({onClose,isOpen, onValueChange}: SelectGroupProps){
    const navigation = useNavigation();
    const onSelect = (val: AccountGroups) => {
        if(onValueChange) onValueChange(val);
        else {
            onClose();
            navigation.navigate(routes.register as never,{accountGroup: val} as never)
        }
    }
    return (
        <Actionsheet  onClose={onClose} isOpen={isOpen}>

            <Actionsheet.Content>
                <Actionsheet.Item onPress={() => onSelect(AccountGroups.Buyers)}>
                    <HStack space={2} alignItems={"center"}>
                        <AntDesign name="shoppingcart" size={25} />
                        <CText variant="body1">Join as a customer</CText>
                    </HStack>
                </Actionsheet.Item>
                <Actionsheet.Item onPress={() => onSelect(AccountGroups.Sellers)}>
                    <HStack space={2} alignItems={"center"}>
                        <MaterialCommunityIcons name="store" size={25} />
                        <CText variant="body1">Join as a vendor</CText>
                    </HStack>
                </Actionsheet.Item>
            </Actionsheet.Content>
        </Actionsheet>
    )
}