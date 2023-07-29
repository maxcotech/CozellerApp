import { Box, Divider, FlatList, HStack, Icon, ScrollView, View } from "native-base";
import AppBar from "../../../../components/AppBar";
import CartIcon from "../components/CartIcon";
import HomeIcon from "../components/HomeIcon";
import { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../config/routes.config";
import { useProfile } from "../../../api/queries/account.queries";
import { useBillingAddresses } from "../../../api/queries/billing.queries";
import { APP_COLOR, APP_COLOR_LIGHTER, APP_COLOR_LIGHTER_2, XPADDING } from "../../../config/constants.config";
import { useCheckout, useInitPayment } from "../../../api/queries/payment.queries";
import CText from "../../../../components/CText";
import { useMemo } from 'react';
import AppBtn from "../../../../components/AppBtn";
import Money from "../../../../components/Money";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import IconLoadingPage from "../../../../components/IconLoadingPage";
import PaymentOptions from "./fragments/PaymentOptions";
import { InitPaymentPayload } from "../../../config/data_types/payment_types";
import AccountIcon from "../components/AccountIcon";


export default function Checkout() {
     const [initializing, setInitializing] = useState(true);
     const [showPaymentOptions, setShowPaymentOptions] = useState(false);
     const [loggedIn, setLoggedIn] = useState(false);
     const [hasShippingAddr, setHasShippingAddr] = useState(false);
     const [initPaymentPayload, setInitPaymentPayload] = useState<InitPaymentPayload>(null)
     const navigation = useNavigation<AppNavProps>();
     const initPaymentHandle = useInitPayment({
          onSuccess: (data) => {
               setInitPaymentPayload(data?.data)
               setShowPaymentOptions(true);
          }
     })
     const profile = useProfile({
          onSuccess(data) {
               if (data?.data?.logged_in) {
                    setLoggedIn(true);
               } else {
                    toast.show(`You need to login inorder to complete checkout processes.`);
                    navigation.replace(routes.login, { nextRoute: routes.customerCheckout })
               }
          }
     })
     useBillingAddresses({}, {
          onSuccess(data) {
               if (data?.data?.data?.length > 0) {
                    setHasShippingAddr(true);
               } else {
                    toast.show(`You need to add a billing address inorder to continue.`);
                    navigation.navigate(routes.customerCreateAddress)
               }
          }
     })

     const { data, isLoading } = useCheckout({ enabled: (initializing === false) })
     const info = useMemo(() => {
          return data?.data;
     }, [data?.data])

     useEffect(() => {
          if (loggedIn && hasShippingAddr) {
               setInitializing(false);
          }
     }, [loggedIn, hasShippingAddr])

     if (initializing || isLoading) return <IconLoadingPage />
     return (
          <>
               <View flex={1} backgroundColor={APP_COLOR_LIGHTER_2}>
                    <AppBar textColor="white" backgroundColor={APP_COLOR} title="Checkout" right={
                         <HStack alignItems="center" space={5}>
                              <AccountIcon size="md" />
                              <HomeIcon />
                              <CartIcon />
                         </HStack>
                    } />
                    <ScrollView paddingX={"10px"} paddingY={3} contentContainerStyle={{ paddingBottom: 20 }} flex={1}>
                         <Box borderRadius={8} backgroundColor={"white"}>
                              <Box paddingX={"10px"} paddingY="10px">
                                   <CText variant="body3" color="gray.400">Your current billing address:</CText>
                              </Box>
                              <Divider thickness={0.5} color="gray.400" />
                              <Box flex={1} paddingX={"10px"} paddingY="10px">
                                   <CText >
                                        {info?.current_billing_address?.first_name} {info?.current_billing_address?.last_name}
                                   </CText>
                                   <CText color="gray.400" numberOfLines={2}>
                                        {info?.current_billing_address?.street_address}, {info?.current_billing_address?.city?.city_name}
                                   </CText>
                                   <CText variant="body4" color={"gray.400"}>
                                        {info?.current_billing_address?.state?.state_name}, {info?.current_billing_address?.country?.country_name}
                                   </CText>
                                   <HStack mt="10px">
                                        <Box>
                                             <AppBtn onPress={() => navigation.navigate(routes.customerBillingAddresses)} paddingY={4} textVariant="body4">Change Address</AppBtn>
                                        </Box>
                                   </HStack>

                              </Box>

                         </Box>
                         <Box mt="10px" borderRadius={8} backgroundColor={"white"}>
                              <Box paddingX={"10px"} paddingY="10px">
                                   <CText variant="body3" color="gray.400">Your shipping details:</CText>
                              </Box>
                              <Divider thickness={0.5} color="gray.400" />
                              <Box flex={1} paddingX={"10px"} paddingY="10px">
                                   {
                                        (info?.shipping_details?.group_shipping_details?.length > 0) ?
                                             <FlatList
                                                  data={info?.shipping_details?.group_shipping_details}
                                                  renderItem={({ item, index }) => (
                                                       <View p="10px" borderRadius={8} backgroundColor={APP_COLOR_LIGHTER_2} marginY={2}>
                                                            <CText variant="body3" color="danger.400" fontWeight={"bold"}>Shipping {index + 1} of {info?.shipping_details?.group_shipping_details?.length}</CText>
                                                            {
                                                                 item.items?.map((subItem) => (
                                                                      <CText variant="body3" color="gray.400">{subItem.quantity}x. {subItem.item_name}</CText>
                                                                 ))
                                                            }
                                                            <CText color="success.600" my="5px">Item(s) will most likely arrive between {item.delivery_note?.minimum_delivery_date} and {item.delivery_note?.maximum_delivery_date}.</CText>
                                                            <CText color="gray.400" variant="body3">Note that items may arrive before these dates</CText>
                                                       </View>
                                                  )}
                                             /> : <></>
                                   }
                              </Box>
                         </Box>
                         <Box mt="10px" borderRadius={8} backgroundColor="white">
                              <HStack paddingX="10px" paddingY="10px" alignItems="center" justifyContent="space-between">
                                   <CText color="gray.400">Subtotal</CText>
                                   <Money currencySym={profile?.data?.data?.currency?.currency_sym}>{info?.cart_total_price}</Money>
                              </HStack>
                              <HStack paddingX="10px" paddingY="10px" alignItems="center" justifyContent="space-between">
                                   <CText color="gray.400">Delivery Fee</CText>
                                   <Money currencySym={profile?.data?.data?.currency?.currency_sym}>{info?.shipping_details?.grand_total_shipping_fees}</Money>
                              </HStack>
                              <Divider thickness={0.5} color="gray.400" />
                              <HStack paddingX="10px" paddingY="10px" alignItems="center" justifyContent="space-between">
                                   <CText color="gray.400" fontWeight={"bold"}>Total</CText>
                                   <Money fontWeight={"bold"} currencySym={profile?.data?.data?.currency?.currency_sym}>{info?.cart_total_price + info?.shipping_details?.grand_total_shipping_fees}</Money>
                              </HStack>
                              <Divider thickness={0.5} color="gray.400" />
                              <CText onPress={() => navigation.navigate(routes.customerShoppingCart)} py="10px" textAlign="center" fontWeight="bold" color="success.600">Modify Cart</CText>
                         </Box>
                         <Box my="10px">
                              <AppBtn isLoading={initPaymentHandle.isLoading} onPress={() => initPaymentHandle.mutate(null)}>Proceed to payment</AppBtn>
                         </Box>
                         <Box paddingX="10px" paddingY="10px" borderRadius={8} backgroundColor={APP_COLOR_LIGHTER}>
                              <HStack alignItems='center' space={1}>
                                   <CText fontWeight="bold">
                                        Payment is secured with Escrow
                                   </CText>
                                   <Icon color="success.700" size="md" as={<MaterialCommunityIcons name="lock" />} />
                              </HStack>
                              <CText color="gray.600" variant="body4" mt="5px">
                                   After placing order the seller will notify you soon on the delivery process.
                              </CText>

                         </Box>
                    </ScrollView>
               </View>
               <PaymentOptions data={initPaymentPayload} currency={profile?.data?.data?.currency} show={(showPaymentOptions && !!initPaymentPayload)} onClose={() => setShowPaymentOptions(false)} />
          </>
     )
}