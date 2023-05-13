import { Box, HStack, Icon, ScrollView, VStack, View } from "native-base";
import AppBar from "../../../../components/AppBar";
import SafeScaffold from "../../../../components/SafeScaffold";
import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { DimensionRangeRates } from "../../../config/data_types/shipping_types";
import { useContext, useEffect, useState } from "react";
import AppBtn from "../../../../components/AppBtn";
import { XPADDING } from "../../../config/constants.config";
import EmptyPage from "../../../../components/EmptyPage";
import CustomInput from "../../../../components/CustomInput";
import { AntDesign } from "@expo/vector-icons";
import AppContext from "../../../contexts/AppContext";
import CText from "../../../../components/CText";
import { decode } from "html-entities";
import { AppNavProps } from "../../../config/routes.config";

interface RouteParams extends RouteProp<ParamListBase> {
    params: {
        onApply: (rates: DimensionRangeRates[]) => void,
        defaultData: string
    }
}

export default function DimensionRangeView(){
    const route = useRoute<RouteParams>();
    const appContext = useContext(AppContext);
    const navigation = useNavigation<AppNavProps>();
    const [dimensions,setDimensions] = useState<DimensionRangeRates[]>([]);
    const onAddNewDataRow = () => {
        setDimensions([
            ...dimensions,
            { max: 0, min: 0, rate: 0 } as DimensionRangeRates
        ])
    }
    useEffect(() => {
        if(route.params?.defaultData){
            setDimensions(JSON.parse(route.params?.defaultData))
        }
    },[route?.params?.defaultData])

    const setFormValue = (val: any, key: keyof DimensionRangeRates, index: number) => {
        const copiedList = [...dimensions];
        const selectedRow = copiedList[index];
        copiedList[index] = { ...selectedRow, [key]: val }
        setDimensions(copiedList);

    }
    return (
        <SafeScaffold>
            <AppBar title="Manage Dimension Rates"  />
            <View px={XPADDING} pt="15px"  flex={1}>
                {
                    (dimensions?.length > 0)?
                    
                    <ScrollView contentContainerStyle={{paddingBottom:20}} showsVerticalScrollIndicator={false} flex={1}>
                        {
                            dimensions.map((item,index) => (
                                <HStack space={1} my="15px" alignItems="center"  width="full" key={index+1}>
                                    <VStack flex={1}  alignItems="stretch">
                                        <HStack mb="7px" space={2} width="full">
                                            <Box flex={1}>
                                                <CustomInput keyboardType="number-pad" onChangeText={(val) => setFormValue(val,"min",index)} labelText="Min. Weight (kg)" placeholder="Min. Weight (kg)" value={item.min?.toString()}  />
                                            </Box>
                                            <Box flex={1}>
                                                <CustomInput keyboardType="number-pad" onChangeText={(val) => setFormValue(val,"max",index)} value={item.max?.toString()} labelText="Max. Weight (kg)" placeholder="Max. Weight (kg)" />
                                            </Box>
                                        </HStack>
                                        <CustomInput prefix={<CText color="gray.400">{decode(appContext?.profileData?.currency?.currency_sym)}</CText>} value={item.rate?.toString()} keyboardType="number-pad" labelText={`Dimension Rate (${appContext?.profileData?.currency?.currency_code})`} placeholder="Enter Dimension Rate" onChangeText={(val) => setFormValue(val,"rate",index)} />
                                    </VStack>
                                    <Icon onPress={() => {
                                        const newDimensions = dimensions.filter((_,i) => i !== index);
                                        setDimensions(newDimensions);
                                    }} size="md" ml="10px" color="danger.500" as={<AntDesign name="delete" />} />
                                </HStack>
                            ))
                            

                        }
                        <HStack mt="20px" justifyContent={"flex-end"}>
                            <Box >
                                <AppBtn onPress={onAddNewDataRow} borderRadius={8} textVariant="body4">+ More Ranges</AppBtn>
                            </Box>
                        </HStack>
                    </ScrollView>:
                    <View flex={1}>
                        <EmptyPage title="No Dimension Range" subtitle="You are yet to add dimension / weight rate ranges for this.">
                            <AppBtn onPress={onAddNewDataRow} textVariant="body4">Add Dimension Rates</AppBtn>
                        </EmptyPage>
                    </View>
                }
                
                <Box my="10px">
                    <AppBtn onPress={() => {
                        route?.params?.onApply(dimensions);
                        navigation.pop();
                    }} gradient={true}>APPLY CHANGES</AppBtn>
                </Box>
            </View>
            
        </SafeScaffold>
    )
}