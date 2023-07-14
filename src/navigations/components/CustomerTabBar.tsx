import { HStack, VStack } from "native-base";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import CText from "../../../components/CText";
import { APP_COLOR } from "../../config/constants.config";
import { CustomerTabLabels } from "../CustomerNavigation";
import routes from "../../config/routes.config";
import { useProfile } from "../../api/queries/account.queries";

export default function CustomerTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
     const { data } = useProfile({});
     const tabIcon = (label: string, color: string, index: number) => {
          const iconSize = (index == 2) ? 35 : 23;
          switch (label) {
               case CustomerTabLabels.Home: return <Ionicons color={color} size={iconSize} name="home" />;
               case CustomerTabLabels.Products: return <FontAwesome aria-label="Products" color={color} size={iconSize} name="shopping-bag" />;
               case CustomerTabLabels.Account: return <Ionicons aria-label="Products" color={color} size={iconSize} name="person" />;
               case CustomerTabLabels.Wishlist: return <AntDesign color={color} size={iconSize} name="heart" />;
               case CustomerTabLabels.Help: return <MaterialIcons color={color} size={iconSize} name="contact-support" />;
               default: return <Ionicons color={color} size={iconSize} name="settings" />;
          }
     }
     const authRoutes = [
          routes.customerAccount
     ]

     return (

          <HStack shadow={3} backgroundColor={"gray.100"} borderTopLeftRadius={"md"} borderTopRightRadius={"md"} style={{ overflow: "hidden" }} alignItems="center" px={"5px"} py="8px" justifyContent={"space-evenly"}>
               {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label = options.tabBarLabel ?? route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                         const event = navigation.emit({
                              type: 'tabPress',
                              target: route.key,
                              canPreventDefault: true,
                         });
                         if (authRoutes.includes(route.name)) {
                              if (data?.data?.logged_in === false) {
                                   navigation.navigate({
                                        name: routes.login, merge: true, params: {
                                             nextRouteParams: { screen: route.name },
                                             nextRoute: routes.customerIndex
                                        }
                                   });
                                   return false;
                              }
                         }

                         if (!isFocused && !event.defaultPrevented) {
                              // The `merge: true` option makes sure that the params inside the tab screen are preserved
                              navigation.navigate({ name: route.name, merge: true, params: route.params });
                         }
                    };

                    const onLongPress = () => {
                         navigation.emit({
                              type: 'tabLongPress',
                              target: route.key,
                         });
                    };

                    return (
                         <TouchableOpacity
                              accessibilityRole="button" key={index}
                              accessibilityState={isFocused ? { selected: true } : {}}
                              onPress={onPress}
                              onLongPress={onLongPress}
                              style={{ flex: 1 }}
                         >
                              <VStack alignItems={"center"}>
                                   {
                                        tabIcon(label.toString(), (isFocused) ? APP_COLOR : "gray", index)
                                   }
                                   {
                                        (index !== 2) ?
                                             <CText fontWeight={(isFocused) ? "bold" : "normal"} variant="body3" color={(isFocused) ? APP_COLOR : "gray.400"}>
                                                  {label.toString()}
                                             </CText> : <></>
                                   }

                              </VStack>
                         </TouchableOpacity>
                    );
               })}
          </HStack>

     )
}