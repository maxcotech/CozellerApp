import { View } from "native-base";
import AppBar from "../../../components/AppBar";
import { APP_COLOR, XPADDING } from './../../config/constants.config';
import BillingAddressForm from "./fragments/BillingAddressForm";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppRouteProp } from "../../config/data_types/general.types";
import { BillingAddress } from "../../config/data_types/billing_address.types";
import { BillingAddressKeys, useUpdateBillingAddress } from "../../api/queries/billing.queries";
import { useQueryClient } from "react-query";
import routes, { AppNavProps } from "../../config/routes.config";

export interface UpdateBillingAddressProps extends AppRouteProp {
     params: {
          defaultData: BillingAddress
     }
}

export default function UpdateBillingAddress() {
     const route = useRoute<UpdateBillingAddressProps>();
     const queryClient = useQueryClient();
     const navigation = useNavigation<AppNavProps>();
     const { mutate, isLoading } = useUpdateBillingAddress({
          onSuccess(data) {
               toast.show(data?.message, { type: "success" })
               queryClient.invalidateQueries({ queryKey: [BillingAddressKeys.fetchBillingAddresses] })
               navigation.replace(routes.customerBillingAddresses);
          },
     });
     const onUpdateAddress = (formState: any, setErrors: (errors: any) => void) => {
          mutate(formState, {
               onError(data) {
                    setErrors(data?.data)
               }
          })
     }
     return (
          <View backgroundColor={"white"} flex={1}>
               <AppBar title="Update Billing Address" backgroundColor={APP_COLOR} textColor="white" />
               <View flex={1} paddingX={XPADDING} paddingTop={"15px"}>
                    <BillingAddressForm isLoading={isLoading} handleSubmit={onUpdateAddress} defaultData={route?.params?.defaultData} />
               </View>
          </View>
     )
}