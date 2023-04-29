import { Actionsheet, Box, HStack, Image, VStack } from "native-base";
import { ProductSummary } from "../../../../../config/data_types/product_types";
import CText from "../../../../../../components/CText";
import { APP_COLOR, APP_COLOR_LIGHTER } from "../../../../../config/constants.config";
import Money from "../../../../../../components/Money";
import ResourceStatusTag from "../../../../../../components/ResourceStatusTag";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";

export interface ProductListItemProps {
    data: ProductSummary
}

export default function ProductListItem({data}:ProductListItemProps){
    const [optionsVisible,setOptionsVisible] = useState(false);
    return (
        <>
        <TouchableOpacity onPress={() => setOptionsVisible(true)}>
            <HStack rounded="md"  bgColor={APP_COLOR_LIGHTER} overflow={"hidden"} >
                <Box height="full" width="2/5">
                    <Image width="120px" height="120px"  source={{uri: data.product_image}} />
                    <Box bgColor={(data.amount_in_stock <= 3)? "danger.600":APP_COLOR} borderTopRightRadius={"lg"} borderBottomRightRadius={"lg"} px={"10px"} py="2px" position={"absolute"} top="5px">
                        <CText color="white" variant={"body4"}>{data.amount_in_stock} in stock</CText>
                    </Box>
                </Box>
                <VStack p="5px" flex={1} >
                    <CText numberOfLines={1} fontWeight={"bold"}>{data.product_name}</CText>
                    {
                        (data.product_sku)?
                        <CText variant="body4" numberOfLines={3} color={"gray.400"}>SKU: <CText color="black">{data.product_sku}</CText></CText>:<></>
                    } 
                    {
                        (data.regular_price)?
                        <CText variant="body4" color={"gray.400"}>REGULAR PRICE: <Money variant="body3" color="black">{data.regular_price}</Money></CText>:<></>
                    }
                     {
                        (data.sales_price)?
                        <CText variant="body4" color={"gray.400"}>SALES PRICE: <Money variant="body3" color="black">{data.sales_price}</Money></CText>:<></>
                    } 
                    {
                        (data.amount_in_stock)?
                        <CText variant="body4" color={"gray.400"}>STOCK QUANTITY: <CText variant="body3" color="black">{data.amount_in_stock}</CText></CText>:<></>
                    } 
                    
                    <CText mt="5px">
                        <ResourceStatusTag status={data.product_status} />
                    </CText>
                   
                </VStack>
                
            </HStack>
            </TouchableOpacity>
            <Actionsheet onClose={() => setOptionsVisible(false)} isOpen={optionsVisible}>
                <Actionsheet.Content>
                    <CText numberOfLines={1} variant="body1">Manage {data.product_name}</CText>
                    <Actionsheet.Item alignSelf="stretch">
                        <HStack py="5px" borderBottomColor={"gray.200"} width="full" alignItems="center" justifyContent={"space-between"}>
                            <HStack space={4}>
                                <AntDesign name="edit" size={20} />
                                <CText>Edit Product</CText>
                            </HStack>
                            <Box ml="auto">
                                <MaterialIcons size={20} name="arrow-forward" />
                            </Box>
                        </HStack>
                    </Actionsheet.Item>
                    <Actionsheet.Item alignSelf="stretch">
                        <HStack py="5px" borderBottomColor={"gray.200"} width="full" alignItems="center" justifyContent={"space-between"}>
                            <HStack space={4}>
                                <AntDesign name="delete" color="red" size={20} />
                                <CText color="red.500">Delete Product</CText>
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