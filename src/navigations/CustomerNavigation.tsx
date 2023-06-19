import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SafeScaffold from "../../components/SafeScaffold";
import { APP_COLOR } from "../config/constants.config";
import routes, { CustomerRoutes } from "../config/routes.config";
import Home from "../screens/Customers/Home/Home";
import Categories from "../screens/Customers/Categories/Categories";
import Account from "../screens/Customers/Account/Account";
import Wishlist from "../screens/Customers/Wishlist/Wishlist";
import Help from "../screens/Customers/Help/Help";
import CustomerTabBar from "./components/CustomerTabBar";

const Tab = createBottomTabNavigator();
export enum CustomerTabLabels {
     Home = "Home",
     Categories = "Categories",
     Account = "Account",
     Wishlist = "Wishlist",
     Help = "Help"
}

export default function CustomerNavigation() {
     const defaultOptions = { statusBarColor: APP_COLOR, headerShown: false, animation: "slide_from_right" }
     return (
          <SafeScaffold>
               <Tab.Navigator sceneContainerStyle={{ backgroundColor: "white" }} screenOptions={{ unmountOnBlur: true }} tabBar={(props) => <CustomerTabBar {...props} />}>
                    <Tab.Screen
                         options={{ ...defaultOptions, tabBarLabel: CustomerTabLabels.Home }}
                         component={Home}
                         name={CustomerRoutes.customerHome}
                    />
                    <Tab.Screen
                         options={{ ...defaultOptions, tabBarLabel: CustomerTabLabels.Categories }}
                         component={Categories}
                         name={CustomerRoutes.customerCategories}
                    />
                    <Tab.Screen
                         options={{ ...defaultOptions, tabBarLabel: CustomerTabLabels.Account }}
                         component={Account}
                         name={CustomerRoutes.customerAccount}
                    />
                    <Tab.Screen
                         options={{ ...defaultOptions, tabBarLabel: CustomerTabLabels.Wishlist }}
                         component={Wishlist}
                         name={CustomerRoutes.customerWishlist}
                    />
                    <Tab.Screen
                         options={{ ...defaultOptions, tabBarLabel: CustomerTabLabels.Help }}
                         component={Help}
                         name={CustomerRoutes.customerHelp}
                    />
               </Tab.Navigator>
          </SafeScaffold>
     )
}