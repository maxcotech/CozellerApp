import { Box, HStack, VStack } from "native-base";
import { APP_COLOR_LIGHTER } from "../../../../../config/constants.config";
import { OrderProductItem } from "../../../../../config/data_types/order.types";
import CText from "../../../../../../components/CText";
import Money from "../../../../../../components/Money";
import { Image } from "native-base";




export default function OrderProductItemComp({data}:{data:OrderProductItem}){
    return (
        <HStack rounded="md"  bgColor={APP_COLOR_LIGHTER} overflow={"hidden"} >
                <Box height="full" width="2/5">
                    <Image width="120px" height="120px"  source={{uri: data?.product?.product_image}} />
                    
                </Box>
                <VStack p="5px" flex={1} >
                    <CText numberOfLines={1} fontWeight={"bold"}>{data?.product?.product_name}</CText>
                    {
                        (data?.product?.product_sku)?
                        <CText variant="body4" numberOfLines={3} color={"gray.400"}>SKU: <CText color="black">{data.product?.product_sku}</CText></CText>:<></>
                    } 
                   
                     {
                        (data?.product?.current_price)?
                        <CText variant="body4" color={"gray.400"}>CURRENT PRICE: <Money variant="body3" color="black">{data?.product?.current_price}</Money></CText>:<></>
                    } 
                     {
                        (data?.paid_amount)?
                        <CText variant="body4" color={"gray.400"}>PAID AMOUNT: <Money variant="body3" color="black">{data?.paid_amount}</Money></CText>:<></>
                    } 
                    {
                        (data.quantity)?
                        <CText variant="body4" color={"gray.400"}>QUANTITY: <CText variant="body3" color="black">{data.quantity}</CText></CText>:<></>
                    } 
                    
                   
                   
                </VStack>
                
            </HStack>
    )
}