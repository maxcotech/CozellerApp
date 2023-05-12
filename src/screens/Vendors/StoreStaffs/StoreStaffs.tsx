import { View } from "native-base";
import AppBar from "../../../../components/AppBar";
import SafeScaffold from "../../../../components/SafeScaffold";

export default function StoreStaffs(){
    return (
        <SafeScaffold>
            <AppBar title="Store Staffs" subtitle="Manage Store Staffs" />
            <View flex={1}>
                
            </View>
        </SafeScaffold>
    )
}