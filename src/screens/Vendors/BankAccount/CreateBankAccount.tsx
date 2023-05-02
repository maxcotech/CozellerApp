import { View } from "native-base";
import AppBar from "../../../../components/AppBar";
import SafeScaffold from "../../../../components/SafeScaffold";
import BankAccountForm from "./components/BankAccountForm";
import { useCreateBankAccounts } from "../../../api/queries/bank.queries";
import { BankFormData } from "../../../config/data_types/bank_types";
import { useNavigation } from "@react-navigation/native";
import { AppNavProps } from "../../../config/routes.config";
import { useQueryClient } from "react-query";
import { XPADDING } from "../../../config/constants.config";

export default function CreateBankAccount(){
    const navigation = useNavigation<AppNavProps>();
    const queryClient = useQueryClient();
    const {isLoading,mutate} = useCreateBankAccounts({
        onSuccess(data) {
            toast.show(data.message,{type:"success"});
            queryClient.invalidateQueries();
            navigation.pop();
        },
    })

    const onCreateBankAccount = (data: BankFormData, onErrors: any) => {
        mutate(data,{
            onError:(data) => {
                toast.show(data.message,{type:"danger"})
                onErrors(data?.data)
            }
        })
    }
    return (
        <SafeScaffold>
            <AppBar title="Create Bank Account" />
            <View flex={1} px={XPADDING} pt={"15px"}>
                <BankAccountForm isLoading={isLoading} handleSubmit={onCreateBankAccount} />
            </View>
        </SafeScaffold>
    )
}