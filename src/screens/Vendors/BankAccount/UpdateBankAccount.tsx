import { ParamListBase, RouteProp, useRoute } from "@react-navigation/native";
import AppBar from "../../../../components/AppBar";
import SafeScaffold from "../../../../components/SafeScaffold";
import { BankAccount } from "../../../config/data_types/bank_types";
import { View } from "native-base";

export interface UpdateBankAccountRoute extends RouteProp<ParamListBase> {
    params?: {bank: BankAccount}
}

export default function UpdateBankAccount(){
    const route = useRoute<UpdateBankAccountRoute>();
    return (
        <SafeScaffold>
            <AppBar title="Edit Bank Account" />
            <View flex={1}>
                
            </View>
        </SafeScaffold>
    )
}