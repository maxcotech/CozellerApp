import { useNavigation, useRoute } from "@react-navigation/native";
import SafeScaffold from "../../../../components/SafeScaffold";
import { ActionResultParams, AppRouteProp } from "../../../config/data_types/general.types";
import { InitPaymentPayload } from "../../../config/data_types/payment_types";
import { Paystack } from "react-native-paystack-webview";
import { useMemo } from "react";
import routes, { AppNavProps } from "../../../config/routes.config";
import { useVerifyPayment } from "../../../api/queries/payment.queries";
import { PaymentOptionTypes } from "../../../config/enum.config";
import { Center, Spinner } from "native-base";

export interface PaystackViewParams extends AppRouteProp {
     params: InitPaymentPayload
}
export default function PayWithPaystackView() {

     const route = useRoute<PaystackViewParams>();
     const navigation = useNavigation<AppNavProps>();
     const params = useMemo(() => {
          return route?.params
     }, [route?.params])
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
          onSuccess(data) {
               navigation.replace(routes.statusMessage, {
                    title: "Payment Verified",
                    message: data?.message,
                    actionBtnLabel: "View My Orders",
                    status: "success",
                    nextRoute: routes.customerOrders
               } as ActionResultParams)
          }
     })
     return (
          <SafeScaffold>

               {
                    (isLoading) ?
                         <Center flex={1}>
                              <Spinner size="lg" />
                         </Center> :
                         <Paystack
                              handleWebViewMessage={(msg) => console.log(msg)}
                              channels={["card"]}
                              paystackKey={params?.paystack_public_key}
                              amount={params?.total_payment * 100}
                              billingName={params?.customer_details?.first_name}
                              refNumber={params?.reference}
                              billingEmail={params?.customer_details?.email}
                              activityIndicatorColor="green"
                              onCancel={(e) => {
                                   navigation.replace(routes.statusMessage, {
                                        title: "Payment Cancelled",
                                        message: "The checkout process was interrupted with cancellation of payment.",
                                        actionBtnLabel: "Retry Payment",
                                        status: "failed",
                                        nextRoute: routes.customerCheckout
                                   } as ActionResultParams)
                              }}
                              onSuccess={(res) => {
                                   mutate({
                                        gateway_code: PaymentOptionTypes.Paystack,
                                        gateway_reference: res.transactionRef,
                                        transaction_id: null,
                                        site_reference: params?.reference
                                   })
                              }}
                              autoStart={true}

                         />

               }

          </SafeScaffold>
     )
}