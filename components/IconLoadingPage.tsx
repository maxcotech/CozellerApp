import { Image, View } from "native-base";
import SafeScaffold from "./SafeScaffold";


export default function IconLoadingPage() {
    return (
        <View flex={1}>
            <Image alt="Splash Loading" width="full" height="full" source={require('../assets/splash.gif')} />
        </View>
    )
}