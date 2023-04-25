import { Box, HStack, ScrollView } from "native-base";
import CustomInput from "../../../../../components/CustomInput";
import { useState } from "react";
import { Store } from "../../../../config/data_types/store_types";
import CText from "../../../../../components/CText";
import { createFormErrorObject } from "../../../../helpers/message.helpers";

export interface StoreFormProps {
    defaultData?: Partial<Store>
}

export default function StoreForm({defaultData}: StoreFormProps){
    const [formState, setFormState] = useState({
        store_name: defaultData?.store_name ?? "",
        store_address: defaultData?.store_address ?? "",
        store_email: defaultData?.store_email ?? "",
        store_telephone: defaultData?.store_telephone ?? "",
    })
    const [errors,setErrors] = useState(createFormErrorObject(formState))

    const setFormValue = (val: any ,key: keyof typeof formState) => {
        setFormState({
            ...formState, [key]: val
        })
    }
    return (
        <ScrollView contentContainerStyle={{paddingHorizontal:20, paddingVertical: 20}} flex={1}>
            <Box >
                <CText variant="body1" fontWeight="bold">Business ID And Contact</CText>
                <CText color="gray.400" >fill in details that will enable us and customers to identify and contact your business and brand by extension. </CText>
            </Box>
            <CustomInput error={errors.store_name} onChangeText={(val) => setFormValue(val,"store_name")} value={formState.store_name} placeholder="Enter Store Name" labelText="Store Name*" my={"8px"} />
            <CustomInput error={errors.store_email} onChangeText={(val) => setFormValue(val,"store_email")} value={formState.store_email} keyboardType="email-address" placeholder="Enter Store Email (Optional)" labelText="Store Email" my={"8px"} />
            <CustomInput error={errors.store_telephone} onChangeText={(val) => setFormValue(val,"store_telephone")} value={formState.store_telephone} keyboardType="phone-pad" placeholder="Enter Store Telephone (Optional)" labelText="Store Telephone" my={"8px"} />
            <HStack my="8px">

            </HStack>

        </ScrollView>
    )
}