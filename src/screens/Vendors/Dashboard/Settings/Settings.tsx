import { ScrollView, View } from "native-base";
import AppBar from "../../../../../components/AppBar";
import SafeScaffold from "../../../../../components/SafeScaffold";
import { XPADDING } from "../../../../config/constants.config";
import AccountSection from "./fragments/AccountSection";
import FundSection from "./fragments/FundSection";
import StoreSection from "./fragments/StoreSection";
import ShippingSection from "./fragments/ShippingSection";


export default function Settings(){
    
    return (
        <View flex={1}>
            <AppBar title="Settings" />
            <ScrollView flex={1} contentContainerStyle={{paddingVertical:20}}  px={XPADDING}>
               <FundSection />
               <StoreSection />
               <ShippingSection />
               <AccountSection />
               
            </ScrollView>
        </View>
    )
}