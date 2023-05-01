import { Box, HStack, ScrollView, VStack, View } from "native-base";
import { ProductFormData } from "../../../../../../config/data_types/product_types";
import CText from "../../../../../../../components/CText";
import { useContext } from "react";
import ProductFormContext from "../../../../../../contexts/ProductFormContext";
import FileUploader from "../../../../../../../components/FileUploader";
import { uploadProductImage } from "../../../../../../api/services/product.services";
import AppBtn from "../../../../../../../components/AppBtn";
import { AntDesign } from "@expo/vector-icons";
import { ProductFormIndexes } from "../../../../../../config/enum.config";


export default function ProductGallery(){
    const formContext = useContext(ProductFormContext);
    const {productForm,setFormValue,setProductFormIndex} = formContext;
    const generateFormData = (file:any, key:keyof ProductFormData) => {
        const formData = new FormData();
        formData.append('store_id',productForm.store_id?.toString());
        formData.append('image_file',file);
        if(productForm.product_id){
            formData.append('product_id',productForm.product_id?.toString());
        }
        if(productForm[key]){
            formData.append('old_image_url',productForm[key] as string)
        }
        return formData;
    }
    const onUploadProductImage = async (file: any, iloader: any) => {
        console.log('prof ',file)
        const formData = generateFormData(file,"main_product_image");
        await uploadProductImage(formData,iloader,(data) => {
            console.log(data);
            setFormValue(data?.image_full_path,"main_product_image");
        }) 
    }

    const onUploadGalleryImage = async (file: any, iloader: any, key: keyof ProductFormData) => {
        const formData = generateFormData(file,key);
        formData.append('image_type',key);
        await uploadProductImage(formData,iloader,(data) => {
            console.log(data)
            setFormValue(data?.image_full_path,key);
        })
    }

    return (
        <View pt="15px" flex={1}>
            <ScrollView flex={1}>
                <CText mb="5px" fontWeight={"bold"}>Main Product Image*</CText>
                <HStack width="full" space={2}>
                    
                    <FileUploader ratio={4/5} width="100px"  source={(productForm.main_product_image)? {uri: productForm.main_product_image}:undefined} onFileChange={onUploadProductImage} />
                    <Box flex={1}>
                        <CText variant="body3" color="gray.400">This is the image that will be used in product catalog cards to present your product.</CText>
                        <CText variant="body3" color="gray.400">Only jpg, png, wepb, jpeg and gif supported</CText>
                    </Box>
                </HStack>
                <CText mt="10px" mb="5px" fontWeight={"bold"}>Gallery Images</CText>
                <CText variant="body3" color="gray.400">These images presents your product at different angles and perspectives, users can view them in the product details page </CText>
                <HStack space={2} mt="10px">
                    <Box flex={1}>
                        <FileUploader source={(productForm.front_image)? {uri: productForm.front_image}:undefined}  ratio={4/5} width="full" onFileChange={(val,iloader) => onUploadGalleryImage(val,iloader,"front_image")} />
                        <CText mt="5px" textAlign={"center"} >Front Image</CText>
                    </Box>
                    <Box flex={1}>
                        <FileUploader source={(productForm.back_image)? {uri: productForm.back_image}:undefined}  ratio={4/5} width="full" onFileChange={(val,iloader) => onUploadGalleryImage(val,iloader,"back_image")} />
                        <CText mt="5px" textAlign={"center"} >Back Image</CText>
                    </Box>
                </HStack>
                <HStack space={2} mt="25px">
                    <Box flex={1}>
                        <FileUploader source={(productForm.side_image)? {uri: productForm.side_image}:undefined}  ratio={4/5} width="full" onFileChange={(val,iloader) => onUploadGalleryImage(val,iloader,"side_image")} />
                        <CText mt="5px" textAlign={"center"} >Side Image</CText>
                    </Box>
                    <Box flex={1}>
                        <FileUploader source={(productForm.fourth_image)? {uri: productForm.fourth_image}:undefined}  ratio={4/5} width="full" onFileChange={(val,iloader) => onUploadGalleryImage(val,iloader,"fourth_image")} />
                        <CText mt="5px" textAlign={"center"} >Fourth Image</CText>
                    </Box>
                </HStack>
                <VStack space={2} pb="10px" pt="60px">
                    <AppBtn textVariant="body3" onPress={() => setProductFormIndex(ProductFormIndexes.Descriptions)}>Continue <AntDesign name="arrowright" size={18} /></AppBtn>
                    <AppBtn textVariant="body3" onPress={() => setProductFormIndex(ProductFormIndexes.BasicInformation)}  backgroundColor={"white"} textColor={"black"}><AntDesign name="arrowleft" size={18} /> Previous</AppBtn>
                </VStack>
            </ScrollView>
        </View>
    )
}