import { Actionsheet, Circle, HStack, Icon, Spinner, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { APP_COLOR, APP_COLOR_LIGHT, APP_COLOR_LIGHTER } from "../../../../config/constants.config";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import CText from "../../../../../components/CText";
import { ShippingGroup, ShippingLocation } from "../../../../config/data_types/shipping_types";
import { useState } from "react";
import ActionSheetOption from "../../../../../components/ActionSheetOption";
import { ManageResourceActions } from "../../../../config/enum.config";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../../config/routes.config";
import { ShippingQueryKeys, useDeleteShippingLocations } from "../../../../api/queries/shipping.queries";
import { successMessage } from "../../../../helpers/message.helpers";
import { useQueryClient } from "react-query";
import ConfirmDialog from "../../../../../components/ConfirmDialog";



export default function ShippingLocationItem({data,group}:{data:ShippingLocation,group:ShippingGroup<string>}){
    const [showOptions,setShowOptions] = useState(false);
    const [showDelete,setShowDelete] = useState(false);
    const queryClient = useQueryClient();
    const navigation = useNavigation<AppNavProps>();
    const deleteHandle = useDeleteShippingLocations({
        onSuccess(data){
            successMessage(data?.message);
            queryClient.invalidateQueries({queryKey: [ShippingQueryKeys.fetchShippingLocations]})
        }
    })
    const onSelectOption = (option: ManageResourceActions) => {
        setShowOptions(false);
        switch(option){
            case ManageResourceActions.Update: {
                navigation.navigate(routes.updateShippingLocations,{
                    location: data, group
                })
            };break;
            case ManageResourceActions.Delete: {
                setShowDelete(true);
            }
        }
    }

    const onConfirmDelete = () => {
        setShowDelete(false);
        deleteHandle.mutate({
            store_id: group.store_id,
            location_id: data.id
        })

    }
    return (
        <>
        <TouchableOpacity onPress={() => setShowOptions(true)}>
            <HStack space={1} alignItems={"center"} borderRadius="md" px="15px" py="10px" my="8px" bgColor={APP_COLOR_LIGHTER}>
                {
                    (deleteHandle.isLoading)?
                    <Spinner color={APP_COLOR} size="lg" />:
                    <Circle size="sm" bgColor="blue.100">
                        <Icon color="blue.500" size="md" as={<MaterialIcons name="location-pin" />} />
                    </Circle>
                }
               
                <VStack flex={1}>
                    <CText color={APP_COLOR_LIGHT} variant="body4">COUNTRY: <CText variant="body3">{data?.country?.country_name ?? "Not Specified"}</CText></CText>
                    <CText color={APP_COLOR_LIGHT} variant="body4">STATE: <CText variant="body3">{data?.state?.state_name ?? "All States"}</CText></CText>
                    <CText color={APP_COLOR_LIGHT} variant="body4">CITY / REGION: <CText variant="body3">{data?.city?.city_name ?? "All Cities"}</CText></CText>
                </VStack>
                <Icon size="md" as={<MaterialIcons name="more-vert" />} />
            </HStack>
        </TouchableOpacity>
        <Actionsheet isOpen={showOptions} onClose={() => setShowOptions(false)}>
            <Actionsheet.Content>
                <CText variant="body1">Manage Location</CText>
                <ActionSheetOption icon={<AntDesign name="edit" />} title="Update Location" onPress={() => onSelectOption(ManageResourceActions.Update)} />
                <ActionSheetOption dangerMode={true} icon={<AntDesign name="delete" />} title="Delete Location" onPress={() => onSelectOption(ManageResourceActions.Delete)} />
            </Actionsheet.Content>
        </Actionsheet>
        <ConfirmDialog message="The selected location will be permanently deleted from this group" onConfirm={onConfirmDelete} isOpen={showDelete} onClose={() => setShowDelete(false)} />
        </>
    )
}