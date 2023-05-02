import { useContext } from "react";
import ProductFormContext from "../../../../contexts/ProductFormContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ProductRouteParams, generateFormFromProduct, stringifyArraysInForm } from "./CreateProduct";
import { ProductQueryKeys, useProduct, useUpdateProduct } from "../../../../api/queries/product.queries";
import SafeScaffold from "../../../../../components/SafeScaffold";
import AppBar from "../../../../../components/AppBar";
import AppBtn from "../../../../../components/AppBtn";
import { Center, Spinner, View } from "native-base";
import { APP_COLOR, XPADDING } from "../../../../config/constants.config";
import ProductForm from "./fragments/ProductForm";
import { AppNavProps } from "../../../../config/routes.config";
import { useQueryClient } from "react-query";

export default function UpdateProduct(){
    const formContext = useContext(ProductFormContext);
    const queryClient = useQueryClient();
    const navigation = useNavigation<AppNavProps>();
    const route = useRoute<ProductRouteParams>();
    const productQuery = useProduct(route.params?.id,{
        onSuccess:(data) => {
            const newData = generateFormFromProduct(data?.data);
            formContext.setProductForm(newData);
        },
        onError:(error) => {
            toast.show(error.message,{type:"danger"});

        },
        enabled: (route.params?.id || route.params?.id === 0)? true : false }
    )

    const {mutate,isLoading} = useUpdateProduct({
        onError:(data) => {
            toast.show(data?.message,{type:"danger"})
            formContext.setProductFormErrors(data?.data);
        },
        onSuccess:(data) => {
            toast.show(data.message, {type:"success"});
            queryClient.invalidateQueries({queryKey:[ProductQueryKeys.fetchStoreProducts]});
            navigation.pop();
        }
    })

    return (
        <SafeScaffold>
            <AppBar title="Add Product"  right={<AppBtn isLoading={isLoading} onPress={() => mutate(stringifyArraysInForm(formContext.productForm))} paddingX={14} borderRadius={5} paddingY={8} gradient={true} textVariant="body4">publish</AppBtn>} />
            <View paddingX={XPADDING} py={"10px"} flex={1}>
                {
                    (productQuery.isLoading)?
                    <Center flex={1}><Spinner size="lg" color={APP_COLOR} /></Center>:
                    <ProductForm />
                }
                
            </View>
        </SafeScaffold>
    )

}