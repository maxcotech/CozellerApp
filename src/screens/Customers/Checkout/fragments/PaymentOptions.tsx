import { Box, Image, Spinner, VStack } from "native-base";
import { Actionsheet, Circle } from "native-base";
import CText from "../../../../../components/CText";
import { FW_REDIRECT_URL, XPADDING } from "../../../../config/constants.config";
import { Currency } from "../../../../config/data_types/currency_types";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../../config/routes.config";
import { InitPaymentPayload } from "../../../../config/data_types/payment_types";
import { RedirectParams } from "flutterwave-react-native/dist/PayWithFlutterwave";
import FlutterwaveInit from "flutterwave-react-native/dist/FlutterwaveInit";
import { ActionResultParams } from "../../../../config/data_types/general.types";
import { useVerifyPayment } from "../../../../api/queries/payment.queries";
import { PaymentOptionTypes } from "../../../../config/enum.config";
import { useState } from 'react';

export default function PaymentOptions({ show, onClose, currency, data }: { show: boolean, onClose: () => void, currency: Currency, data: InitPaymentPayload }) {
     const [fwInitializing, setFwInitializing] = useState(false);
     const navigation = useNavigation<AppNavProps>();
     const { isLoading, mutate } = useVerifyPayment({
          onError(data) {
               navigation.replace(routes.statusMessage, {
                    title: "Verification Failed",
                    message: data?.message,
                    actionBtnLabel: "Retry Payment",
                    status: "failed",
                    nextRoute: routes.customerCheckout
               } as ActionResultParams)
          },
          onSuccess: (data) => {
               navigation.navigate(routes.statusMessage, {
                    title: "Payment Successful",
                    message: data?.message ?? "Payment has been processed successfully.",
                    status: "success",
                    actionBtnLabel: "View my orders",
                    nextRoute: routes.customerOrders
               } as ActionResultParams)
          }
     })
     const flutterwaveConfig = {
          tx_ref: data?.reference,
          amount: data?.total_payment,
          redirect_url: FW_REDIRECT_URL,
          currency: currency?.currency_code as "NGN" | "GHS" | "USD",
          authorization: data?.flutterwave_public_key,
          payment_options: "card",
          customer: {
               email: data?.customer_details?.email,
               name: data?.customer_details?.first_name + " " + data?.customer_details?.last_name
          }
     }

     const handleFwRedirect = (result: RedirectParams, url?: string) => {
          console.log(result);
          if (result.status === "successful") {
               mutate({
                    gateway_code: PaymentOptionTypes.Flutterwave,
                    gateway_reference: result?.tx_ref,
                    transaction_id: result?.transaction_id,
                    site_reference: data?.reference
               })

          }
          else if (result.status === "cancelled") {
               navigation.navigate(routes.statusMessage, {
                    title: "Payment Failed",
                    status: "failed",
                    actionBtnLabel: "back to checkout",
                    nextRoute: routes.customerCheckout,
                    message: "Failed to complete your payment, please try again"
               } as ActionResultParams)
          }
     }

     const initFlutterwavePayment = async () => {
          try {
               setFwInitializing(true)
               const paymentLink = await FlutterwaveInit(flutterwaveConfig);
               setFwInitializing(false);
               onClose();
               navigation.navigate(routes.FlutterWaveRoute, { paymentUrl: paymentLink, onComplete: handleFwRedirect });
          }
          catch (e) {
               if ("code" in e) {
                    return false;
               }
               toast.show(e.message, { type: "danger" })
          }
     }





     return (
          <>
               <Actionsheet isOpen={show} onClose={onClose}>
                    <Actionsheet.Content>
                         <CText>Select payment option</CText>

                         <Actionsheet.Item
                              rightIcon={
                                   (fwInitializing) ? <Spinner size="sm" /> : <></>
                              }
                              onPress={() => {
                                   initFlutterwavePayment();
                              }}
                              leftIcon={
                                   <Circle overflow={"hidden"}>
                                        <Image width="50px" height="50px" source={require("../../../../../assets/flutterwave-logo.png")} />
                                   </Circle>
                              }

                         >

                              <VStack flex={1} justifyContent={"center"}>
                                   <CText variant="body1">Pay with Flutterwave</CText>
                              </VStack>
                         </Actionsheet.Item>
                         {
                              (currency?.currency_code !== "NGN") ? <></> :
                                   <Actionsheet.Item onPress={() => {
                                        onClose();
                                        navigation.navigate(routes.PaystackRoute, data);
                                   }} justifyContent={"center"} leftIcon={
                                        <Circle overflow={"hidden"}>
                                             <Image width="50px" height="50px" source={require("../../../../../assets/paystack-logo.webp")} />
                                        </Circle>
                                   }>
                                        <VStack flex={1} justifyContent={"center"}>
                                             <CText variant="body1">Pay with Paystack</CText>
                                        </VStack>

                                   </Actionsheet.Item>

                         }

                         <Box marginTop="20px" paddingX={XPADDING}>
                              <Image opacity={0.5} source={require("../../../../../assets/debit-cards.png")} height="30px" />

                         </Box>
                    </Actionsheet.Content>
               </Actionsheet>
          </>
     )
}