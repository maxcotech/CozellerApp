import { Box, KeyboardAvoidingView, ScrollView, View } from "native-base";
import React from "react";
import AppContext from "../../../../../../contexts/AppContext";
import CustomInput from "../../../../../../../components/CustomInput";
import CText from "../../../../../../../components/CText";
import { decode } from "html-entities";
import AppBtn from "../../../../../../../components/AppBtn";
import ProductFormContext from "../../../../../../contexts/ProductFormContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../../../../config/routes.config";
import { Category } from "../../../../../../config/data_types/category_types";
import { ProductFormIndexes } from "../../../../../../config/enum.config";
import { getProperKeyboardAvoidingArea } from "../../../../../../helpers/platform.helpers";

export default function BasicInformation() {
    const appContext = React.useContext(AppContext);
    const route = useRoute();
    const formContext = React.useContext(ProductFormContext);
    const navigation = useNavigation<AppNavProps>();
    const { productForm, productFormErrors, setProductForm, setFormValue } = formContext;
    const onInitSelectCategory = () => {
        navigation.navigate(routes.categoryOptions, {
            returnRoute: route.name,
            onSelect: (category: Category) => {
                setProductForm({
                    ...productForm, category_name: category.category_title, category_id: category.id
                })
            }
        })
    }

    return (
        <View flex={1}>
            <KeyboardAvoidingView flex={1} behavior={getProperKeyboardAvoidingArea()}>
                <ScrollView flex={1} pt="2px">
                    <CustomInput error={productFormErrors.product_name} onChangeText={(val) => setFormValue(val, "product_name")} value={productForm.product_name} my="8px" labelText={"Product Name*"} placeholder="Eg. Apple Macbook Pro 2021 mi" />
                    <CustomInput value={productForm?.amount_in_stock?.toString()} keyboardType="number-pad" onChangeText={(val) => setFormValue(val, "amount_in_stock")} my="8px" labelText={"Amount In Stock*"} placeholder="Enter amount in stock" />
                    <CustomInput value={productForm.regular_price?.toString()} prefix={<CText color="gray.400" variant="body1">{decode(appContext.profileData?.currency?.currency_sym)}</CText>} keyboardType="number-pad" onChangeText={(val) => setFormValue(val, "regular_price")} my="8px" labelText={`Regular Price (${appContext.profileData?.currency?.currency_code})*`} placeholder="Enter Regular Price" />
                    <CustomInput value={productForm.sales_price?.toString()} prefix={<CText color="gray.400" variant="body1">{decode(appContext.profileData?.currency?.currency_sym)}</CText>} keyboardType="number-pad" onChangeText={(val) => setFormValue(val, "sales_price")} my="8px" labelText={`Sales Price (${appContext.profileData?.currency?.currency_code})`} placeholder="Enter Sales Price (Optional)" />
                    <CustomInput prefix={<Box my="-5px" ml="-5px"><AppBtn onPress={() => onInitSelectCategory()} borderRadius={8} textVariant="body4">Select Category</AppBtn></Box>} editable={false} value={productForm?.category_name} my="8px" labelText={`Product Category*`} placeholder="Click to select product category" />

                </ScrollView>
                <Box py="10px">
                    <AppBtn onPress={() => formContext.setProductFormIndex(ProductFormIndexes.ProductGallery)} gradient={true}>Continue</AppBtn>
                </Box>
            </KeyboardAvoidingView>
        </View>
    )
}