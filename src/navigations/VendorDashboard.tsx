import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Vendors/Dashboard/Home/Home";
import routes from "../config/routes.config";
import { APP_COLOR } from "../config/constants.config";
import VendorTabBar from "./components/VendorTabBar";
import Orders from "../screens/Vendors/Dashboard/Orders/Orders";
import Products from "../screens/Vendors/Dashboard/Products/Products";
import Wallet from "../screens/Vendors/Dashboard/Wallet/Wallet";
import Settings from "../screens/Vendors/Dashboard/Settings/Settings";
import SafeScaffold from "../../components/SafeScaffold";

const Tab = createBottomTabNavigator();
export enum VendorTabLabels {
    Home = "Home",
    Orders = "Orders",
    Products = "Products",
    Wallet = "Wallet",
    Settings = "Settings"
}
export default function VendorDashboard() {
    const defaultOptions = { statusBarColor: APP_COLOR, headerShown: false, animation: "slide_from_right" }

    return (
        <SafeScaffold>
            <Tab.Navigator sceneContainerStyle={{backgroundColor:"white"}}  screenOptions={{ unmountOnBlur: true }} tabBar={(props) => <VendorTabBar {...props} />}>
                <Tab.Screen
                    options={{ ...defaultOptions, tabBarLabel: VendorTabLabels.Home }}
                    component={Home}
                    name={routes.vendorDashboardHome}
                />
                <Tab.Screen
                    options={{ ...defaultOptions, tabBarLabel: VendorTabLabels.Orders }}
                    component={Orders}
                    name={routes.vendorDashboardOrders}
                />
                <Tab.Screen
                    options={{ ...defaultOptions, tabBarLabel: VendorTabLabels.Products }}
                    component={Products}
                    name={routes.vendorDashboardProducts}
                />
                <Tab.Screen
                    options={{ ...defaultOptions, tabBarLabel: VendorTabLabels.Wallet }}
                    component={Wallet}
                    name={routes.vendorDashboardWallet}
                />
                <Tab.Screen
                    options={{ ...defaultOptions, tabBarLabel: VendorTabLabels.Settings }}
                    component={Settings}
                    name={routes.vendorDashboardSettings}
                />
            </Tab.Navigator>
        </SafeScaffold>
    )

}