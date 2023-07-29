import { Box, Center, Circle, Icon } from "native-base";
import { ActionResultParams, AppRouteProp } from "../../config/data_types/general.types";
import SafeScaffold from "../../../components/SafeScaffold";
import { useMemo } from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import CText from "../../../components/CText";
import { XPADDING } from "../../config/constants.config";
import AppBtn from "../../../components/AppBtn";
import { AppNavProps } from "../../config/routes.config";

export interface StateAlertViewParams extends AppRouteProp {
     params: ActionResultParams
}

export default function StatusAlertView() {
     const route = useRoute<StateAlertViewParams>();
     const navigation = useNavigation<AppNavProps>();
     const colorGroup = useMemo(() => {
          if (route?.params?.status === "success") {
               return {
                    textColor: "success.600",
                    bgColor: "success.200"
               }
          }
          else if (route?.params?.status === "failed") {
               return {
                    textColor: "danger.600",
                    bgColor: "danger.200"
               }
          }
          else {
               return {
                    textColor: "warning.600",
                    bgColor: "warning.200"
               }
          }
     }, [route?.params?.status])

     const icon = useMemo(() => {
          switch (route?.params?.status) {
               case "success": return <MaterialCommunityIcons name="check-decagram" />;
               case "failed": return <AntDesign name="closecircle" />;
               case "warning": return <AntDesign name="warning" />;
               default: return <AntDesign name="closecircle" />;
          }
     }, [route?.params?.status])
     return (
          <SafeScaffold>
               <Center paddingX={XPADDING} flex={1}>
                    <Circle padding="30px" bgColor={colorGroup.bgColor} >
                         <Icon color={colorGroup.textColor} as={icon} size="xl" />
                    </Circle>
                    <CText textAlign={"center"} paddingX="20px" fontWeight={"bold"} color={colorGroup.textColor} mt="20px" variant="body1">{route?.params?.title ?? "Untitled Message"}</CText>
                    <CText textAlign={"center"} paddingX="20px" color="gray.400">{route?.params?.message ?? "Status description not specified"}</CText>
                    <Box width="200px" mt="20px">
                         <AppBtn onPress={() => navigation.navigate(route?.params?.nextRoute, route?.params?.nextRouteParams ?? {})}>{route?.params?.actionBtnLabel ?? "Continue"}</AppBtn>
                    </Box>
               </Center>
          </SafeScaffold>
     )
}