import { useState } from "react";
import { APP_COLOR, APP_COLOR_LIGHTER } from "../../../../../../config/constants.config";
import { TouchableOpacity } from "react-native";
import { Actionsheet, Box, HStack, VStack } from "native-base";
import { Image } from "native-base";
import CText from "../../../../../../../components/CText";
import Money from "../../../../../../../components/Money";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { ProductVariationForm } from "../../../../../../config/data_types/product_types";
import { VariationManagementOptions } from "./ProductVariations";

export interface VariationItemProps {
    data: ProductVariationForm,
    onSelect: (val: VariationManagementOptions) => void
}

export default function VariationItem({ data, onSelect }: VariationItemProps) {
    const [optionsVisible, setOptionsVisible] = useState(false);
    return (
        <>
            <TouchableOpacity onPress={() => setOptionsVisible(true)}>
                <HStack rounded="md" my="10px" bgColor={APP_COLOR_LIGHTER} overflow={"hidden"} >
                    <Box height="full" width="2/5">
                        <Image alt={data.variation_name ?? "Variation Options"} width="120px" height="120px" source={{ uri: data.variation_image }} />
                        <Box bgColor={(data.amount_in_stock <= 3) ? "danger.600" : APP_COLOR} borderTopRightRadius={"lg"} borderBottomRightRadius={"lg"} px={"10px"} py="2px" position={"absolute"} top="5px">
                            <CText color="white" variant={"body4"}>{data.amount_in_stock} in stock</CText>
                        </Box>
                    </Box>
                    <VStack p="5px" flex={1} >
                        <CText numberOfLines={1} fontWeight={"bold"}>{data.variation_name}</CText>
                        {
                            (data.variation_sku) ?
                                <CText variant="body4" numberOfLines={3} color={"gray.400"}>SKU: <CText color="black">{data.variation_sku}</CText></CText> : <></>
                        }
                        {
                            (data.regular_price) ?
                                <CText variant="body4" color={"gray.400"}>REGULAR PRICE: <Money variant="body3" color="black">{data.regular_price}</Money></CText> : <></>
                        }
                        {
                            (data.sales_price) ?
                                <CText variant="body4" color={"gray.400"}>SALES PRICE: <Money variant="body3" color="black">{data.sales_price}</Money></CText> : <></>
                        }
                        {
                            (data.amount_in_stock) ?
                                <CText variant="body4" color={"gray.400"}>STOCK QUANTITY: <CText variant="body3" color="black">{data.amount_in_stock}</CText></CText> : <></>
                        }



                    </VStack>

                </HStack>
            </TouchableOpacity>
            <Actionsheet onClose={() => setOptionsVisible(false)} isOpen={optionsVisible}>
                <Actionsheet.Content>
                    <CText numberOfLines={1} variant="body1">Manage {data.variation_name}</CText>
                    <Actionsheet.Item onPress={() => {
                        setOptionsVisible(false);
                        onSelect(VariationManagementOptions.edit)
                    }} alignSelf="stretch">
                        <HStack py="5px" borderBottomColor={"gray.200"} width="full" alignItems="center" justifyContent={"space-between"}>
                            <HStack space={4}>
                                <AntDesign name="edit" size={20} />
                                <CText>Edit Variation</CText>
                            </HStack>
                            <Box ml="auto">
                                <MaterialIcons size={20} name="arrow-forward" />
                            </Box>
                        </HStack>
                    </Actionsheet.Item>
                    <Actionsheet.Item onPress={() => {
                        setOptionsVisible(false);
                        onSelect(VariationManagementOptions.delete)
                    }} alignSelf="stretch">
                        <HStack py="5px" borderBottomColor={"gray.200"} width="full" alignItems="center" justifyContent={"space-between"}>
                            <HStack space={4}>
                                <AntDesign name="delete" color="red" size={20} />
                                <CText color="red.500">Delete Variation</CText>
                            </HStack>
                            <Box ml="auto">
                                <MaterialIcons size={20} name="arrow-forward" />
                            </Box>
                        </HStack>
                    </Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>
        </>
    )
}