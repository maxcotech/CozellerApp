import { Box, HStack, KeyboardAvoidingView, ScrollView, View } from "native-base";
import { DimensionRangeRates, ShippingGroup, ShippingGroupFormData } from "../../../../config/data_types/shipping_types";
import { useContext, useState } from "react";
import AppContext from "../../../../contexts/AppContext";
import CustomInput from "../../../../../components/CustomInput";
import { createFormErrorObject } from "../../../../helpers/message.helpers";
import CText from "../../../../../components/CText";
import { decode } from "html-entities";
import AppBtn from "../../../../../components/AppBtn";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../../config/routes.config";

export default function ShippingGroupForm({ defaultData, handleSubmit, isLoading }: { isLoading: boolean, defaultData?: ShippingGroup<string>, handleSubmit: (data: ShippingGroupFormData, setErrors: (errors: any) => void) => void }) {
    const appContext = useContext(AppContext);
    const navigation = useNavigation<AppNavProps>();
    const currency = appContext?.profileData?.currency;
    const [formState, setFormState] = useState({
        store_id: appContext?.profileData?.current_store?.id,
        delivery_duration: defaultData?.delivery_duration,
        dimension_range_rates: defaultData?.dimension_range_rates,
        door_delivery_rate: defaultData?.door_delivery_rate,
        group_name: defaultData?.group_name ?? "",
        high_value_rate: defaultData?.high_value_rate,
        low_value_rate: defaultData?.low_value_rate,
        mid_value_rate: defaultData?.mid_value_rate,
        shipping_rate: defaultData?.shipping_rate,
        id: defaultData?.id
    } as ShippingGroupFormData)
    const [errors, setErrors] = useState(createFormErrorObject(formState));
    const setFormValue = (val: any, key: keyof ShippingGroupFormData) => {
        setFormState({ ...formState, [key]: val })
    }

    return (
        <View flex={1}>
            <KeyboardAvoidingView flex={1} behavior="padding">
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }} flex={1}>
                    <Box>
                        <CText fontWeight={"bold"}>Basic Information</CText>
                        <HStack width="full">
                            <CText variant="body3" color="gray.400" flex={1}>
                                Fill in basic information which will enable a proper identification of your shipping group.
                            </CText>
                        </HStack>

                    </Box>
                    <Box my="8px">
                        <CText mb="1px" variant="body2" color="gray.500">Dimension Ranges</CText>
                        <HStack space={1} >
                            <CText flex={1.5} color="gray.400" variant="body3">Manage rates based on product/package dimensions and weight</CText>
                            <Box flex={1}>
                                <AppBtn onPress={() => navigation.navigate(routes.shippingDimensionRange, {
                                    defaultData: formState.dimension_range_rates,
                                    onApply: (data: DimensionRangeRates) => setFormValue(JSON.stringify(data ?? []), "dimension_range_rates")
                                })} paddingX={2} textVariant="body4" gradient={true}>Dimension Ranges</AppBtn>
                            </Box>
                        </HStack>
                    </Box>
                    <CustomInput my="8px" error={errors?.group_name} onChangeText={(val) => setFormValue(val, "group_name")} value={formState.group_name} labelText="Shipping Group Name*" placeholder="Enter shipping group name" />
                    <CustomInput prefix={<CText color="gray.400">{decode(currency?.currency_sym)}</CText>} keyboardType="number-pad" my="8px" error={errors?.shipping_rate} onChangeText={(val) => setFormValue(val, "shipping_rate")} value={formState.shipping_rate?.toString()} labelText="Shipping Rate*" placeholder="Enter shipping Rate" />
                    <CustomInput keyboardType="number-pad" my="8px" error={errors?.delivery_duration} onChangeText={(val) => setFormValue(val, "delivery_duration")} value={formState.delivery_duration?.toString()} labelText="Delivery Duration*" suffix={<CText color="gray.400">Days</CText>} placeholder="Enter Delivery Duration (in days)" />


                    <Box mt="15px">
                        <CText fontWeight={"bold"}>Additional Fees</CText>
                        <CText variant="body3" color="gray.400">
                            Fees set in subsequent fields will be added to the shipping rate. Hence , the total shipping cost will be equal to sum of all the fees.
                        </CText>
                    </Box>
                    <CustomInput prefix={<CText color="gray.400">{decode(currency?.currency_sym)}</CText>} keyboardType="number-pad" my="8px" error={errors?.high_value_rate} onChangeText={(val) => setFormValue(val, "high_value_rate")} value={formState.high_value_rate?.toString()} labelText="High Value Rate" placeholder="For high-end packages" />
                    <CustomInput prefix={<CText color="gray.400">{decode(currency?.currency_sym)}</CText>} keyboardType="number-pad" my="8px" error={errors?.mid_value_rate} onChangeText={(val) => setFormValue(val, "mid_value_rate")} value={formState.mid_value_rate?.toString()} labelText="Mid Value Rate" placeholder="For medium value packages" />
                    <CustomInput prefix={<CText color="gray.400">{decode(currency?.currency_sym)}</CText>} keyboardType="number-pad" my="8px" error={errors?.low_value_rate} onChangeText={(val) => setFormValue(val, "low_value_rate")} value={formState.low_value_rate?.toString()} labelText="Low Value Rate" placeholder="For low value packages" />
                    <CustomInput prefix={<CText color="gray.400">{decode(currency?.currency_sym)}</CText>} keyboardType="number-pad" my="8px" error={errors?.door_delivery_rate} onChangeText={(val) => setFormValue(val, "door_delivery_rate")} value={formState.door_delivery_rate?.toString()} labelText="Door Delivery Rate" placeholder="Additional fees for door-delivery" />

                </ScrollView>

                <Box mt="10px" mb="10px">
                    <AppBtn isLoading={isLoading} onPress={() => handleSubmit(formState, setErrors)} gradient={true}>SUBMIT</AppBtn>
                </Box>
            </KeyboardAvoidingView>
        </View>
    )
}