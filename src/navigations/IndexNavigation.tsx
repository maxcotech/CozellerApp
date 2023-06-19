import React, { useContext, useMemo } from "react"
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';
import routes from './../config/routes.config';
import Login from './../screens/Login/Login';
import DrawerNavigation from './DrawerNavigation';
import Logout from "../screens/Logout/Logout";
import { Introduction } from "../screens/Introduction/Introduction";
import Register from "../screens/Register/Register";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import EmailVerification from "../screens/EmailVerification/EmailVerification";
import AppContext from './../contexts/AppContext';
import { useProfile } from "../api/queries/account.queries";
import IconLoadingPage from "../../components/IconLoadingPage";
import { AccountTypes } from "../config/enum.config";
import VendorNavigation from "./VendorNavigation";
import ComingSoon from "../screens/ComingSoon/ComingSoon";
import { APP_COLOR } from "../config/constants.config";
import ChangePassword from "../screens/ChangePassword/ChangePassword";
import EmailPasswordReset from "../screens/EmailPasswordReset/EmailPasswordReset";
import CustomerNavigation from "./CustomerNavigation";
import SearchScreen from "../screens/Customers/SearchScreen/SearchScreen";
import Catalog from "../screens/Customers/Catalog/Catalog";

const Stack = createNativeStackNavigator();
export default function IndexNavigation() {
    const appContext = useContext(AppContext);
    const profileQuery = useProfile({
        enabled: ((!!appContext.profileData === false || appContext.profileData?.logged_in === false) && !!appContext.authData?.token),
        onSuccess: (data) => {
            const profile = data.data;
            if (profile.logged_in) {
                appContext.setProfileData(profile);
            }
        }
    })
    const userType = useMemo(() => {
        return appContext.profileData?.user?.user_type;
    }, [appContext.profileData?.user?.user_type])
    const defaultOptions = { headerShown: false, animation: "slide_from_right", statusBarColor: APP_COLOR } as NativeStackNavigationOptions | ((props: { route: RouteProp<ParamListBase, string>; navigation: any; }) => NativeStackNavigationOptions)
    if (profileQuery.isLoading) {
        return <IconLoadingPage />
    }
    return (
        <Stack.Navigator initialRouteName={
            (appContext.profileData?.logged_in) ? ((userType == AccountTypes.StoreOwner || userType == AccountTypes.StoreStaff) ? routes.vendorIndex :
                routes.comingSoon) : ((appContext.authData?.token) ? routes.login : routes.introduction)
        }>
            <Stack.Screen
                options={defaultOptions}
                name={routes.register}
                component={Register}
            />
            <Stack.Screen
                options={defaultOptions}
                name={routes.emailVerification}
                component={EmailVerification}
            />
            <Stack.Screen
                options={{ statusBarTranslucent: true, statusBarColor: "transparent", headerShown: false, animation: "slide_from_right" }}
                name={routes.introduction}
                component={Introduction}
            />
            <Stack.Screen
                options={defaultOptions}
                name={routes.comingSoon}
                component={ComingSoon}
            />
            <Stack.Screen
                options={defaultOptions}
                name={routes.login}
                component={Login}
            />
            <Stack.Screen
                options={defaultOptions}
                name={routes.vendorIndex}
                component={VendorNavigation}
            />
            <Stack.Screen
                options={{ ...defaultOptions, statusBarColor: "transparent", statusBarTranslucent: true }}
                name={routes.customerIndex}
                component={CustomerNavigation}
            />

            <Stack.Screen
                options={defaultOptions}
                name={routes.logout}
                component={Logout}
            />

            <Stack.Screen
                options={defaultOptions}
                name={routes.drawer}
                component={DrawerNavigation}
            />
            <Stack.Screen
                options={defaultOptions}
                name={routes.changePassword}
                component={ChangePassword}
            />
            <Stack.Screen
                options={defaultOptions}
                name={routes.emailPasswordReset}
                component={EmailPasswordReset}
            />

            {/* Customer  */}
            <Stack.Screen
                options={defaultOptions}
                name={routes.customerSearch}
                component={SearchScreen}
            />

            <Stack.Screen
                options={defaultOptions}
                name={routes.customerCatalog}
                component={Catalog}
            />





        </Stack.Navigator>
    )
}