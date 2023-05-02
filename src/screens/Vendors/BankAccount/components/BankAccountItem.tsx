import { Actionsheet, Box, HStack, Icon, Spinner, VStack } from "native-base";
import { BankAccount } from "../../../../config/data_types/bank_types";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { APP_COLOR_LIGHTER } from "../../../../config/constants.config";
import CText from "../../../../../components/CText";
import { ManageResourceActions } from "../../../../config/enum.config";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../../config/routes.config";
import ConfirmDialog from "../../../../../components/ConfirmDialog";
import { BankQueryKeys, useDeleteBankAccount } from "../../../../api/queries/bank.queries";
import { useQueryClient } from "react-query";
import { APP_COLOR } from './../../../../config/constants.config';

export default function BankAccountItem({data}:{data:BankAccount}){
    const [showOptions,setShowOptions] = useState(false);
    const [showDelete,setShowDelete] = useState(false);
    const queryClient = useQueryClient();
    const navigation = useNavigation<AppNavProps>();
    const deleteQuery = useDeleteBankAccount({
        onSuccess: (data) => {
            toast.show(data.message,{type:"success"});
            queryClient.invalidateQueries({queryKey:[BankQueryKeys.fetchBankAccounts]});
        }
    });
    const onSelectAction = (option: ManageResourceActions) => {
        setShowOptions(false);
        if(option === ManageResourceActions.Update){
            navigation.navigate(routes.vendorUpdateBankAccount,{bank: data});
        }
        if(option === ManageResourceActions.Delete){
            setShowDelete(true);
        }
    }
    return (
        <>
        <TouchableOpacity onPress={() => setShowOptions(true)}>
            <HStack space={2} my="8px" alignItems="center" borderRadius={"lg"} p="15px" backgroundColor={APP_COLOR_LIGHTER}>
                {
                    (deleteQuery.isLoading)?
                    <Spinner size="lg" color={APP_COLOR} />:
                    <Box borderRadius="full" backgroundColor={"gray.200"} justifyContent={"center"} alignItems="center" width="50px" height="50px">
                        <Icon size="md" color="gray.500" as={<MaterialCommunityIcons name="bank" />} />
                    </Box>
                }
                
                <VStack flex={1}>
                    <CText>{data.bank_name}</CText>
                {
                        (data.account_number)?
                        <CText variant="body4" numberOfLines={1} color={"gray.400"}>Account No: <CText color="black" variant={"body3"}>{data.account_number}</CText></CText>:<></>
                    }
                    {
                        (data.account_name)?
                        <CText variant="body4" numberOfLines={1} color={"gray.400"}>Account Name: <CText color="black" variant={"body3"}>{data.account_name}</CText></CText>:<></>
                    } 
                    {
                        (data.currency?.currency_code)?
                        <CText variant="body4" numberOfLines={1} color={"gray.400"}>Currency: <CText color="black" variant={"body3"}>{data.currency?.currency_code}</CText></CText>:<></>
                    } 
                     {
                        (data.created_at)?
                        <CText variant="body4" numberOfLines={1} color={"gray.400"}>Added On: <CText color="black" variant={"body3"}>{data.created_at}</CText></CText>:<></>
                    } 
                </VStack>
            </HStack>
        </TouchableOpacity>
        <Actionsheet isOpen={showOptions} onClose={() => setShowOptions(false)}>
            <Actionsheet.Content>
                <CText numberOfLines={1}>Manage {data.account_number}</CText>
                <Actionsheet.Item onPress={() => onSelectAction(ManageResourceActions.Update)} alignSelf="stretch">
                        <HStack py="5px" borderBottomColor={"gray.200"} width="full" alignItems="center" justifyContent={"space-between"}>
                            <HStack space={4}>
                                <AntDesign name="edit" size={20} />
                                <CText>Edit Bank Account</CText>
                            </HStack>
                            <Box ml="auto">
                                <MaterialIcons size={20} name="arrow-forward" />
                            </Box>
                        </HStack>
                    </Actionsheet.Item>
                    <Actionsheet.Item onPress={() => onSelectAction(ManageResourceActions.Delete)} alignSelf="stretch">
                        <HStack py="5px" borderBottomColor={"gray.200"} width="full" alignItems="center" justifyContent={"space-between"}>
                            <HStack space={4}>
                                <AntDesign color="red" name="delete" size={20} />
                                <CText color="red.500">Delete Bank Account</CText>
                            </HStack>
                            <Box ml="auto">
                                <MaterialIcons size={20} name="arrow-forward" />
                            </Box>
                        </HStack>
                    </Actionsheet.Item>
            </Actionsheet.Content>
        </Actionsheet>
        <ConfirmDialog onConfirm={() => {
            setShowDelete(false);
            deleteQuery.mutate({
                store_id: data.store_id,
                bank_account_id: data.id
        })}} message="This bank account will be permanently deleted." isOpen={showDelete} onClose={() => setShowDelete(false)} />
        </>
    )
}