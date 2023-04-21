import { Box, HStack, Image, StatusBar, VStack, View } from "native-base";
import React from "react";
import {Dimensions} from "react-native"
import CText from "../../../components/CText";
import { LinearGradient } from "expo-linear-gradient";
import { APP_COLOR, APP_COLOR_LIGHTER } from "../../config/constants.config";
import Carousel from "react-native-reanimated-carousel";
import AppBtn from "../../../components/AppBtn";
import { useNavigation } from "@react-navigation/native";
import routes, { AppParamList } from "../../config/routes.config";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const Introduction = () => {
    const dimensions = Dimensions.get('screen');
    const navigation = useNavigation<NativeStackNavigationProp<typeof AppParamList>>()
    const deviceWidth = dimensions.width;
    const deviceHeight = dimensions.height;
    
    const data = [
        {
            image: 1,
            title: "Create your shops for free",
            description: "Unlock your entrepreneurial potential today and create your own online store at no cost. With our platform, you can bring your business dreams to life and showcase your products to the world. Get started now and start selling!"
        },
        {
            image: 2,
            title: "Start Shopping Now",
            description: "Ready to start shopping? Set a budget, make a list, prioritize needs over wants, and look for deals to help you save money. With these simple tips, you can shop smarter and get the items you need without overspending. So, let's get started and happy shopping!"
        }
    ]
    return (
        <>
        <StatusBar backgroundColor={"transparent"} translucent />
        <View flex={1}>
            <Carousel autoPlay={true} autoPlayInterval={7000}  loop scrollAnimationDuration={1000} height={deviceHeight} width={deviceWidth} data={data} renderItem={({index,item}) => (
                <React.Fragment key={index}>
                    <Image alt={item.title} width="full" height="5/6" source={(item.image === 1)? require("../../../assets/happy-vendor.jpg"): require("../../../assets/happy-buyer.jpg")} />
                    <LinearGradient locations={[0,0.1,0.6]}  style={{zIndex:1, paddingTop: 20, flex:1,position:"absolute",top:0,bottom:0,left:0,right:0}} colors={["rgba(0,0,0,0)",APP_COLOR_LIGHTER,APP_COLOR]}>
                        <VStack alignItems="center" flex={1}  pt="full" px="15px">
                            <HStack space={1} mb="5px">
                                <Box borderRadius={"md"} width={15} height={"2px"} bgColor={(index === 0)? "white":"rgba(0,0,0,0.5)"}></Box>
                                <Box borderRadius={"md"} width={15} height={"2px"} bgColor={(index === 1)? "white":"rgba(0,0,0,0.5)"}></Box>
                            </HStack>
                            <CText variant="subheading" mb="5px" color="white" textAlign={"center"}>{item.title}</CText>
                            <CText variant="body2" textAlign={"center"} color="white">{item.description}</CText>
                        </VStack>
                    </LinearGradient>
                </React.Fragment>
            )} />
            <VStack  space={3} width="full" style={{position:"absolute",zIndex:4,bottom:40}} px="15px">
                <AppBtn onPress={() => navigation.navigate(routes.register)} backgroundColor="white" textColor="black">Sign Up</AppBtn>
                <AppBtn onPress={() => navigation.navigate(routes.login)} backgroundColor="black" textColor="white">I already have an account</AppBtn>
                <AppBtn backgroundColor="transparent" textColor="white">Continue as a guest</AppBtn>
            </VStack>
        </View>
        </>
    )
}