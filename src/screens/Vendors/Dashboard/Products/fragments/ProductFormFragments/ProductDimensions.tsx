import { ScrollView, VStack, View } from "native-base";
import { ProductFormPageProps } from "../../../../../../config/data_types/product_types";
import React from "react";
import ProductFormContext from "../../../../../../contexts/ProductFormContext";
import CText from "../../../../../../../components/CText";
import CustomInput from "../../../../../../../components/CustomInput";
import AppBtn from "../../../../../../../components/AppBtn";
import { ProductFormIndexes } from "../../../../../../config/enum.config";
import { AntDesign } from "@expo/vector-icons";


export default function ProductDimensions(){
    const formContext = React.useContext(ProductFormContext);
    const {productForm, setFormValue,productFormErrors, setProductFormIndex} = formContext;
    return (
        <View flex={1}>
        <ScrollView showsVerticalScrollIndicator={false} pt="20px" contentContainerStyle={{paddingBottom:20}} flex={1}>
            <CText fontWeight="bold">Size By Weight</CText>
            <CText variant="body3" color="gray.400">
                Use product weight to determine the bulk of the product(s) when calculating shipping cost.
            </CText>
            <CustomInput keyboardType="number-pad" my="8px" error={productFormErrors.weight} onChangeText={(val) => setFormValue(val,"weight")} value={productForm.weight?.toString()} labelText="Product Weight (Kg)" placeholder="Enter product weight in kg" />
            <View mt="20px">
                <CText fontWeight="bold">Size By Dimensions</CText>
                <CText variant="body3" color="gray.400">
                    Alternatively, you can use the product dimensions like width, height, length to determine shipping costs.
                </CText>
                <CustomInput keyboardType="number-pad" my="8px" error={productFormErrors.dimension_height} onChangeText={(val) => setFormValue(val,"dimension_height")} value={productForm.dimension_height?.toString()} labelText="Product Height (Inches)" placeholder="Enter product height in Inches" />
                <CustomInput keyboardType="number-pad" my="8px" error={productFormErrors.dimension_width} onChangeText={(val) => setFormValue(val,"dimension_width")} value={productForm.dimension_width?.toString()} labelText="Product Width (Inches)" placeholder="Enter product width in Inches" />
                <CustomInput keyboardType="number-pad" my="8px" error={productFormErrors.dimension_length} onChangeText={(val) => setFormValue(val,"dimension_length")} value={productForm.dimension_length?.toString()} labelText="Product Length (Inches)" placeholder="Enter product length in Inches" />

            </View>

        </ScrollView>
        <VStack space={2} pb="10px" pt="20px">
            <AppBtn textVariant="body3" onPress={() => setProductFormIndex(ProductFormIndexes.OtherAttributes)}>Continue <AntDesign name="arrowright" size={18} /></AppBtn>
            <AppBtn textVariant="body3" onPress={() => setProductFormIndex(ProductFormIndexes.Descriptions)}  backgroundColor={"white"} textColor={"black"}><AntDesign name="arrowleft" size={18} /> Previous</AppBtn>
        </VStack>
        </View>
    )
}