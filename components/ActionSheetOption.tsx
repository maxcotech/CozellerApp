import { Actionsheet, HStack, Icon } from "native-base"
import CText from "./CText"
import { AntDesign } from "@expo/vector-icons"

export interface ActionSheetOptionProps {
    title: string,
    onPress: () => void,
    icon?: any,
    dangerMode?: boolean,
    isLoading?: boolean
}

export default function ActionSheetOption({onPress,title,icon,dangerMode, isLoading}: ActionSheetOptionProps){
    return (
        <Actionsheet.Item isLoading={isLoading} borderBottomColor={"gray.100"} borderBottomWidth={1} onPress={onPress} >
            <HStack width="full" my="5px"  alignItems="center" justifyContent={"space-between"}>
                <HStack alignItems="center" space={2}>
                    {
                        (icon)? <Icon color={(dangerMode)? "danger.400": undefined} size="md" as={icon} />:<></>
                    }
                    <CText color={(dangerMode)? "danger.400": undefined}>{title}</CText>
                </HStack>
                <Icon color={(dangerMode)? "danger.400": undefined} marginLeft={"auto"} size="md" as={<AntDesign name="arrowright" />} />
            </HStack>
        </Actionsheet.Item>
    )
}