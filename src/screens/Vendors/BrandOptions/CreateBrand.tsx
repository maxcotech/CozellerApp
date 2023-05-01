import { useState } from "react";
import AppBar from "../../../../components/AppBar";
import SafeScaffold from "../../../../components/SafeScaffold";
import { BrandFormData } from "../../../config/data_types/brand_types";
import { Box, HStack, ScrollView, View } from "native-base";
import CustomInput from "../../../../components/CustomInput";
import CText from "../../../../components/CText";
import FileUploader from "../../../../components/FileUploader";
import { XPADDING } from "../../../config/constants.config";
import { createFormErrorObject } from "../../../helpers/message.helpers";
import AppBtn from "../../../../components/AppBtn";
import { useCreateBrand } from "../../../api/queries/brand.queries";
import { useNavigation } from "@react-navigation/native";

export default function CreateBrand(){
    const [formState,setFormState] = useState({} as BrandFormData);
    const [errors,setErrors] = useState(createFormErrorObject(formState));
    const navigation = useNavigation();
    const {isLoading,mutate} = useCreateBrand({
    onError: (error) => setErrors(error.data),
    onSuccess: (data) => {
        toast.show(data?.message,{type:"success"});
        navigation.goBack();
    }})
    const onSubmit = () => {
        const formKeys = Object.keys(formState);
        const formData = new FormData();
        formKeys.forEach((key) => {
            formData.append(key,formState[key])
        })
        mutate(formData)
    }
    return (
        <SafeScaffold>
            <AppBar title="Propose Brand" />
            <View flex={1} pt="20px" px={XPADDING}>
            <ScrollView  flex={1} contentContainerStyle={{paddingBottom:20}}>
                <CustomInput error={errors?.brand_name} onChangeText={(brand_name) => setFormState({...formState,brand_name})} value={formState.brand_name} placeholder="Enter Brand Name" labelText="Brand Name" my="8px" />
                <CustomInput error={errors?.website_url} onChangeText={(website_url) => setFormState({...formState,website_url})} value={formState.website_url} placeholder="Enter Website Address" labelText="Website" my="8px" />
                <CText mb="3px">Brand Logo</CText>
                <HStack width="full" space={2}>
                    <FileUploader onFileChange={(brand_logo) => setFormState({...formState,brand_logo})} ratio={2/2} width="120px" />
                    <Box flex={1}>
                        <CText variant="body3" color="gray.400">
                            Add a logo for the brand (only jpg,png,jpeg,webp supported)
                        </CText>
                    </Box>
                    
                </HStack>

            </ScrollView>
            <Box py="20px">
            <AppBtn onPress={onSubmit} gradient={true} isLoading={isLoading}>Continue</AppBtn>
            </Box>
            </View>
        </SafeScaffold>
    )
}