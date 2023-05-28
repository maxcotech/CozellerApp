import { Box, KeyboardAvoidingView, ScrollView, View } from "native-base";
import AppBtn from "../../../../../components/AppBtn";
import { BankAccount, BankFormData } from "../../../../config/data_types/bank_types";
import { useContext, useEffect, useState } from "react";
import { createFormErrorObject } from "../../../../helpers/message.helpers";
import CustomInput, { CustomPasswordInput } from "../../../../../components/CustomInput";
import CustomSelect from "../../../../../components/CustomSelect";
import { useCurrencies } from "../../../../api/queries/currency.queries";
import { useBankCodes } from "../../../../api/queries/bank.queries";
import AppContext from "../../../../contexts/AppContext";

export interface BankAccountFormProps {
    submitLabel?: string,
    defaultData?: BankAccount,
    handleSubmit: (data: BankFormData, setErrors: (val:any) => void) => void,
    isLoading?: boolean
}

export default function BankAccountForm({
    isLoading,handleSubmit,
    submitLabel = "Create Account", defaultData = {} as BankAccount}: BankAccountFormProps){

    const appContext = useContext(AppContext);
    const [formState,setFormState] = useState({
        password:"",
        store_id: defaultData?.store_id ?? appContext.profileData?.current_store?.id,
        bank_code: defaultData?.bank_code ?? "",
        account_number: defaultData?.account_number ?? "",
        account_name: defaultData?.account_name ?? "",
        bank_currency_id: defaultData?.bank_currency_id ?? "",
        bank_name: defaultData?.bank_name ?? "",
        id: defaultData?.id ?? undefined
    } as BankFormData);
    const [errors,setErrors] = useState(createFormErrorObject(formState));
    const setFormValue = (val: any, key: keyof BankFormData) => {
        setFormState({
            ...formState,[key]: val
        })
    }
    const currencyQuery = useCurrencies({});
    const bankCodeQuery = useBankCodes(formState.bank_currency_id,{
        enabled: (!!formState.bank_currency_id)
    })

    useEffect(() => {
        if(formState.bank_code && bankCodeQuery.data?.data && bankCodeQuery.data?.data?.length > 0){
            const bank = bankCodeQuery.data.data.find((item) => item.code === formState.bank_code);
            if(bank) setFormState({...formState,bank_name: bank.name});
        }
    },[formState.bank_code])

    return (
        <View flex={1}>
            <KeyboardAvoidingView flex={1} behavior="padding">
                <ScrollView flex={1}>
                    <CustomInput my="8px" onChangeText={(val) => setFormValue(val,"account_name")} error={errors?.account_name} value={formState.account_name} labelText="Account Name*" placeholder="Enter Account Name" />
                    <CustomInput my="8px" onChangeText={(val) => setFormValue(val,"account_number")} error={errors?.account_number} value={formState.account_number} keyboardType="number-pad" labelText="Account Number*" placeholder="Enter Account Number" />
                    <CustomSelect valueKey="id" titleKey="currency_name" options={currencyQuery.data?.data ?? []} isLoading={currencyQuery.isLoading} my="8px" onValueChange={(val) => setFormValue(val,"bank_currency_id")} error={errors?.bank_currency_id} value={formState.bank_currency_id}  labelText="Bank Currency*" placeholder="Select Bank Currency" />
                    <CustomSelect includeSearch={true} searchPlaceholder="Search Banks..."  valueKey="code" titleKey="name" options={bankCodeQuery.data?.data ?? []} isLoading={bankCodeQuery.isLoading} my="8px" onValueChange={(val) => setFormValue(val,"bank_code")} error={errors?.bank_code} value={formState.bank_code}  labelText="Bank / Fin. Institution*" placeholder="Select Bank" />
                    <CustomPasswordInput my="8px" onChangeText={(val) => setFormValue(val,"password")} error={errors?.password} value={formState.password} labelText="Password*" placeholder="Enter password to authenticate" />
                </ScrollView>
            </KeyboardAvoidingView>
            <Box my="10px">
                <AppBtn onPress={() => handleSubmit(formState,setErrors)}  gradient={true} isLoading={isLoading}>{submitLabel}</AppBtn>
            </Box>
        </View>
    )
}