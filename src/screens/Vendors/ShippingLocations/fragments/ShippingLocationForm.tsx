import { Box, ScrollView, View } from "native-base";
import { ShippingLocation, ShippingLocationFormData } from "../../../../config/data_types/shipping_types";
import { useContext, useState } from "react";
import AppContext from "../../../../contexts/AppContext";
import { createFormErrorObject } from "../../../../helpers/message.helpers";
import { useCities, useCountries, useStates } from "../../../../api/queries/location.queries";
import CustomSelect from "../../../../../components/CustomSelect";
import AppBtn from "../../../../../components/AppBtn";

interface ShippingLocationFormProps {
    defaultData?:ShippingLocation,
    handleSubmit: (data: ShippingLocationFormData, setError: (val:any) => void) => void,
    isLoading: boolean,
    shipping_group_id: number
}

export default function ShippingLocationForm({defaultData,handleSubmit,isLoading,shipping_group_id}:ShippingLocationFormProps){
    const appContext = useContext(AppContext);
    const [formState,setFormState] = useState({
        store_id: defaultData?.store_id ?? appContext?.profileData?.current_store?.id,
        shipping_group_id: defaultData?.shipping_group_id ?? shipping_group_id,
        country_id: defaultData?.country_id,
        state: defaultData?.state?.state_name ?? "",
        city: defaultData?.city?.city_name ?? "",
        id: defaultData?.id ?? undefined
    } as ShippingLocationFormData)

    const [errors,setErrors] = useState(createFormErrorObject(formState));
    const setFormValue = (val: any, key: keyof ShippingLocationFormData) => {
        setFormState({
            ...formState, [key]: val
        })
    }
    const countryHandle = useCountries();
    const stateHandle = useStates({country_id: formState.country_id},{ enabled: (!!formState.country_id)});
    const cityHandle = useCities({state:formState.state,country_id:formState.country_id},{enabled: (!!formState.state && !!formState.country_id)});
    const onSubmit = () => {
        if(handleSubmit){
            handleSubmit(formState,setErrors);
        }
    }
    return (
        <View flex={1}>
            <ScrollView flex={1}>
                <CustomSelect isLoading={countryHandle.isLoading} value={formState.country_id} error={errors?.country_id} placeholder="Select Country" labelText="Country" my="8px" onValueChange={(val) => setFormValue(val,"country_id")} valueKey={"id"} titleKey="country_name" options={countryHandle.data?.data ?? []} />
                <CustomSelect includeSearch={true} isLoading={stateHandle.isLoading} value={formState.state} error={errors?.state} placeholder="Select State" labelText="State" my="8px" onValueChange={(val) => setFormValue(val,"state")} valueKey={"state_name"} titleKey="state_name" options={stateHandle.data?.data ?? []} />
                <CustomSelect includeSearch={true} isLoading={cityHandle.isLoading} value={formState.city} error={errors?.city} placeholder="Select City / Region" labelText="City / Region" my="8px" onValueChange={(val) => setFormValue(val,"city")} valueKey={"city_name"} titleKey="city_name" options={cityHandle.data?.data ?? []} />
                <Box mt="40px">
                    <AppBtn onPress={onSubmit} isLoading={isLoading} gradient={true}>Save Location</AppBtn>
                </Box>
            </ScrollView>
        </View>
    )
}