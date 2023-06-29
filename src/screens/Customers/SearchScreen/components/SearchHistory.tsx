import { Box, HStack, Icon, ScrollView, View } from "native-base";
import { useSearchHistory } from "../../../../api/queries/search.queries";
import OrderSkeleton from "../../../Vendors/Dashboard/Orders/Fragment/OrderSkeleton";
import { NEW_XPADDING } from "../../../../config/constants.config";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import CText from "../../../../../components/CText";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../../config/routes.config";


export default function SearchHistory({ setQuery }: { setQuery: (val: string) => void }) {
     const navigation = useNavigation<AppNavProps>();
     const historyHandle = useSearchHistory({});
     if (historyHandle.isLoading) return <View flex={1} px={NEW_XPADDING + "px"}>
          <OrderSkeleton />
     </View>
     return (
          <ScrollView flex={1}>
               {
                    (historyHandle.data?.data?.length > 0) ?
                         <>
                              {
                                   historyHandle.data?.data?.map((item) => (
                                        <TouchableOpacity onPress={() => navigation.replace(routes.customerSearch, { query: item.query })}>
                                             <HStack space={2} py={2} alignItems="center" borderBottomWidth={0.5} borderBottomColor={"gray.300"} px={NEW_XPADDING + "px"}>
                                                  <Icon size="md" as={<MaterialCommunityIcons name="history" />} />
                                                  <CText>{item.query}</CText>
                                                  <Box ml="auto">
                                                       <Icon onPress={() => true} size="md" as={<AntDesign name="close" />} />
                                                  </Box>
                                             </HStack>
                                        </TouchableOpacity>
                                   ))
                              }
                         </> : <></>
               }
          </ScrollView>
     )
}