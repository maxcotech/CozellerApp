import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import routes from './../config/routes.config';
import Login from './../screens/Login/Login';
import AccountsList from '../screens/AccountsList/AccountsList';
import Home from "../screens/Home/Home";
import DrawerNavigation from './DrawerNavigation';
import AddContact from './../screens/AddContact/AddContact';
import Profile from "../screens/Profile/Profile";
import Logout from "../screens/Logout/Logout";

const Stack = createNativeStackNavigator();
export default function IndexNavigation(){
    return (
        <Stack.Navigator initialRouteName={routes.login}>
            <Stack.Screen 
                options={{ headerShown: false, animation: "slide_from_right" }} 
                name={routes.login}
                component={Login}
            />

            <Stack.Screen 
                options={{ headerShown: false, animation: "slide_from_right" }} 
                name={routes.logout}
                component={Logout}
            />
          
            <Stack.Screen
                options={{ headerShown: false, animation: "slide_from_right" }} 
                name={routes.accountList}
                component={AccountsList}
            />
            <Stack.Screen 
                options={{ headerShown: false, animation: "slide_from_right" }} 
                name={routes.drawer}
                component={DrawerNavigation}
            />
            <Stack.Screen 
                options={{ headerShown: true, title:"Add Contact", headerTitle: "Add Contact", animation: "slide_from_right" }} 
                name={routes.createContacts}
                component={AddContact}
            />
            <Stack.Screen 
                options={{ headerShown: true, headerTitle: "Profile", title:"Profile", animation: "slide_from_right" }} 
                name={routes.accountProfile}
                component={Profile}
            />


            
            
        </Stack.Navigator>
    )
}