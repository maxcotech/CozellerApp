import { Image } from "native-base";
import SafeScaffold from "./SafeScaffold";


export default function IconLoadingPage(){
    return (
        <SafeScaffold>
            <Image alt="Splash Loading" width="full" height="full" source={require('../assets/splash.gif')} />
        </SafeScaffold>
    )
}