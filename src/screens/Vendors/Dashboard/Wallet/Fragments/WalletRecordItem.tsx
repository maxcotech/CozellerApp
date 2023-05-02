import { TouchableOpacity } from "react-native";
import { WalletRecord } from "../../../../../config/data_types/wallet_types";
import { Box, HStack, Icon, VStack } from "native-base";
import { APP_COLOR_LIGHTER } from './../../../../../config/constants.config';
import { AntDesign, Feather } from "@expo/vector-icons";
import { LedgerTypes, WalletLockStatuses } from "../../../../../config/enum.config";
import { useMemo } from "react";
import CText from "../../../../../../components/CText";
import Money from "../../../../../../components/Money";

export interface WalletRecordItemsProps {
    data: WalletRecord
}
export default function WalletRecordItem({data}:WalletRecordItemsProps){
    const ledgerColorScheme = useMemo(() => {
        if(data.ledger_type === LedgerTypes.LEDGER_CREDIT){
            return {
                backgroundColor: "success.200",
                color: "success.500"
            }
        }
        return {
            backgroundColor: "danger.200",
            color: "danger.500"
        }
    },[data.ledger_type])
    return (
        <TouchableOpacity>
            <HStack alignItems="center" space={2} py={"10px"} px="15px" my={"10px"} borderRadius={"lg"} bgColor={APP_COLOR_LIGHTER}>
                <Box backgroundColor={ledgerColorScheme.backgroundColor}  borderRadius="full" p="15px" width="50px" height="50px" alignItems="center" justifyContent="center" >
                   <Icon color={ledgerColorScheme.color} size="md"  as={<Feather name={(data.ledger_type === LedgerTypes.LEDGER_CREDIT)? "arrow-up-right":"arrow-down-left"} />} />
                </Box>
                <VStack>
                    <HStack space={1} alignItems={"center"}>
                        <Money numberOfLines={1} fontWeight={"bold"}>{data.amount}</Money>
                        {
                            (data.lock?.status === WalletLockStatuses.STATUS_LOCKED)?
                            <AntDesign name="lock" />:<></>
                        }
                    </HStack>
                    {
                        (data.transaction_type_text)?
                        <CText variant="body4" numberOfLines={1} color={"gray.400"}>Transaction Type: <CText color="black" variant={"body3"}>{data.transaction_type_text}</CText></CText>:<></>
                    } 
                    {
                        (data.sender_email && data.ledger_type === LedgerTypes.LEDGER_CREDIT)?
                        <CText variant="body4" numberOfLines={1} color={"gray.400"}>Sender Email: <CText color="black" variant={"body3"}>{data.sender_email}</CText></CText>:<></>
                    }
                   
                    {
                        (data.created_at)?
                        <CText variant="body4" numberOfLines={1} color={"gray.400"}>Occurred On: <CText color="black" variant={"body3"}>{data.created_at}</CText></CText>:<></>
                    } 
                   
                </VStack>
            </HStack>
        </TouchableOpacity>
    )
}