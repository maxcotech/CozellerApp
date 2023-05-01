import { View } from "native-base";
import AppBar from "../../../../../components/AppBar";
import AppBtn from "../../../../../components/AppBtn";
import SafeScaffold from "../../../../../components/SafeScaffold";
import ProductForm from "./fragments/ProductForm";
import { XPADDING } from "../../../../config/constants.config";
import { useContext } from "react";
import { FormControlContext } from "native-base/lib/typescript/components/composites/FormControl";
import ProductFormContext from "../../../../contexts/ProductFormContext";

export default function CreateProduct(){
    const formContext = useContext(ProductFormContext)
    return (
        <SafeScaffold>
            <AppBar title="Add Product"  right={<AppBtn onPress={() => console.log(formContext.productForm)} paddingX={14} borderRadius={5} paddingY={8} gradient={true} textVariant="body4">publish</AppBtn>} />
            <View paddingX={XPADDING} py={"10px"} flex={1}>
                <ProductForm />
            </View>
        </SafeScaffold>
    )
}