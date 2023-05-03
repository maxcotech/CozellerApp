import { Box, ScrollView, View } from "native-base";
import AppBar from "../../../components/AppBar";
import SafeScaffold from "../../../components/SafeScaffold";
import { XPADDING } from "../../config/constants.config";
import AppBtn from "../../../components/AppBtn";
import CustomInput, { CustomPasswordInput } from "../../../components/CustomInput";
import { useState } from "react";
import { PasswordFormData } from "../../config/data_types/account_types";
import { createFormErrorObject } from "../../helpers/message.helpers";
import { useUpdatePassword } from "../../api/queries/account.queries";

export default function ChangePassword(){
    const [formState,setFormState] = useState({
        new_password:"",
        old_password:"",
        confirm_password:""
    } as PasswordFormData);
    const [errors,setErrors] = useState(createFormErrorObject(formState));
    const {mutate,isLoading} = useUpdatePassword({
        onError: (data) => {
            setErrors(data?.data);
        },
        onSuccess: (data) => {
            toast.show(data?.message, {type:"success"});
            setFormState({} as PasswordFormData);
            setErrors({});
        }

    })

    return (
        <SafeScaffold>
            <AppBar title="Update Password" />
            <View flex={1} pt="10px" px={XPADDING}>
                <ScrollView flex={1}>
                    <CustomPasswordInput error={errors.old_password} value={formState.old_password} onChangeText={(old_password) => setFormState({...formState,old_password})}  my="8px" placeholder="Enter Current Password" labelText="Current Pasword" />
                    <CustomPasswordInput value={formState.new_password} error={errors.new_password} onChangeText={(new_password) => setFormState({...formState,new_password})} my="8px" placeholder="Enter New Password" labelText="New Pasword" />
                    <CustomPasswordInput onChangeText={(confirm_password) => setFormState({...formState,confirm_password})} value={formState.confirm_password} error={errors.confirm_password} my="8px" placeholder="Re-enter New Password" labelText="Confirm Pasword" />
                </ScrollView>
                <Box my="10px">
                    <AppBtn gradient={true} isLoading={isLoading} onPress={() => mutate(formState)}>CHANGE PASSWORD</AppBtn>
                </Box>
            </View>
        </SafeScaffold>
    )
}