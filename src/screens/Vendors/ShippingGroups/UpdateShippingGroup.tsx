import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import SafeScaffold from "../../../../components/SafeScaffold";
import { ShippingGroup, ShippingGroupFormData } from "../../../config/data_types/shipping_types";
import { AppNavProps } from "../../../config/routes.config";
import ShippingGroupForm from "./fragments/ShippingGroupForm";
import { useUpdateShippingGroup } from "../../../api/queries/shipping.queries";
import { errorMessage, successMessage } from "../../../helpers/message.helpers";
import { useQueryClient } from "react-query";
import { ShippingQueryKeys } from './../../../api/queries/shipping.queries';
import AppBar from "../../../../components/AppBar";
import { View } from "native-base";
import { XPADDING } from "../../../config/constants.config";

interface RouteParams extends RouteProp<ParamListBase> {
    params: {group: ShippingGroup<string>}
}

export default function UpdateShippingGroup(){
    const route = useRoute<RouteParams>();
    const navigation = useNavigation<AppNavProps>();
    const queryClient = useQueryClient();
    const updateHandle = useUpdateShippingGroup({
        onSuccess: (data) => {
            successMessage(data?.message);
            queryClient.invalidateQueries({queryKey:[ShippingQueryKeys.fetchShippingGroups]});
            navigation.pop();
        }
    })
    const onSubmit = (data:ShippingGroupFormData,setErrors:(e:any) => void) => {
        updateHandle.mutate(data,{
            onError: (e) => {
                errorMessage(e?.message);
                setErrors(e?.data);
            }
        });
    }
    return (
        <SafeScaffold>
            <AppBar title="Update Shipping Group" />
            <View flex={1} px={XPADDING} pt="15px">
                <ShippingGroupForm isLoading={updateHandle.isLoading} handleSubmit={onSubmit} defaultData={route?.params?.group} />
            </View>
        </SafeScaffold>
    )
}