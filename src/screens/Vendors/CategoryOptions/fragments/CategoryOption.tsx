import { Actionsheet, Box, HStack, Image, VStack, View } from "native-base";
import { Category } from "../../../../config/data_types/category_types";
import { APP_COLOR_LIGHTER } from "../../../../config/constants.config";
import { AntDesign } from "@expo/vector-icons";
import CText from "../../../../../components/CText";
import { ActionSheetIOS, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { SelectOptions } from "../CategoryOptions";
import { isIos } from "../../../../helpers/platform.helpers";


export interface CategoryOptionsProps {
    data: Category,
    onPress: (option: SelectOptions) => void
}

export default function CategoryOption({ data, onPress }: CategoryOptionsProps) {
    const [showOptions, setShowOptions] = useState(false);
    const title = `Options For ${data.category_title}`;
    const onSelect = (action: SelectOptions) => {
        setShowOptions(false);
        onPress(action);
    }

    useEffect(() => {
        if (showOptions && isIos()) {
            ActionSheetIOS.showActionSheetWithOptions({
                options: ['Select Category', 'Browse Sub-categories', 'Cancel'],
                cancelButtonIndex: 2,
                title
            }, (btnIndex: number) => {
                switch (btnIndex) {
                    case 0: return onSelect(SelectOptions.selectCategory);
                    case 1: return onSelect(SelectOptions.browseSubCategories);
                    default: return setShowOptions(false);
                }
            })
        }
    }, [showOptions])

    return (
        <>
            <TouchableOpacity onPress={() => setShowOptions(true)}>
                <HStack space={2} alignItems="center">
                    <Box backgroundColor={APP_COLOR_LIGHTER} borderRadius="lg" alignItems={"center"} justifyContent={"center"} p="10px">
                        <Image alt={data.category_title} height="50px" width="50px" source={{ uri: data.category_icon }} />
                    </Box>
                    <VStack flex={1}>
                        <CText numberOfLines={1}>{data.category_title}</CText>
                        <CText variant="body3" color="gray.400">{data.display_title}</CText>
                    </VStack>
                    <AntDesign name="arrowright" size={20} />
                </HStack>
            </TouchableOpacity>
            {
                (isIos()) ? <></> :
                    <Actionsheet isOpen={showOptions} onClose={() => setShowOptions(false)}>
                        <Actionsheet.Content>
                            <CText>{title}</CText>
                            <Actionsheet.Item onPress={() => onSelect(SelectOptions.selectCategory)}>
                                <HStack width="full">
                                    <CText>Select Category</CText>
                                    <Box ml="auto">
                                        <AntDesign name="arrowright" size={20} />
                                    </Box>
                                </HStack>
                            </Actionsheet.Item>
                            <Actionsheet.Item onPress={() => onSelect(SelectOptions.browseSubCategories)}>
                                <HStack width="full">
                                    <CText>Browse Sub-categories</CText>
                                    <Box ml="auto">
                                        <AntDesign name="arrowright" size={20} />
                                    </Box>
                                </HStack>
                            </Actionsheet.Item>
                        </Actionsheet.Content>
                    </Actionsheet>
            }

        </>
    )
}