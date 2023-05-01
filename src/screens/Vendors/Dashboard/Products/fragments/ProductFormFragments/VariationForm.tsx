import { Box, HStack, ScrollView, View } from "native-base";
import AppBar from "../../../../../../../components/AppBar";
import SafeScaffold from "../../../../../../../components/SafeScaffold";
import AppBtn from "../../../../../../../components/AppBtn";
import { useContext, useEffect, useState } from "react";
import { ProductVariationForm } from "../../../../../../config/data_types/product_types";
import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import ProductFormContext from "../../../../../../contexts/ProductFormContext";
import CustomInput from "../../../../../../../components/CustomInput";
import { XPADDING } from "../../../../../../config/constants.config";
import AppContext from "../../../../../../contexts/AppContext";
import CText from "../../../../../../../components/CText";
import { decode } from "html-entities";
import FileUploader from "../../../../../../../components/FileUploader";
import { uploadVariationImage } from "../../../../../../api/services/product.services";
import { AppNavProps } from "../../../../../../config/routes.config";

export interface VariationRouteParams extends RouteProp<ParamListBase> {
    params?: {variationIndex: number}
}

export default function VariationForm(){
    const route = useRoute<VariationRouteParams>();
    const {productForm, setProductForm} = useContext(ProductFormContext);
    const {profileData} = useContext(AppContext)
    const [formState,setFormState] = useState({} as ProductVariationForm);
    const navigation = useNavigation<AppNavProps>();

    const variationFormPlaceholder = {
        variation_name: "",
        variation_sku: "",
        regular_price: null,
        sales_price: null,
        amount_in_stock: null,
    } as ProductVariationForm

    const setFormValue = (val:any, key: keyof ProductVariationForm) => {
        setFormState({
            ...formState, [key]: val
        })
    }

    const onUploadImage = async (file:any ,iloader: any) => {
        const formData = new FormData();
        formData.append('store_id',productForm.store_id?.toString());
        formData.append('image_file',file);
        if(productForm.product_id){
            formData.append('product_id',productForm.product_id?.toString());
        }
        if(formState.id){
            formData.append('variation_id',formState.id?.toString())
        }
        if(formState.variation_image_url){
            formData.append('old_image_url',formState.variation_image_url);
        }
        uploadVariationImage(formData,iloader,(data) => {
            setFormState({
                ...formState, variation_image: data?.image_full_path, variation_image_url: data?.image_full_path
            })
        })
    }

    const onApply = () => {
        let newVariations: ProductVariationForm[];
        if(route?.params?.variationIndex || route?.params?.variationIndex === 0){
            newVariations = [...productForm.variations];
            newVariations[route?.params?.variationIndex] = formState;
        } else {
            newVariations = [...productForm.variations,formState];
        }
        setProductForm({
            ...productForm,
            variations: newVariations
        })
        navigation.pop()
    }

    useEffect(() => {
        if(route?.params && (route?.params?.variationIndex || route?.params?.variationIndex === 0)){
            const currentData = productForm?.variations[route?.params?.variationIndex];
            if(currentData.variation_image){
                currentData.variation_image_url = currentData.variation_image;
            }
            setFormState({...currentData})
        }
    },[route?.params]);


    return (
        <SafeScaffold>
            <AppBar title="Manage Variations" />
            <View px={XPADDING} flex={1} pt="20px">
                <ScrollView contentContainerStyle={{paddingBottom: 20}}  flex={1}>
                    <CText variant="body2" color="gray.500" mb="5px">Variation Image</CText>
                    <HStack width="full"  space={2}>
                        <FileUploader source={(formState.variation_image)?{uri: formState.variation_image}:undefined} onFileChange={onUploadImage} ratio={2/3} width="130px" />
                        <Box flex={1}>
                            <CText variant="body3" color="gray.400">
                                Add an image for variation (only jpg,png,jpeg,webp supported)
                            </CText>
                        </Box>
                        
                    </HStack>
                    <CustomInput my="8px" onChangeText={(val) => setFormValue(val,"variation_name")} value={formState.variation_name} placeholder="Enter Variation Name" labelText="Variation Name*" />
                    <CustomInput my="8px" prefix={<CText variant="body1">{decode(profileData?.currency?.currency_sym)}</CText>} keyboardType="number-pad" onChangeText={(val) => setFormValue(val,"regular_price")} value={formState?.regular_price?.toString()} placeholder={`Enter Regular Price in ${profileData?.currency?.currency_code}`} labelText={`Regular Price (${profileData?.currency?.currency_code})*`} />
                    <CustomInput my="8px" prefix={<CText variant="body1">{decode(profileData?.currency?.currency_sym)}</CText>} keyboardType="number-pad" onChangeText={(val) => setFormValue(val,"sales_price")} value={formState?.sales_price?.toString()} placeholder={`Enter Sales Price in ${profileData?.currency?.currency_code} (Optional)`} labelText={`Sales Price (${profileData?.currency?.currency_code})`} />
                    <CustomInput my="8px" onChangeText={(val) => setFormValue(val,"amount_in_stock")} value={formState.amount_in_stock?.toString()} keyboardType="number-pad" placeholder="Enter Amount in stock" labelText="Amount In Stock*" />
                    <CustomInput my="8px" onChangeText={(val) => setFormValue(val,"variation_sku")} value={formState.variation_sku?.toString()} placeholder="Enter Variation SKU" labelText="Variation SKU*" />

                </ScrollView>
                <Box my="10px">
                    <AppBtn gradient={true} onPress={onApply}>apply</AppBtn>
                </Box>
            </View>
        </SafeScaffold>
    )
}