import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Actionsheet, HStack } from "native-base";
import { useEffect } from "react";
import CText from "../../../../components/CText";
import { AccountGroups } from "../../../config/enum.config";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../config/routes.config";
import { isIos } from "../../../helpers/platform.helpers";
import { ActionSheetIOS } from "react-native";

export interface SelectGroupProps {
    onClose: () => void,
    isOpen: boolean,
    onValueChange?: (val: AccountGroups) => void
}

export default function SelectAccountGroup({ onClose, isOpen, onValueChange }: SelectGroupProps) {
    const navigation = useNavigation<AppNavProps>();
    const onSelect = (val: AccountGroups) => {
        if (onValueChange) onValueChange(val);
        else {
            onClose();
            navigation.navigate(routes.register, { accountGroup: val })
        }
    }
    useEffect(() => {
        if (isOpen && isIos()) {
            ActionSheetIOS.showActionSheetWithOptions({
                options: ["Join as a customer", "Join as a vendor", "Cancel"],
                cancelButtonIndex: 2
            },
                (btnIndex) => {
                    switch (btnIndex) {
                        case 0: {
                            onSelect(AccountGroups.Buyers);
                        }; break;
                        case 1: {
                            onSelect(AccountGroups.Sellers);
                        }; break;
                        case 2: {
                            onClose();
                        }
                    }
                }
            )
        }

    }, [isOpen])
    if (isIos()) return <></>
    return (
        <Actionsheet onClose={onClose} isOpen={isOpen}>

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