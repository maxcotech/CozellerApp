import { Box, Center, Circle, Icon, ScrollView, View } from "native-base";
import AppBar from "../../../../components/AppBar";
import { APP_COLOR, APP_COLOR_LIGHT, XPADDING } from "../../../config/constants.config";
import BillingSection from "./fragments/ShippingSection";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from 'react';
import AppContext from "../../../contexts/AppContext";
import CText from "../../../../components/CText";
import OrdersSection from "./fragments/OrdersSection";
import AccountSection from "./fragments/AccountSection";
import AppBtn from "../../../../components/AppBtn";


export default function Account() {
     const appContext = useContext(AppContext)
     return (
          <View flex={1}>
               <AppBar title="My Account" textColor="white" backgroundColor={APP_COLOR} />
               <ScrollView contentContainerStyle={{ paddingVertical: 20 }} px={XPADDING} flex={1}>
                    <Center mb={5}>
                         <Circle backgroundColor={APP_COLOR_LIGHT}>
                              <Icon size="6xl" color="white" as={<Ionicons name="person" />} />
                         </Circle>
                         <CText fontWeight={"bold"} mt={2} numberOfLines={1}>Welcome {appContext.profileData?.user?.first_name ?? "-----"}</CText>
                    </Center>
                    <BillingSection />
                    <OrdersSection />
                    <AccountSection />

               </ScrollView>
          </View>
     )
}