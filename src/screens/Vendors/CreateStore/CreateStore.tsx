import SafeScaffold from "../../../../components/SafeScaffold";
import AppBar from "../../../../components/AppBar";
import {  View } from "native-base";
import StoreForm from "./fragment/StoreForm";

export default function CreateStore(){
   
    return (
        <SafeScaffold>
            <AppBar title="Create Store" subtitle="Create a store account" />
            <View flex={1}>
                <StoreForm />
            </View>
        </SafeScaffold>
    )
}