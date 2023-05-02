import { Box, ScrollView, VStack, View } from "native-base";
import AppBar from "../../../../components/AppBar";
import SafeScaffold from "../../../../components/SafeScaffold";
import { XPADDING } from "../../../config/constants.config";
import CustomInput, { CustomPasswordInput } from "../../../../components/CustomInput";
import { useContext, useState } from "react";
import { WithdrawalFormData } from "../../../config/data_types/withdrawal_types";
import CustomSelect from "../../../../components/CustomSelect";
import { useBankAccounts } from "../../../api/queries/bank.queries";
import AppContext from "../../../contexts/AppContext";
import CText from "../../../../components/CText";
import AppBtn from "../../../../components/AppBtn";
import { createFormErrorObject } from "../../../helpers/message.helpers";
import { WithdrawalQueryKeys, useCreateWithdrawalRequest } from "../../../api/queries/withdrawal.queries";
import { useNavigation } from "@react-navigation/native";
import { AppNavProps } from "../../../config/routes.config";
import { useQueryClient } from "react-query";
import { WalletQueryKeys } from "../../../api/queries/wallet.queries";

export default function RequestWithdrawal(){
    const {profileData} = useContext(AppContext);
    const [formState,setFormState] = useState({
        store_id: profileData?.current_store?.id
    } as WithdrawalFormData);
    const navigation = useNavigation<AppNavProps>();
    const [errors,setErrors] = useState(createFormErrorObject(formState));
    const queryClient = useQueryClient();
    const appContext = useContext(AppContext);
    const {isLoading,data} = useBankAccounts(appContext.profileData?.current_store?.id)
    const withdrawQuery = useCreateWithdrawalRequest({
        onSuccess: (data) => {
            toast.show(data.message,{type:"success"});
            queryClient.invalidateQueries({queryKey:[WalletQueryKeys.fetchStoreWallet]});
            queryClient.invalidateQueries({queryKey:[WithdrawalQueryKeys.fetchWithdrawals]});
            navigation.pop();

        }
    })
    const setFormValue = (val:any, key: keyof WithdrawalFormData) => {
        setFormState({...formState,[key]:val})
    }
    const onCreateWithdrawal = () => {
        withdrawQuery.mutate(formState,{
            onError:(error) => {
                toast.show(error.message,{type:"danger"})
                setErrors(error?.data);
            }
        })
    }
    return (
        <SafeScaffold>
            <AppBar title="Request Withdrawal" />
            <View flex={1} pt="15px" px={XPADDING}>
                <ScrollView flex={1} showsVerticalScrollIndicator={false}>
                    <CustomInput value={formState.amount?.toString()} error={errors?.amount} my="8px" onChangeText={(val) => setFormValue(val,"amount")}  labelText="Amount*" keyboardType="number-pad" placeholder="Enter Amount" />
                    <CustomSelect error={errors?.bank_account_id} value={formState.bank_account_id} valueKey="id" titleKey="bank_name" isLoading={isLoading} 
                        renderItem={(item) => (
                            <VStack>
                                <CText>{item.bank_name}</CText>
                                <CText color="gray.400" variant="body3">{item.account_number}</CText>
                            </VStack>
                        )}
                    options={data?.data ?? []} my="8px" onValueChange={(val) => setFormValue(val,"bank_account_id")}  labelText="Bank Account*" keyboardType="number-pad" placeholder="Enter Amount" />
                    <CustomPasswordInput error={errors?.password} value={formState.password} my="8px" onChangeText={(val) => setFormValue(val,"password")}  labelText="Password*"  placeholder="Enter Password to authenticate" />
                </ScrollView>
                <Box my="10px">
                    <AppBtn onPress={onCreateWithdrawal} isLoading={withdrawQuery.isLoading} gradient={true}>Send Request</AppBtn>
                </Box>
            </View>
        </SafeScaffold>
    )
}