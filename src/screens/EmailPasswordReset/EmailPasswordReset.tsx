import { Pressable } from "react-native";
import SafeScaffold from "../../../components/SafeScaffold";
import { Box, Center, CloseIcon, KeyboardAvoidingView, ScrollView, Spinner } from "native-base";
import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppNavProps } from "../../config/routes.config";
import { Image } from "native-base";
import CText from "../../../components/CText";
import CustomInput, { CustomPasswordInput } from "../../../components/CustomInput";
import AppBtn from "../../../components/AppBtn";
import { useEffect, useState } from "react";
import { EmailResetPasswordFormData } from "../../config/data_types/account_types";
import { createFormErrorObject } from "../../helpers/message.helpers";
import Counter from "../../../components/Counter";
import { APP_COLOR } from './../../config/constants.config';
import { useCompleteEmailPasswordReset, useInitEmailPasswordReset } from "../../api/queries/account.queries";
import { getProperKeyboardAvoidingArea } from "../../helpers/platform.helpers";

export interface EmailPasswordResetParams extends RouteProp<ParamListBase> {
    params: {
        email: string
    }
}

export default function EmailPasswordReset() {
    const navigation = useNavigation<AppNavProps>();
    const route = useRoute<EmailPasswordResetParams>();
    const [formState, setFormState] = useState({} as EmailResetPasswordFormData);
    const [errors, setErrors] = useState(createFormErrorObject(formState));
    const counterDuration = 60;
    const [counter, setCounter] = useState(counterDuration);
    const completeResetHandler = useCompleteEmailPasswordReset({
        onError: (data) => {
            toast.show(data?.message, { type: "danger" });
            setErrors(data?.data);
        },
        onSuccess: (data) => {
            toast.show(data?.message, { type: "success" });
            navigation.pop();
        }
    })
    const resendInit = useInitEmailPasswordReset({
        onSuccess(data) {
            toast.show(data?.message, { type: "success" });
            setCounter(counterDuration)
        },
        onError: (data) => { toast.show(data?.message, { type: "danger" }) }
    });
    useEffect(() => {
        const email = route?.params?.email;
        if (!!email) {
            setFormState({ ...formState, email })
        }
    }, [route?.params?.email])

    return (<><SafeScaffold>
        {
            (navigation.canGoBack()) ?
                <Pressable style={{ paddingHorizontal: 20, paddingTop: 20 }} onPress={() => navigation.goBack()}>
                    <CloseIcon />
                </Pressable>
                : <></>
        }
        <KeyboardAvoidingView flex={1} behavior={getProperKeyboardAvoidingArea()}>
            <ScrollView flex={1}>
                <Center flex={1} mt="70px" px={"20px"} >

                    <Image alt={"App Logo"} size="md" source={require("../../../assets/launcher_icon.png")} />
                    <CText variant="heading">Reset Password</CText>
                    <CText variant="body2" textAlign={"center"} mb="5px" px="20px" color="gray.500">Reset your password with the reset token sent to {route?.params?.email ?? "your email"}</CText>
                    <CustomInput my="8px"
                        suffix={<Box paddingLeft={"10px"} borderLeftWidth={1} borderLeftColor={"gray.300"}>
                            {
                                (resendInit.isLoading) ?
                                    <Spinner size="sm" color={APP_COLOR} /> :
                                    <Counter
                                        duration={counter}
                                        renderActionLabel={() => <CText onPress={() => resendInit.mutate(formState.email)} color={APP_COLOR}>Resend Token</CText>}
                                        renderPendingLabel={(duration) => <CText color="gray.400">Resend in {duration}s</CText>}
                                    />
                            }

                        </Box>}
                        value={formState.token} onChangeText={(token) => setFormState({ ...formState, token })} error={errors.token} keyboardType="number-pad" labelText="Token" placeholder="Enter reset token" />
                    <CustomPasswordInput labelText="New Password" my="8px" onChangeText={(new_password) => setFormState({ ...formState, new_password })} value={formState.new_password} error={errors.new_password} placeholder="Enter new password" />
                    <CustomPasswordInput labelText="Confirm Password" my="8px" onChangeText={(confirm_password) => setFormState({ ...formState, confirm_password })} value={formState.confirm_password} error={errors.confirm_password} placeholder="Enter password confirmation" />

                    <Box width={"full"} my="30px">
                        <AppBtn isLoading={completeResetHandler.isLoading} onPress={() => completeResetHandler.mutate(formState)} gradient={true}>
                            Reset Password
                        </AppBtn>
                    </Box>
                </Center>
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeScaffold>

    </>)
}