import React from "react";
import { NativeBaseProvider, extendTheme, Drawer } from "native-base";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavigationContainer } from "@react-navigation/native";
import IndexNavigation from "./src/navigations/IndexNavigation";
import { AppProvider } from "./src/contexts/AppContext";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from 'react-native-toast-notifications';
import AppContext from './src/contexts/AppContext';
import client from "./src/config/client.config";
import 'expo-dev-client';
import { LogBox } from "react-native";
import DrawerNavigation from './src/navigations/DrawerNavigation';

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}
export function AppComponent() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnReconnect: true,
        retry: false,
        refetchOnMount: true
      }
  }});
  const appContext = React.useContext(AppContext);

  React.useEffect(() => {
    if(appContext.authData?.token !== undefined && appContext.authData?.token !== null){
      client.defaults.headers.common['Authorization'] = "Bearer "+appContext.authData?.token;
    }
    //LogBox.ignoreAllLogs()
  },[appContext.authData?.token])
  return ( 
      <QueryClientProvider client={queryClient} >
        <NativeBaseProvider>
            <NavigationContainer>
               <IndexNavigation />
            </NavigationContainer>
        </NativeBaseProvider>
        <Toast
            placement="top"
            dangerIcon={<MaterialIcons size={14} color="white" name="dangerous" />}
            successIcon={<MaterialIcons size={14} color="white" name="check-circle-outline" />}
            // @ts-ignore
            ref={(ref) => global['toast'] = ref } 
            duration={10000}
            animationType='slide-in'
            animationDuration={250}
            successColor="green"
            dangerColor="red"
            warningColor="orange"
            normalColor="gray"
            style={{justifyContent:"center",alignItems:"flex-start",paddingHorizontal:15}}
          />
      </QueryClientProvider>
    
  );
}

export default function App(){
   return (
    <AppProvider>
      <AppComponent />
    </AppProvider>
   )
}


