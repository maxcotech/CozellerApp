import { KeyboardAvoidingView, ScrollView, Text, VStack, View } from "native-base";
import React, { useContext } from 'react';
import ProductFormContext from "../../../../../../contexts/ProductFormContext";
import { RichEditor, RichToolbar, actions } from "react-native-pell-rich-editor";
import CText from "../../../../../../../components/CText";
import AppBtn from "../../../../../../../components/AppBtn";
import { ProductFormIndexes } from "../../../../../../config/enum.config";
import { AntDesign } from "@expo/vector-icons";

export default function ProductDescriptions() {
    const { productForm, setFormValue, setProductFormIndex } = useContext(ProductFormContext);
    let simpleDRef = React.useRef(productForm.simple_description);
    let keyFeatureRef = React.useRef(productForm.key_features);

    const handleHead = ({ tintColor }) => <Text style={{ color: tintColor }}>h1</Text>
    const handleHead2 = ({ tintColor }) => <Text style={{ color: tintColor }}>h2</Text>
    const handleHead3 = ({ tintColor }) => <Text style={{ color: tintColor }}>h3</Text>


    return (
        <View flex={1}>
            <KeyboardAvoidingView flex={1} behavior="padding">
                <ScrollView pt="20px" flex={1}>
                    <CText>Simple Description</CText>
                    <RichEditor ref={simpleDRef}
                        onChange={(val) => setFormValue(val, "simple_description")}
                        initialContentHTML={productForm.simple_description ?? "Include a brief description of your product."}
                    />
                    <RichToolbar

                        editor={simpleDRef}
                        actions={[actions.setBold, actions.heading1, actions.heading2, actions.heading3, actions.setItalic, actions.insertBulletsList, actions.insertOrderedList, actions.setUnderline]}
                        iconMap={{ [actions.heading1]: handleHead, [actions.heading2]: handleHead2, [actions.heading3]: handleHead3 }}
                    />

                    <CText mt="20px">Key Features</CText>
                    <RichEditor ref={keyFeatureRef}
                        onChange={(val) => setFormValue(val, "key_features")}
                        initialContentHTML={productForm?.key_features ?? "List out the key features of the product."}
                    />
                    <RichToolbar
                        editor={simpleDRef}
                        actions={[actions.setBold, actions.heading1, actions.heading2, actions.heading3, actions.setItalic, actions.insertBulletsList, actions.insertOrderedList, actions.setUnderline]}
                        iconMap={{ [actions.heading1]: handleHead, [actions.heading2]: handleHead2, [actions.heading3]: handleHead3 }}
                    />
                </ScrollView>
                <VStack space={2} pb="10px" pt="60px">
                    <AppBtn textVariant="body3" onPress={() => setProductFormIndex(ProductFormIndexes.ProductDimensions)}>Continue <AntDesign name="arrowright" size={18} /></AppBtn>
                    <AppBtn textVariant="body3" onPress={() => setProductFormIndex(ProductFormIndexes.ProductGallery)} backgroundColor={"white"} textColor={"black"}><AntDesign name="arrowleft" size={18} /> Previous</AppBtn>
                </VStack>
            </KeyboardAvoidingView>
        </View>
    )
}