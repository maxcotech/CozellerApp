import { Box, ScrollView, View } from "native-base";
import AppBar from "../../../../components/AppBar";
import SafeScaffold from "../../../../components/SafeScaffold";
import { XPADDING } from "../../../config/constants.config";
import CustomInput from "../../../../components/CustomInput";
import CustomSelect from "../../../../components/CustomSelect";
import { StoreStaffTypes } from "../../../config/enum.config";
import { useContext, useState } from "react";
import { StaffTokenFormData } from "../../../config/data_types/staff_token.types";
import AppContext from "../../../contexts/AppContext";
import { createFormErrorObject, errorMessage, successMessage } from "../../../helpers/message.helpers";
import AppBtn from "../../../../components/AppBtn";
import { StaffTokenQueryKeys, useCreateToken } from "../../../api/queries/staff_token.queries";
import { useQueryClient } from "react-query";
import { useNavigation } from "@react-navigation/native";
import { AppNavProps } from "../../../config/routes.config";

export default function CreateStaffToken(){
    const appContext = useContext(AppContext);
    const navigation = useNavigation<AppNavProps>();
    const [formState,setFormState] = useState({
        store_id: appContext?.profileData?.current_store?.id,
    } as StaffTokenFormData)
    const queryClient = useQueryClient();
    const [errors,setErrors] = useState(createFormErrorObject(formState));
    const createToken = useCreateToken({
        onSuccess: (data) => {
            successMessage(data?.message);
            queryClient.invalidateQueries({queryKey: [StaffTokenQueryKeys.fetchStaffTokens]});
            navigation.pop();
        },
        onError: (data) => {
            errorMessage(data?.message);
            setErrors(data?.data);
        }
    })
    return (
        <SafeScaffold>
            <AppBar subtitle="Create New Access Tokens" title="New Staff Tokens" />
            <View flex={1} pt="15px" px={XPADDING}>
                <ScrollView flex={1}>
                    <CustomSelect labelText="Staff Type" placeholder="Select staff type" error={errors?.staff_type} my="8px" onValueChange={(staff_type) => setFormState({...formState,staff_type})} value={formState.staff_type}  options={
                        [
                            {title: "Store Manager", value: StoreStaffTypes.StoreManager},
                            {title: "Store Worker", value: StoreStaffTypes.StoreWorker}
                        ]
                    } />
                    <CustomInput onChangeText={(amount) => setFormState({...formState,amount})} value={formState?.amount?.toString()} error={errors?.amount} my="8px" labelText="Amount" placeholder="Enter amount of token to generate" keyboardType="number-pad"  />
                    <Box mt="40px">
                        <AppBtn onPress={() => createToken.mutate(formState)} isLoading={createToken.isLoading} gradient={true}>Generate Token</AppBtn>
                    </Box>
                </ScrollView>
               
            </View>
        </SafeScaffold>
    )
}