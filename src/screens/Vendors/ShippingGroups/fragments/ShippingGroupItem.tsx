import { TouchableOpacity } from "react-native";
import { ShippingGroup } from "../../../../config/data_types/shipping_types";
import { Actionsheet, Box, Circle, HStack, Icon, Spinner, VStack } from "native-base";
import { APP_COLOR, APP_COLOR_LIGHT, APP_COLOR_LIGHTER, XPADDING } from "../../../../config/constants.config";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import CText from "../../../../../components/CText";
import Money from "../../../../../components/Money";
import { useState } from "react";
import ActionSheetOption from "../../../../../components/ActionSheetOption";
import { ManageResourceActions } from "../../../../config/enum.config";
import ConfirmDialog from "../../../../../components/ConfirmDialog";
import { ShippingQueryKeys, useDeleteShippingGroups } from "../../../../api/queries/shipping.queries";
import { useQueryClient } from "react-query";
import { successMessage } from "../../../../helpers/message.helpers";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../../config/routes.config";
import AppBtn from "../../../../../components/AppBtn";

export const DataRow = ({title,value}) => {
    return (
        
            <HStack alignItems={"center"} space={2} py={"10px"}  alignSelf={"stretch"}>
                <Box width="40%">
                    <CText color="gray.400" variant="body3" textAlign={"right"}>{title}:</CText>
                </Box>
                <Box flex={1}>
                    <CText>{value}</CText>
                </Box>
            </HStack>
        
    )
}

export default function ShippingGroupItem({data}:{data:ShippingGroup<string>}) {
    const [showMore,setShowMore] = useState(false);
    const queryClient = useQueryClient();
    const [showDelete,setShowDelete] = useState(false);
    const navigation = useNavigation<AppNavProps>();
    const onSelectOption = (option: ManageResourceActions) => {
        setShowMore(false);
        switch(option){
            case ManageResourceActions.Delete: {
                setShowDelete(true);
            };break;
            case ManageResourceActions.Update: {
                navigation.navigate(routes.updateShippingGroup,{group: data})
            };break;
            case ManageResourceActions.ManageSubResource: {
                navigation.navigate(routes.shippingLocations,{group: data})
            }
        }
    }

    const deleteQuery = useDeleteShippingGroups({
        onSuccess: (data) => {
            successMessage(data?.message);
            queryClient.invalidateQueries({queryKey:[ShippingQueryKeys.fetchShippingGroups]})
        }
    });

    const onConfirmDelete = () => {
        setShowDelete(false)
        deleteQuery.mutate({
            store_id: data.store_id,
            id: data.id
        })
    }
    return (
        <>
        <TouchableOpacity onPress={() => setShowMore(true)}>
            <HStack alignItems={"center"} space={2} borderBottomColor={"gray.100"} borderBottomWidth={1} px={XPADDING} py="10px" my="6px">
                {
                    (deleteQuery.isLoading)?
                    <Spinner color={APP_COLOR} size="lg" />:
                    <Circle backgroundColor={"blue.100"} size="sm">
                        <Icon color="blue.500" size="md" as={<MaterialIcons name="location-on" />} />
                    </Circle>
                }
               
                <VStack flex={1}>
                    <CText numberOfLines={1}>{data.group_name}</CText>
                    <CText color={APP_COLOR_LIGHT} variant="body4">SHIPPING RATE: <Money variant="body3">{data?.shipping_rate}</Money></CText>
                    <CText color={APP_COLOR_LIGHT} variant="body4">DELIVERY DURATION: <CText variant="body3">{data?.delivery_duration ?? 0} days</CText></CText>
                    <HStack mt="10px" mb="10px">
                        <AppBtn textColor="rgba(0,0,255,1)" backgroundColor={"rgba(0,0,255,0.1)"} onPress={() => {
                            onSelectOption(ManageResourceActions.ManageSubResource);
                        }}  textVariant="body4" paddingY={7}>Manage Locations</AppBtn>
                    </HStack>
                </VStack>
                <Icon size="md" as={<MaterialIcons name="more-vert" />} />
            </HStack>
            
        </TouchableOpacity>
        <Actionsheet isOpen={showMore} onClose={() => setShowMore(false)}>
            <Actionsheet.Content>
                <CText variant="body1" mb="10px">{data.group_name}</CText>
                <Box mb="10px" mx="15px" alignSelf={"stretch"} rounded="lg" p="10px" borderWidth={1} borderColor="gray.200">
                <DataRow title="HIGH VALUE RATE" value={<Money>{data.high_value_rate}</Money>} />
                <DataRow title="MID VALUE RATE" value={<Money>{data.mid_value_rate}</Money>} />
                <DataRow title="LOW VALUE RATE" value={<Money>{data.low_value_rate}</Money>} />
                <DataRow title="SHIPPING RATE" value={<Money>{data.shipping_rate}</Money>} />
                <DataRow title="DOOR DELIVERY RATE" value={<Money>{data.door_delivery_rate}</Money>} />
                <DataRow title="DELIVERY DURATION" value={data.shipping_rate+" days"} />
                </Box>
                <ActionSheetOption icon={<AntDesign name="folderopen" />} onPress={() => onSelectOption(ManageResourceActions.ManageSubResource)} title="Manage Locations" />
                <ActionSheetOption icon={<AntDesign name="edit" />} onPress={() => onSelectOption(ManageResourceActions.Update)} title="Update Group" />
                <ActionSheetOption isLoading={deleteQuery.isLoading} dangerMode={true} icon={<AntDesign name="delete" />} onPress={() => onSelectOption(ManageResourceActions.Delete)} title="Delete Group" />
            </Actionsheet.Content>
        </Actionsheet>
        <ConfirmDialog  onConfirm={onConfirmDelete} onClose={() => setShowDelete(false)} isOpen={showDelete} message="This group will be permanently deleted" />
        </>
    )
}
