import { HStack, View } from "native-base";
import React, { useEffect } from "react";
import AppContext from "../../../../../contexts/AppContext";
import { ProductFormIndexes } from "../../../../../config/enum.config";
import BasicInformation from "./ProductFormFragments/BasicInformation";
import CText from "../../../../../../components/CText";
import { APP_COLOR } from './../../../../../config/constants.config';
import ProductGallery from "./ProductFormFragments/ProductGallery";
import ProductDescriptions from "./ProductFormFragments/ProductDescriptions";
import ProductDimensions from "./ProductFormFragments/ProductDimensions";
import OtherAttributes from "./ProductFormFragments/OtherAttributes";
import ProductVariations from "./ProductFormFragments/ProductVariations";
import ProductFormContext from "../../../../../contexts/ProductFormContext";

export default function ProductForm(){
    const formContext = React.useContext(ProductFormContext);
    const appContext = React.useContext(AppContext);
    const {productFormIndex} = formContext;

    useEffect(() => {
        formContext.setFormValue(appContext?.profileData?.current_store?.id,"store_id")
    },[appContext?.profileData?.current_store?.id])
    
  

    const CurrentFormStep = React.useMemo(() => {
        switch(productFormIndex){
            case ProductFormIndexes.BasicInformation: return <BasicInformation  />;
            case ProductFormIndexes.ProductGallery: return <ProductGallery />;
            case ProductFormIndexes.Descriptions: return <ProductDescriptions />;
            case ProductFormIndexes.ProductDimensions: return <ProductDimensions />;
            case ProductFormIndexes.OtherAttributes: return <OtherAttributes />;
            case ProductFormIndexes.ProductVariations: return <ProductVariations />;
            default: return <></>
        }
    },[productFormIndex])

    const currentTitle = React.useMemo(() => {
        switch(productFormIndex){
            case ProductFormIndexes.BasicInformation: return "Basic Info";
            case ProductFormIndexes.Descriptions: return "Descriptions";
            case ProductFormIndexes.ProductGallery: return "Product Gallery";
            case ProductFormIndexes.OtherAttributes: return "Other Attributes";
            case ProductFormIndexes.ProductDimensions: return "Product Dimensions";
            case ProductFormIndexes.ProductVariations: return "Product Variations";
            default: return "Unknown Step"
        }
    },[productFormIndex])
    
    

    return (
        <View flex={1}>
            <HStack alignItems="center" justifyContent={"space-between"}>
                <CText variant="body1">{currentTitle}</CText>
                <CText variant="body1" color={APP_COLOR} fontWeight={"bold"}>{productFormIndex + 1} / 6</CText>
            </HStack>
            {CurrentFormStep}
        </View>
    )
}