import { View } from "native-base";
import AppBar from "../../../components/AppBar";
import { APP_COLOR, XPADDING } from "../../config/constants.config";
import BillingAddressForm from "./fragments/BillingAddressForm";
import { BillingAddressKeys, useCreateBillingAddress } from "../../api/queries/billing.queries";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../config/routes.config";
import { useQueryClient } from "react-query";
import { PaymentQueryKeys } from "../../api/queries/payment.queries";
import SafeScaffold from "../../../components/SafeScaffold";


export default function CreateBillingAddress() {
     const navigation = useNavigation<AppNavProps>();
     const queryClient = useQueryClient();
     const { isLoading, mutate } = useCreateBillingAddress({
          onSuccess(data) {
               toast.show(data?.message, { type: "success" });
               queryClient.invalidateQueries({ queryKey: [BillingAddressKeys.fetchBillingAddresses] });
               queryClient.invalidateQueries({ queryKey: [PaymentQueryKeys.fetchCheckout] });

               navigation.replace(routes.customerBillingAddresses)
          }

     })
     const onCreateAddress = (formState, setErrors) => {
          mutate(formState, {
               onError: (data) => {
                    setErrors(data?.data)
               }
          })
     }
     return (
          <SafeScaffold>
          <View flex={1} backgroundColor={"white"}>
               <AppBar textColor={"white"} title="Add Billing Address" backgroundColor={APP_COLOR} />
               <View flex={1} pt="10px" paddingX={XPADDING}>
                    <BillingAddressForm isLoading={isLoading} handleSubmit={onCreateAddress} />
               </View>
          </View>
          </SafeScaffold>
     )
}