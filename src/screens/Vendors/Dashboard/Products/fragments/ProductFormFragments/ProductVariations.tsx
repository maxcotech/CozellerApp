import { Fab, ScrollView, VStack, View } from "native-base";
import { ProductFormPageProps, ProductVariationForm } from "../../../../../../config/data_types/product_types";
import { AntDesign } from "@expo/vector-icons";
import { APP_COLOR } from "../../../../../../config/constants.config";
import AppBtn from "../../../../../../../components/AppBtn";
import { useContext } from "react";
import ProductFormContext from "../../../../../../contexts/ProductFormContext";
import { ProductFormIndexes } from "../../../../../../config/enum.config";
import EmptyPage from "../../../../../../../components/EmptyPage";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../../../../config/routes.config";
import VariationItem from "./VariationItem";

export enum VariationManagementOptions {
    delete = 1,
    edit = 2
}

export default function ProductVariations(){
    const formContext = useContext(ProductFormContext);
    const navigation = useNavigation<AppNavProps>();
    
    const {setProductFormIndex,productForm,setProductForm} = formContext;
    
    const onAddVariation = () => {
        navigation.navigate(routes.variationForm)
    }
    return (
        <View pt="20px" flex={1}>
            {
                (productForm.variations && productForm.variations?.length > 0)?
                <ScrollView flex={1}>
                    {
                        productForm.variations.map((item,index) => (
                            <VariationItem onSelect={(val) => {
                                if(val === VariationManagementOptions.delete){
                                    const newVariations = productForm.variations.filter((_,i) => i !== index );
                                    setProductForm({
                                        ...productForm, variations: newVariations
                                    })
                                }
                                if(val === VariationManagementOptions.edit){
                                    navigation.navigate(routes.variationForm,{variationIndex: index})
                                }
                            }} data={item} />
                        ))
                    }
                </ScrollView>:
                <EmptyPage title="No Product Variation" subtitle="You haven't added any variation for this product">
                    <AppBtn textVariant="body3" onPress={() => onAddVariation()} gradient={true}>Add Variation</AppBtn>
                </EmptyPage>
            }
            
            <Fab onPress={() => onAddVariation()} right={0}  backgroundColor={APP_COLOR} renderInPortal={false} label={<AntDesign color="white" size={20} name="plus" />} />
            <VStack space={2} pb="10px" pt="60px">
                <AppBtn textVariant="body3" onPress={() => setProductFormIndex(ProductFormIndexes.OtherAttributes)}  backgroundColor={"white"} textColor={"black"}><AntDesign name="arrowleft" size={18} /> Previous</AppBtn>
            </VStack>
        </View>
    )
}