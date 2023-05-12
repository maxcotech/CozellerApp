import { Actionsheet, Circle, HStack, Icon, Spinner, VStack, useClipboard } from "native-base";
import { StaffToken } from "../../../../config/data_types/staff_token.types";
import { APP_COLOR_LIGHTER } from "../../../../config/constants.config";
import { useMemo, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import CText from "../../../../../components/CText";
import AppBtn from "../../../../../components/AppBtn";
import { successMessage } from "../../../../helpers/message.helpers";
import { ManageResourceActions } from "../../../../config/enum.config";
import { StaffTokenQueryKeys, useDeleteToken, useToggleTokenExpiry } from "../../../../api/queries/staff_token.queries";
import { useQueryClient } from "react-query";
import ConfirmDialog from "../../../../../components/ConfirmDialog";
import { APP_COLOR } from './../../../../config/constants.config';



export default function StaffTokenItem({data}:{data: StaffToken}){

    const isExpired = useMemo(() => {
        return (data?.expired === 1)? true : false
    },[data?.expired])
    const [showDelete,setShowDelete] = useState(false);
    const [moreOptions,setMoreOptions] = useState(false);
    const queryClient = useQueryClient();
    const clipboard = useClipboard();
    const onCopy = async () => {
        await clipboard.onCopy(data?.staff_token);
        successMessage('Token copied to clipboard')
    }
    const toggleExpiry = useToggleTokenExpiry({
        onSuccess: (data) => {
            successMessage(data?.message);
            queryClient.invalidateQueries({queryKey: [StaffTokenQueryKeys.fetchStaffTokens]})
        }
    })

    const deleteToken = useDeleteToken({
        onSuccess: (data) => {
            setShowDelete(false);
            successMessage(data?.message);
            queryClient.invalidateQueries({queryKey: [StaffTokenQueryKeys.fetchStaffTokens]})
        }
    })

    const onSelectOption = (option: ManageResourceActions) => {
        setMoreOptions(false);
        if(option === ManageResourceActions.Update){
            toggleExpiry.mutate(data?.id);
        }
        if(option === ManageResourceActions.Delete){
            deleteToken.mutate(data?.id)
        }
    }
    return (
        <>
       <HStack alignItems="center" width="full" space={2} py="10px" borderBottomColor={"gray.200"} borderBottomWidth={1}>
            {
                (toggleExpiry.isLoading || deleteToken.isLoading)?
                <Spinner color={APP_COLOR} size="lg" />:
                <Circle bgColor={(isExpired)? "danger.100" : "success.100"} size="sm">
                    <Icon color={(isExpired)? "danger.400":"success.400"} size="md" as={<AntDesign name={(isExpired)? "closecircleo":"checkcircleo"} />} />
                </Circle>
            }
            
            <VStack flex={1}>
                <CText numberOfLines={1}>{data?.staff_token}</CText>
                <CText variant="body4" color="gray.400">STAFF TYPE: <CText variant="body3" color="gray.500"> {data?.staff_type_text}</CText></CText>
                <CText variant="body4" color="gray.400">CREATED: <CText variant="body3" color="gray.500"> {data?.created_at}</CText></CText>
                <HStack mt="10px" space={1}>
                    <AppBtn onPress={() => setMoreOptions(true)} textColor={"black"} backgroundColor={APP_COLOR_LIGHTER} borderRadius={5} paddingX={18} paddingY={4} textVariant="body4">More Options</AppBtn>
                    <AppBtn onPress={onCopy} borderRadius={5} paddingX={18} paddingY={4} textVariant="body4" gradient={true}>Copy Token</AppBtn>
                </HStack>
            </VStack>
       </HStack>
       <Actionsheet isOpen={moreOptions} onClose={() => setMoreOptions(false)}>
            <Actionsheet.Content>
                <CText numberOfLines={1}>Manage {data?.staff_token}</CText>
                <Actionsheet.Item onPress={() => onSelectOption(ManageResourceActions.Update)}>
                    <HStack width="full"  alignItems="center" space="2">
                        <Icon size="md" as={<AntDesign name={(isExpired)? "checkcircleo":"closecircleo"} />} />
                        <CText>{(isExpired)? "Reactivate Token":"Expire Token"}</CText>
                        <Icon ml="auto" size="md" as={<AntDesign name="arrowright" />} />
                    </HStack>
                </Actionsheet.Item>
                <Actionsheet.Item onPress={() => onSelectOption(ManageResourceActions.Delete)}>
                    <HStack  width="full"  alignItems="center" space="2">
                        <Icon size="md" color="danger.400" as={<AntDesign name={"delete"} />} />
                        <CText color="danger.400">Delete Token</CText>
                        <Icon color="danger.400" ml="auto" size="md" as={<AntDesign name="arrowright" />} />
                    </HStack>
                </Actionsheet.Item>
            </Actionsheet.Content>
       </Actionsheet>
       <ConfirmDialog isLoading={deleteToken.isLoading} onConfirm={() => true} message="This token will be permanently deleted and removed from records." isOpen={showDelete} onClose={() => setShowDelete(false)} />
       </>
    )
}