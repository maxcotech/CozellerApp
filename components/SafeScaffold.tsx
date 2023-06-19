import { SafeAreaView } from "react-native-safe-area-context";
import { APP_COLOR } from "../src/config/constants.config";
import { View } from "native-base";


export default function SafeScaffold({ children, statusBarColor = APP_COLOR, backgroundColor = "white" }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: statusBarColor }}>
            <View flex={1} backgroundColor={backgroundColor}>
                {children}
            </View>
        </SafeAreaView>
    )
}