import { Actionsheet, Box, HStack, Image, VStack, View } from "native-base";
import { Category } from "../../../../config/data_types/category_types";
import { APP_COLOR_LIGHTER } from "../../../../config/constants.config";
import { AntDesign } from "@expo/vector-icons";
import CText from "../../../../../components/CText";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { SelectOptions } from "../CategoryOptions";


export interface CategoryOptionsProps {
    data: Category,
    onPress: (option: SelectOptions) => void
}

export default function CategoryOption({ data, onPress }: CategoryOptionsProps) {
    const [showOptions, setShowOptions] = useState(false);
    const onSelect = (action: SelectOptions) => {
        setShowOptions(false);
        onPress(action);

    }
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
            <Actionsheet isOpen={showOptions} onClose={() => setShowOptions(false)}>
                <Actionsheet.Content>
                    <CText>Options For {data.category_title}</CText>
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
        </>
    )
}