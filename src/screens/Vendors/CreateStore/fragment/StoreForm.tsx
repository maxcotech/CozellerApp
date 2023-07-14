import { Box, HStack, KeyboardAvoidingView, ScrollView } from "native-base";
import CustomInput from "../../../../../components/CustomInput";
import { useState } from "react";
import { Store } from "../../../../config/data_types/store_types";
import CText from "../../../../../components/CText";
import { createFormErrorObject } from "../../../../helpers/message.helpers";
import FileUploader from "../../../../../components/FileUploader";
import CustomSelect from "../../../../../components/CustomSelect";
import { useCities, useCountries, useStates } from "../../../../api/queries/location.queries";
import AppBtn from "../../../../../components/AppBtn";
import { uploadStoreLogo } from "../../../../api/services/store.services";
import { getProperKeyboardAvoidingArea } from "../../../../helpers/platform.helpers";

export interface StoreFormProps {
    defaultData?: Partial<Store>,
    handleSubmit: (data: object | FormData, setErrors: (errors: any) => void) => void,
    isLoading?: boolean,
    btnLabel?: string
}

export default function StoreForm({ defaultData, handleSubmit, isLoading = false, btnLabel = "Save and Continue" }: StoreFormProps) {
    const [formState, setFormState] = useState({
        store_id: defaultData?.id,
        store_name: defaultData?.store_name ?? "",
        store_address: defaultData?.store_address ?? "",
        store_email: defaultData?.store_email ?? "",
        store_telephone: defaultData?.store_telephone ?? "",
        store_logo: defaultData?.store_logo ?? null,
        country_id: defaultData?.country_id ?? "",
        state: defaultData?.state ?? undefined,
        city: defaultData?.city ?? undefined
    })
    const [errors, setErrors] = useState(createFormErrorObject(formState));
    const countryQuery = useCountries();
    const stateQuery = useStates({ country_id: formState.country_id as number }, { enabled: (!!formState.country_id) })
    const cityQuery = useCities({ state: formState.state, country_id: formState.country_id as number }, {
        enabled: (!!formState.state && !!formState.country_id)
    })
    const setFormValue = (val: any, key: keyof typeof formState) => {
        setFormState({
            ...formState, [key]: val
        })
    }

    const onSubmit = () => {
        const formKeys = Object.keys(formState);
        if (!!handleSubmit === false) return false;
        if (!!formState.store_id === true) {
            console.log(formState);
            handleSubmit({ ...formState, store_logo: undefined }, setErrors)
        } else {
            const formData = new FormData();
            formKeys.map((key) => {
                formData.append(key, formState[key]);
            })
            handleSubmit(formData, setErrors)
        }

    }

    const onUploadLogo = (val: any, iloader: (val: boolean) => void) => {
        setFormState({ ...formState, store_logo: val as any })
        if (!!formState.store_id === true) {
            const formData = new FormData();
            formData.append('store_logo', val)
            formData.append('store_id', formState.store_id?.toString())
            uploadStoreLogo(formData, iloader)
        }
    }
    return (
        <KeyboardAvoidingView flex={1} behavior={getProperKeyboardAvoidingArea()}>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20 }} flex={1}>
                <Box >
                    <CText variant="body1" fontWeight="bold">Business ID And Contact</CText>
                    <CText color="gray.400" >fill in details that will enable us and customers to identify and contact your business and brand by extension. </CText>
                </Box>
                <CustomInput error={errors?.store_name} onChangeText={(val) => setFormValue(val, "store_name")} value={formState.store_name} placeholder="Enter Store Name" labelText="Store Name*" my={"8px"} />
                <CustomInput error={errors?.store_email} onChangeText={(val) => setFormValue(val, "store_email")} value={formState.store_email} keyboardType="email-address" placeholder="Enter Store Email (Optional)" labelText="Store Email" my={"8px"} />
                <CustomInput error={errors?.store_telephone} onChangeText={(val) => setFormValue(val, "store_telephone")} value={formState.store_telephone} keyboardType="phone-pad" placeholder="Enter Store Telephone (Optional)" labelText="Store Telephone" my={"8px"} />
                <Box my="8px" width="full">
                    <CText variant="body2" color="gray.500">Store Logo</CText>
                    <HStack my="8px" space={2} width="full" >
                        <FileUploader width="150px" source={(formState.store_logo && typeof formState.store_logo) ? { uri: formState.store_logo } : null} onFileChange={onUploadLogo} />
                        <CText flexWrap={"wrap"} flex={1} variant="body2" color="gray.400">
                            Click to upload store logo in png, jpg, jpeg, gif and webp formats, other formats will fail with a validation error.
                        </CText>
                    </HStack>
                </Box>
                <Box mt="20px">
                    <CText variant="body1" fontWeight="bold">Business Location</CText>
                    <CText color="gray.400" >Fill in the physical location of your business, this will enable customers nearby to easily access your products.</CText>
                </Box>
                <CustomInput error={errors?.store_address} onChangeText={(val) => setFormValue(val, "store_address")} value={formState.store_address} placeholder="Enter Store Address" labelText="Store Address*" my={"8px"} />
                <CustomSelect error={errors?.country_id} placeholder="Select Country Located" labelText="Country*" my="8px" isLoading={countryQuery.isLoading} valueKey="id" titleKey={"country_name"} value={formState.country_id} options={countryQuery?.data?.data ?? []} onValueChange={(val) => setFormValue(val, "country_id")} />
                <CustomSelect searchPlaceholder="Search States..." includeSearch={true} placeholder="Select State Located" labelText="State*" my="8px" isLoading={stateQuery.isLoading} valueKey="state_name" titleKey={"state_name"} error={errors?.state} value={formState.state} options={stateQuery?.data?.data ?? []} onValueChange={(val) => setFormValue(val, "state")} />
                <CustomSelect searchPlaceholder="Search Cities..." includeSearch={true} placeholder="Select City/Region " labelText="City/Region*" my="8px" isLoading={cityQuery.isLoading} valueKey="city_name" titleKey={"city_name"} error={errors?.city} value={formState.city} options={cityQuery?.data?.data ?? []} onValueChange={(val) => setFormValue(val, "city")} />

                <Box mt="20px" mb="10px">
                    <AppBtn isLoading={isLoading} onPress={onSubmit} gradient={true}>{btnLabel}</AppBtn>
                </Box>

            </ScrollView>
        </KeyboardAvoidingView>
    )
}