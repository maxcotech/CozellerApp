import { View } from "native-base";
import { ProductFormPageProps } from "../../../../../../config/data_types/product_types";
import CText from "../../../../../../../components/CText";


export default function ProductGallery({setFormValue}: ProductFormPageProps){
    return (
        <View flex={1}>
            <CText>Hello World</CText>
        </View>
    )
}