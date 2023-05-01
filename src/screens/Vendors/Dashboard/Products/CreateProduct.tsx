import { View } from "native-base";
import AppBar from "../../../../../components/AppBar";
import AppBtn from "../../../../../components/AppBtn";
import SafeScaffold from "../../../../../components/SafeScaffold";
import ProductForm from "./fragments/ProductForm";
import { XPADDING } from "../../../../config/constants.config";
import { useContext } from "react";
import ProductFormContext from "../../../../contexts/ProductFormContext";
import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ProductQueryKeys, useCreateProduct, useProduct } from "../../../../api/queries/product.queries";
import { Image, Product, ProductFormData, ProductVariationForm } from "../../../../config/data_types/product_types";
import { AppNavProps } from "../../../../config/routes.config";
import { useQueryClient } from "react-query";

export interface ProductRouteParams extends RouteProp<ParamListBase> {
    params?: { id: string | number}
}

export const stringifyArraysInForm = (productForm: ProductFormData) => {
    const newProductForm = {} as ProductFormData;
    const keys = Object.keys(productForm);
    keys.forEach((key) => {
        const currentVal = productForm[key];
        newProductForm[key] = (Array.isArray(currentVal))? JSON.stringify(currentVal): currentVal;
    })
    return newProductForm;
}

export const generateFormFromProduct = (product: Product) => {
    let newForm = {} as ProductFormData;
    const productKeys = Object.keys(product);
    productKeys.forEach((key) => {
        const currentVal = product[key];
        if(!["variations","category","brand",'images',"review_summary","created_at","updated_at","store"].includes(key)){
            newForm[key] = currentVal;
        }
        if(key === "images"){
            currentVal.forEach((item: Image) => {
                newForm[item.image_type] = item.image_url;
            } )
        }
        if(key === "product_image" && currentVal){ newForm.main_product_image = currentVal}
        if(key === "category" && currentVal){ newForm.category_name = currentVal.category_title; }
        if(key === "brand" && currentVal){ newForm.brand_name = currentVal.brand_name}
        if(key === "id" && currentVal){ newForm.product_id = currentVal}
        if(key === "variations"){
            let variations = [];
            if(currentVal && currentVal.length > 0){
                currentVal.forEach((item: ProductVariationForm) => {
                    variations.push({
                        ...item, variation_image_url: item.variation_image
                    } as ProductVariationForm)
                })
            }
            newForm.variations = variations;
        }
    })
    return newForm;
}


export default function CreateProduct(){
    const formContext = useContext(ProductFormContext);
    const navigation = useNavigation<AppNavProps>();
    const route = useRoute<ProductRouteParams>();
    const queryClient = useQueryClient();
    const {isLoading,mutate} = useCreateProduct({
        onError:(error) => {
            toast.show(error.message,{type:"danger"});
            formContext.setProductFormErrors(error?.data);
        },
        onSuccess:(data) => {
            toast.show(data.message,{type:"success"})
            queryClient.invalidateQueries({queryKey:[ProductQueryKeys.fetchStoreProducts]})
            navigation.pop()
        }
    })
    useProduct(route.params?.id,{
        onSuccess:(data) => {
            formContext.setProductForm(generateFormFromProduct(data?.data))
        },
        enabled: (route.params?.id || route.params?.id === 0)? true : false })

    return (
        <SafeScaffold>
            <AppBar title="Add Product"  right={<AppBtn isLoading={isLoading} onPress={() => mutate(formContext.productForm)} paddingX={14} borderRadius={5} paddingY={8} gradient={true} textVariant="body4">publish</AppBtn>} />
            <View paddingX={XPADDING} py={"10px"} flex={1}>
                <ProductForm />
            </View>
        </SafeScaffold>
    )
}