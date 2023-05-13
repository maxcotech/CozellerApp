import { View } from "native-base";
import AppBar from "../../../../components/AppBar";
import SafeScaffold from "../../../../components/SafeScaffold";
import { XPADDING } from "../../../config/constants.config";
import ShippingGroupForm from "./fragments/ShippingGroupForm";
import { ShippingGroupFormData } from "../../../config/data_types/shipping_types";
import { ShippingQueryKeys, useCreateShippingGroup } from "../../../api/queries/shipping.queries";
import { errorMessage, successMessage } from "../../../helpers/message.helpers";
import { useNavigation } from "@react-navigation/native";
import { AppNavProps } from "../../../config/routes.config";
import { useQueryClient } from "react-query";

export default function CreateShippingGroup(){
    const navigation = useNavigation<AppNavProps>();
    const queryClient = useQueryClient();
    const createHandler = useCreateShippingGroup({
        onSuccess: (data) => {
            successMessage(data?.message);
            queryClient.invalidateQueries({queryKey: [ShippingQueryKeys.fetchShippingGroups]});
            navigation.pop();
        }
    })
    const onCreateGroup = (data: ShippingGroupFormData, setErrors: (errors: any) => void) => {
        createHandler.mutate(data,{
            onError: (data) => {
                errorMessage(data?.message);
                setErrors(data?.data)
            }
        } )
    }
    return (
        <SafeScaffold>
            <AppBar title="New Shipping Group" />
            <View pt="15px" px={XPADDING} flex={1}>
                <ShippingGroupForm isLoading={createHandler.isLoading} handleSubmit={onCreateGroup} />
            </View>
        </SafeScaffold>
    )
}