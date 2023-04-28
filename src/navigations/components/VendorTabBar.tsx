import { HStack, VStack } from "native-base";
import {BottomTabBarProps} from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import CText from "../../../components/CText";
import { APP_COLOR, XPADDING } from "../../config/constants.config";
import { VendorTabLabels } from "../VendorDashboard";

export default function VendorTabBar({state,descriptors,navigation}:BottomTabBarProps){
    const tabIcon = (label: string, color: string, index: number) => {
        const iconSize = (index == 2)? 35 : 23;
        switch(label){
            case VendorTabLabels.Home : return <Ionicons color={color} size={iconSize} name="home" />;
            case VendorTabLabels.Orders : return <Ionicons color={color} size={iconSize} name="cart" />;
            case VendorTabLabels.Products : return <FontAwesome aria-label="Products" color={color} size={iconSize} name="shopping-bag" />;
            case VendorTabLabels.Wallet : return <Ionicons color={color} size={iconSize} name="wallet" />;
            case VendorTabLabels.Settings : return <Ionicons color={color} size={iconSize} name="settings" />;
            default: return <Ionicons color={color} size={iconSize} name="settings" />;
        }
    }

    return (
        <HStack  borderTopLeftRadius={"md"} borderTopRightRadius={"md"} style={{overflow:"hidden"}} alignItems="center" px={"5px"} py="8px" justifyContent={"space-evenly"}>
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
            <VStack  alignItems={"center"}>
                {
                    tabIcon(label.toString(),(isFocused)? APP_COLOR: "gray",index)
                }
                {
                    (index !== 2)? 
                    <CText fontWeight={(isFocused)? "bold":"normal"} variant="body3" color={(isFocused)? APP_COLOR: "gray.400"}>
                        {label.toString()}
                    </CText>:<></>
                }
                
            </VStack>
          </TouchableOpacity>
        );
      })}
        </HStack>
    )
}