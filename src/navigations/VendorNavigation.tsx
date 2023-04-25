import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import routes from "../config/routes.config";
import VendorOnboarding from "../screens/Vendors/VendorOnboarding/VendorOnboarding";
import CreateStore from "../screens/Vendors/CreateStore/CreateStore";
import JoinStore from "../screens/Vendors/JoinStore/JoinStore";
import { APP_COLOR } from "../config/constants.config";

const Stack = createNativeStackNavigator();
export default function VendorNavigation(){
    const defaultOptions = { statusBarColor:APP_COLOR, headerShown: false, animation: "slide_from_right" } as NativeStackNavigationOptions | ((props: { route: RouteProp<ParamListBase, string>; navigation: any; }) => NativeStackNavigationOptions)
    return (
        <Stack.Navigator initialRouteName={routes.vendorOnboarding}>
            <Stack.Screen
                options={defaultOptions} 
                name={routes.vendorOnboarding}
                component={VendorOnboarding}
            />
            <Stack.Screen
                options={defaultOptions}
                name={routes.createStore}
                component={CreateStore}
            />
            <Stack.Screen
                options={defaultOptions}
                name={routes.joinStore}
                component={JoinStore}
            />


            

        </Stack.Navigator>
    )
}
