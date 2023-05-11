import { ScrollView, View } from "native-base";
import AppBar from "../../../../../components/AppBar";
import SafeScaffold from "../../../../../components/SafeScaffold";
import { XPADDING } from "../../../../config/constants.config";
import AccountSection from "./fragments/AccountSection";
import FundSection from "./fragments/FundSection";
import StoreSection from "./fragments/StoreSection";


export default function Settings(){
    
    return (
        <View flex={1}>
            <AppBar title="Settings" />
            <ScrollView flex={1} py={"20px"} px={XPADDING}>
               <FundSection />
               <StoreSection />
               <AccountSection />
               
            </ScrollView>
        </View>
    )
}