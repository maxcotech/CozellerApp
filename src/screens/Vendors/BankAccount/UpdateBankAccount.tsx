import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import AppBar from "../../../../components/AppBar";
import SafeScaffold from "../../../../components/SafeScaffold";
import { BankAccount, BankFormData } from "../../../config/data_types/bank_types";
import { View } from "native-base";
import BankAccountForm from "./components/BankAccountForm";
import { BankQueryKeys, useUpdateBankAccount } from "../../../api/queries/bank.queries";
import { AppNavProps } from "../../../config/routes.config";
import { useQueryClient } from "react-query";
import { XPADDING } from "../../../config/constants.config";

export interface UpdateBankAccountRoute extends RouteProp<ParamListBase> {
    params?: {bank: BankAccount}
}

export default function UpdateBankAccount(){
    const route = useRoute<UpdateBankAccountRoute>();
    const navigation = useNavigation<AppNavProps>();
    const queryClient = useQueryClient();
    const {mutate,isLoading} = useUpdateBankAccount({
        onSuccess: (data) => {
            toast.show(data.message,{type:"success"});
            queryClient.invalidateQueries({queryKey:[BankQueryKeys.fetchBankAccounts]});
            navigation.pop();
        }
    })

    const onUpdate = (data: BankFormData, setErrors: (val:any) => void) => {
        mutate(data,{
            onError: (error) => {
                setErrors(error?.data)
            }
        })
    }
    
    return (
        <SafeScaffold>
            <AppBar title="Edit Bank Account" />
            <View flex={1} pt="20px" px={XPADDING}>
                <BankAccountForm isLoading={isLoading}  handleSubmit={onUpdate} defaultData={route?.params?.bank} />
            </View>
        </SafeScaffold>
    )
}