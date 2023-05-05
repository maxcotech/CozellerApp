import React, { useEffect, useState } from "react";
import AppBar from "../../../../../components/AppBar";
import CText from "../../../../../components/CText";
import AppContext from "../../../../contexts/AppContext";
import { Actionsheet, Box, HStack, Image, ScrollView, VStack, View } from "native-base";
import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import AppBtn from "../../../../../components/AppBtn";
import { decode } from "html-entities";
import { APP_COLOR, XPADDING } from "../../../../config/constants.config";
import { Currency } from "../../../../config/data_types/currency_types";
import { LinearGradient } from "expo-linear-gradient";
import HomeSkeleton from "./components/HomeSkeleton";
import Money from "../../../../../components/Money";
import { StoreQueryKeys, useStoreDashboard } from "../../../../api/queries/store.queries";
import { formatNumber } from "../../../../helpers/string.helpers";
import { RefreshControl, TouchableOpacity } from "react-native";
import { useChangeCurrency, useCurrencies } from "../../../../api/queries/currency.queries";
import CustomSelect from "../../../../../components/CustomSelect";
import { useQueryClient } from "react-query";
import { AccountQueryKeys, useProfile } from "../../../../api/queries/account.queries";

export default function Home(){
    const appContext = React.useContext(AppContext);
    const [showCurrencyOptions,setShowCurrencyOptions] = useState(false);
    const store = appContext.profileData?.current_store;
    const {currency = {} as Currency, user} = appContext.profileData;
    const {isLoading,data,refetch,isRefetching} = useStoreDashboard({store_id:store.id});
    const currencyQuery = useCurrencies({},{enabled: showCurrencyOptions});
    const profileQuery = useProfile({
        onSuccess:(data) => {
        appContext.setProfileData(data.data);
    }})
    const queryClient = useQueryClient();
    const changeCurrency = useChangeCurrency({
        onSuccess:async (data) => {
            setShowCurrencyOptions(false);
            await queryClient.resetQueries();
            profileQuery.refetch();
            refetch();
            toast.show(data.message,{type:"success"});
        }
    })
    const onChangeCurrency = (val) => {
        setShowCurrencyOptions(false);
        changeCurrency.mutate({currency_id: val})
    }



    return (
        <View flex={1}>
            <AppBar 
                right={<AppBtn isLoading={changeCurrency?.isLoading || profileQuery?.isLoading} onPress={() => setShowCurrencyOptions(true)} textVariant="body4"  gradient={true}>
                    {currency?.currency_code} ({decode(currency?.currency_sym)})
                </AppBtn>}
                left={<Image width="40px" backgroundColor={"gray.200"} height="40px" borderRadius={"lg"} source={{uri:store?.store_logo}} />}
                subtitle={store?.store_address} title={store?.store_name} 
            />
            <ScrollView pt="10px" refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={() => {refetch()}} />} px={XPADDING} flex={1}>
                <TouchableOpacity>
                    <HStack borderRadius={"md"} px="15px" pb="15px" mt="10px" alignItems={"center"} justifyContent={"space-between"} backgroundColor={APP_COLOR}>
                        <Box>
                            <CText  color="white" variant="heading" mt="10px">Welcome {user?.last_name}</CText>
                            <CText variant="body2" mt="-8px"  color="gray.200">{user?.user_type_text.replace("_"," ")}</CText>
                        </Box>
                        <AntDesign color={"white"} size={20} style={{paddingTop:10}} name="arrowright" />
                    </HStack>
                </TouchableOpacity>
                {
                    (isLoading)? <HomeSkeleton />:
                    <>
                         <View borderRadius={"md"} overflow={"hidden"} minHeight={"200px"} mt="10px">
                    <LinearGradient end={{x:0,y:0.2}} start={{x:1,y:0.8}} style={{flex:1,padding:15}} colors={["#009445", "#008761", "#007971", "#006974", "#02586b"]}>
                        <VStack flex={1} justifyContent={"space-between"}>
                            <Box>
                                <CText fontWeight="bold" color="gray.300" variant="body3">DAILY INCOME</CText>
                                <Money mt="-7px" color="white" variant="superheading">
                                    {data?.data?.revenues?.daily_revenue ?? 0}
                                </Money>
                            </Box>
                            <HStack pb="10px" justifyContent={"space-between"}>
                                <VStack alignItems="center">
                                    <Money color="white" fontWeight={"bold"}>{data?.data?.revenues?.monthly_revenue}</Money>
                                    <CText color="gray.300" variant="body4">MONTHLY</CText>
                                </VStack>
                                <VStack alignItems="center">
                                    <Money color="white" fontWeight={"bold"}>{data?.data?.revenues?.yearly_revenue}</Money>
                                    <CText color="gray.300" variant="body4">YEARLY</CText>
                                </VStack>
                                <VStack alignItems="center">
                                    <Money color="white" fontWeight={"bold"}>{data?.data?.revenues?.all_time_revenue}</Money>
                                    <CText color="gray.300" variant="body4">ALL TIME</CText>
                                </VStack>
                            </HStack>
                        </VStack>
                        
                        <SimpleLineIcons style={{
                            position:"absolute",right:-40, bottom: -40,
                            transform:[{rotateZ:"45deg"}]}} color="rgba(200,200,200,0.2)" size={150} name="wallet"
                        />
                    </LinearGradient>
                </View>
                <HStack space={2} minHeight="150px" mt="10px">
                    <Box flex={1}  borderRadius={"md"} overflow="hidden">
                        <LinearGradient start={{x:0,y:0.2}} end={{x:1,y:0.8}} style={{flex:1,padding:15}} colors={["#0075ff","#009cff", "#00b8c8", "#00ce9a"]}>
                            <Ionicons style={{
                                position:"absolute",right:-40, bottom: -60,
                                transform:[{rotateZ:"-45deg"}]}} color="rgba(200,200,200,0.4)" size={150} name="cart-outline"
                            />
                            <Box>
                                <CText fontWeight="bold" color="gray.300" variant="body3">PENDING ORDERS</CText>
                                <CText  color="white" variant="heading">
                                    {formatNumber(data?.data?.total_pending_orders)}
                                </CText>
                            </Box>
                            
                        </LinearGradient>
                    </Box>
                    <Box flex={1}  borderRadius={"md"} overflow="hidden">
                        <LinearGradient end={{x:0,y:0.2}} start={{x:1,y:0.8}} style={{flex:1,padding:15}} colors={[ "#a15771", "#81557b", "#5e5379", "#404f6c"]}>
                            <Ionicons style={{
                                position:"absolute",right:-40, bottom: -60,
                                transform:[{rotateZ:"-90deg"}]}} color="rgba(200,200,200,0.4)" size={150} name="pricetags-outline"
                            />
                            <Box>
                                <CText fontWeight="bold" color="gray.300" variant="body3">STOCK VALUE</CText>
                                <Money color="white" variant="heading">
                                    {data?.data?.stock_data?.stock_value}
                                </Money>
                            </Box>
                        </LinearGradient>
                    </Box>
                </HStack>

                <HStack space={2} minHeight="150px" mt="10px">
                    <Box flex={1}  borderRadius={"md"} overflow="hidden">
                        <LinearGradient start={{x:0,y:0.2}} end={{x:1,y:0.8}} style={{flex:1,padding:15}} colors={["#2f4858","#354c62", "#404f6c", "#4e5174"]}>
                            <Ionicons style={{
                                position:"absolute",right:-40, bottom: -60,
                                transform:[{rotateZ:"-45deg"}]}} color="rgba(200,200,200,0.4)" size={150} name="server-outline"
                            />
                            <Box>
                                <CText fontWeight="bold" color="gray.300" variant="body3">STOCK QUANTITY</CText>
                                <CText  color="white" variant="heading">
                                    {formatNumber(data?.data?.stock_data?.stock_quantity)}
                                </CText>
                            </Box>
                            
                        </LinearGradient>
                        
                    </Box>
                    <Box flex={1}  borderRadius={"md"} overflow="hidden">
                        <LinearGradient end={{x:0,y:0.2}} start={{x:1,y:0.8}} style={{flex:1,padding:15}} colors={["#81ce23", "#3ac059", "#00ae78", "#009989", "#008388"]}>
                            <Ionicons style={{
                                position:"absolute",right:-40, bottom: -60,
                                transform:[{rotateZ:"-45deg"}]}} color="rgba(200,200,200,0.4)" size={150} name="ios-briefcase-outline"
                            />
                            <Box>
                                <CText fontWeight="bold" color="gray.300" variant="body3">TOTAL PRODUCTS</CText>
                                <CText  color="white" variant="heading">
                                    {formatNumber(data?.data?.stock_data?.total_products)}
                                </CText>
                            </Box>
                        </LinearGradient>
                    </Box>
                </HStack>
                    </>
                }
               
            </ScrollView>
            <Actionsheet isOpen={showCurrencyOptions} onClose={() => setShowCurrencyOptions(false)}>
                <Actionsheet.Content>
                    
                    <Box width="full" px="15px" py="25px">
                        <CustomSelect  placeholder="Select New Currency"  label={<CText fontWeight="bold" mb="7px">Change Currency</CText>} isLoading={currencyQuery?.isLoading} onValueChange={onChangeCurrency} value={currency.id} titleKey="currency_name" valueKey="id" options={currencyQuery.data?.data ?? []} />
                    </Box>
                </Actionsheet.Content>
            </Actionsheet>
        </View>
    )
}