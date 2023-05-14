import { View } from "native-base";
import AppBar from "../../../../components/AppBar";
import SafeScaffold from "../../../../components/SafeScaffold";
import { XPADDING } from "../../../config/constants.config";
import ShippingLocationForm from "./fragments/ShippingLocationForm";
import { ShippingGroup, ShippingLocationFormData } from "../../../config/data_types/shipping_types";
import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ShippingQueryKeys, useCreateShippingLocation } from "../../../api/queries/shipping.queries";
import { errorMessage, successMessage } from "../../../helpers/message.helpers";
import { useQueryClient } from "react-query";
import { AppNavProps } from "../../../config/routes.config";

interface RouteParams extends RouteProp<ParamListBase>{
    params: {
        group: ShippingGroup<string>
    }
}

export default function CreateShippingLocation(){
    const route = useRoute<RouteParams>();
    const queryClient = useQueryClient();
    const navigation = useNavigation<AppNavProps>();
    const {isLoading,mutate} = useCreateShippingLocation({
        onSuccess(data) {
            successMessage(data?.message);
            queryClient.invalidateQueries({queryKey: [ShippingQueryKeys.fetchShippingLocations]})
            navigation.pop();
        },
    })
    const onCreateLocation = (data:ShippingLocationFormData, setErrors: (e:any) => void) => {
        mutate(data,{
            onError(data){
                errorMessage(data?.message);
                setErrors(data?.data)
            }
        })
    }
    return (
        <SafeScaffold>
            <AppBar title="New Shipping Location" subtitle={`For ${route.params?.group?.group_name ?? "Shipping Group"}`} />
            <View flex={1} px={XPADDING} pt="15px">
                <ShippingLocationForm shipping_group_id={route.params?.group?.id} isLoading={isLoading} handleSubmit={onCreateLocation} />
            </View>
        </SafeScaffold>
    )
}