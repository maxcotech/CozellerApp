import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import routes from "../config/routes.config";
import DrawerContent from "../screens/Home/fragments/DrawerContent";
import Home from "../screens/Home/Home";
import Logout from "../screens/Logout/Logout";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation(){
    return (
        <Drawer.Navigator
    
        useLegacyImplementation={false}
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen options={{ headerShown: false }}  name={routes.home} component={Home} />
        <Drawer.Screen options={{ headerShown: false }}  name={routes.logout} component={Logout} />
        
      </Drawer.Navigator>
    )
}