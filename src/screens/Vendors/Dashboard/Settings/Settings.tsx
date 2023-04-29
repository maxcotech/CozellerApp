import { ScrollView } from "native-base";
import AppBar from "../../../../../components/AppBar";
import SafeScaffold from "../../../../../components/SafeScaffold";
import { XPADDING } from "../../../../config/constants.config";
import AccountSection from "./fragments/AccountSection";


export default function Settings(){
    
    return (
        <SafeScaffold>
            <AppBar title="Settings" />
            <ScrollView flex={1} py={"20px"} px={XPADDING}>
               <AccountSection />
            </ScrollView>
        </SafeScaffold>
    )
}