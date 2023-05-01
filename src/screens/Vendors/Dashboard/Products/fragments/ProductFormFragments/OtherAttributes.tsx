import { ScrollView, VStack, View } from "native-base";
import { ProductFormPageProps } from "../../../../../../config/data_types/product_types";
import CustomInput from "../../../../../../../components/CustomInput";
import { useContext } from "react";
import ProductFormContext from "../../../../../../contexts/ProductFormContext";
import AppBtn from "../../../../../../../components/AppBtn";
import { ProductFormIndexes } from "../../../../../../config/enum.config";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import routes from "../../../../../../config/routes.config";
import { Brand } from "../../../../../../config/data_types/brand_types";


export default function OtherAttributes(){
    const formContext = useContext(ProductFormContext);
    const {productForm, productFormErrors,setProductForm, setFormValue, setProductFormIndex} = formContext;
    const navigation = useNavigation();
    const route = useRoute();
    const onSelectBrand = () => {
        navigation.navigate(routes.brandOptions as never, {
            returnRoute: route.name,
            onSelect: (brand: Brand) => {
                setProductForm({
                    ...productForm, brand_id: brand.id, brand_name: brand.brand_name
                })
            }
        } as never)
    }
    return (
        <View flex={1}>
            <ScrollView pt="20px" flex={1} contentContainerStyle={{paddingBottom:20}}>
                <CustomInput my="8px" onChangeText={(val) => setFormValue(val,"product_sku")} placeholder="Enter Product SKU (Optional)" error={productFormErrors.product_sku} value={productForm.product_sku} labelText="Product SKU" />
                <CustomInput my="8px" onChangeText={(val) => setFormValue(val,"youtube_video_id")} placeholder="Enter Youtube Video ID (Optional)" error={productFormErrors.youtube_video_id} value={productForm.youtube_video_id} labelText="Youtube Video" />
                <TouchableOpacity onPress={onSelectBrand}>
                    <CustomInput  editable={false} my="8px" placeholder="Eg. Gucci, Balenciaga (Optional)" error={productFormErrors.brand_id} value={productForm.brand_name} labelText="Select Brand" />
                </TouchableOpacity>

            </ScrollView>
            <VStack space={2} pb="10px" pt="20px">
            <AppBtn textVariant="body3" onPress={() => setProductFormIndex(ProductFormIndexes.OtherAttributes)}>Manage Variations <AntDesign name="arrowright" size={18} /></AppBtn>
            <AppBtn textVariant="body3" onPress={() => setProductFormIndex(ProductFormIndexes.Descriptions)}  backgroundColor={"white"} textColor={"black"}><AntDesign  name="arrowleft" size={18} /> Previous</AppBtn>
        </VStack>
        </View>
    )
}