import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import routes from "../config/routes.config";
import VendorOnboarding from "../screens/Vendors/VendorOnboarding/VendorOnboarding";
import CreateStore from "../screens/Vendors/CreateStore/CreateStore";
import JoinStore from "../screens/Vendors/JoinStore/JoinStore";
import { APP_COLOR } from "../config/constants.config";
import VendorDashboard from "./VendorDashboard";
import CreateProduct from "../screens/Vendors/Dashboard/Products/CreateProduct";
import { ProductFormProvider } from "../contexts/ProductFormContext";
import CategoryOptions from "../screens/Vendors/CategoryOptions/CategoryOptions";

const Stack = createNativeStackNavigator();
export default function VendorNavigation(){
    const defaultOptions = { statusBarColor:APP_COLOR, headerShown: false, animation: "slide_from_right" } as NativeStackNavigationOptions | ((props: { route: RouteProp<ParamListBase, string>; navigation: any; }) => NativeStackNavigationOptions)
    return (
        <ProductFormProvider>
        <Stack.Navigator  initialRouteName={routes.vendorOnboarding}>
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
            <Stack.Screen
                options={defaultOptions}
                name={routes.vendorDashboard}
                component={VendorDashboard}
            />
             <Stack.Screen
                options={defaultOptions}
                name={routes.vendorCreateProduct}
                component={CreateProduct}
            />
            <Stack.Screen
                initialParams={{onSelect: () => console.log("hello")}}
                options={defaultOptions}
                name={routes.categoryOptions}
                component={CategoryOptions}
            />
            

        </Stack.Navigator>
        </ProductFormProvider>
    )
}
