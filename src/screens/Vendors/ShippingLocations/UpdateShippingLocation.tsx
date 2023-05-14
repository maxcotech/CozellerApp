import { View } from "native-base";
import AppBar from "../../../../components/AppBar";
import SafeScaffold from "../../../../components/SafeScaffold";
import { XPADDING } from "../../../config/constants.config";
import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ShippingGroup, ShippingLocation, ShippingLocationFormData } from "../../../config/data_types/shipping_types";
import { useQueryClient } from "react-query";
import { AppNavProps } from "../../../config/routes.config";
import { ShippingQueryKeys, useUpdateShippingLocation } from "../../../api/queries/shipping.queries";
import { errorMessage, successMessage } from "../../../helpers/message.helpers";
import ShippingLocationForm from "./fragments/ShippingLocationForm";

interface RouteParams extends RouteProp<ParamListBase>{
    params: {
        group: ShippingGroup<string>,
        location: ShippingLocation
    }
}

export default function UpdateShippingLocation(){
    const route = useRoute<RouteParams>();
    const queryClient = useQueryClient();
    const navigation = useNavigation<AppNavProps>();
    const {isLoading,mutate} = useUpdateShippingLocation({
        onSuccess(data) {
            successMessage(data?.message);
            queryClient.invalidateQueries({queryKey: [ShippingQueryKeys.fetchShippingLocations]})
            navigation.pop();
        },
    })
    const onUpdateLocation = (data:ShippingLocationFormData, setErrors: (e:any) => void) => {
        mutate(data,{
            onError(data){
                errorMessage(data?.message);
                setErrors(data?.data)
            }
        })
    }
    return (
        <SafeScaffold>
            <AppBar title="Edit Shipping Location" subtitle={`For ${route.params?.group?.group_name ?? "Shipping Group"}`} />
            <View flex={1} px={XPADDING} pt="15px">
                <ShippingLocationForm defaultData={route?.params?.location} shipping_group_id={route.params?.group?.id} isLoading={isLoading} handleSubmit={onUpdateLocation} />
            </View>
        </SafeScaffold>
    )
}