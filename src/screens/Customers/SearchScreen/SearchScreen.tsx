import { Box, HStack, Icon, Image, ScrollView } from "native-base";
import SafeScaffold from "../../../../components/SafeScaffold";
import { CustomSearchInput2 } from "../../../../components/CustomInput";
import { APP_COLOR, NEW_XPADDING } from "../../../config/constants.config";
import CartIcon from "../components/CartIcon";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useEffect, useRef, useState, useMemo } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { debounced } from "../../../helpers/value.helpers";
import { useGeneralSearch } from "../../../api/queries/search.queries";
import { ParamListBase } from "@react-navigation/native"
import { TextInput, TouchableOpacity } from "react-native";
import SearchHistory from "./components/SearchHistory";
import CText from "../../../../components/CText";

export interface SearchScreenProps extends RouteProp<ParamListBase> {
     params: { query: string }
}

export default function SearchScreen() {
     const [query, setQuery] = useState("");
     const [preQuery, setPreQuery] = useState("");
     const searchRef = useRef<TextInput>();
     const route = useRoute<SearchScreenProps>();
     const navigation = useNavigation();
     const searchHandle = useGeneralSearch({ query })
     useEffect(() => {
          if (searchRef.current) {
               searchRef.current.focus();
          }
     }, [searchRef.current]);
     useEffect(() => {
          if (route.params) {
               setQuery(route.params.query)
               setPreQuery(route.params.query)
          }
     }, [route.params])
     const products = useMemo(() => {
          return searchHandle.data?.data?.products ?? [];
     }, [searchHandle.data?.data?.products]);

     const categories = useMemo(() => {
          return searchHandle.data?.data?.categories ?? [];
     }, [searchHandle.data?.data?.categories]);

     return (
          <SafeScaffold>
               <HStack space={2} alignItems={"center"} backgroundColor={APP_COLOR} paddingX={NEW_XPADDING + "px"} paddingY={2}>
                    <Box flex={1}>
                         <CustomSearchInput2 value={preQuery} isLoading={searchHandle.isLoading || searchHandle.isFetching} ref={searchRef} onChangeText={(query) => {
                              setPreQuery(query);
                              debounced(query, (val) => setQuery(val))
                         }} prefix={(navigation.canGoBack()) ? <Icon onPress={() => navigation.goBack()} size="md" as={<AntDesign name="arrowleft" />} /> : undefined} placeholder="Search our catalog" autoFocus={true} />
                    </Box>
                    <CartIcon />
               </HStack>
               {
                    (products.length > 0 || categories.length > 0) ?
                         <ScrollView flex={1}>
                              {
                                   categories.map((item) => (
                                        <TouchableOpacity key={item.id} onPress={() => true}>
                                             <HStack py={2} px={NEW_XPADDING + "px"} borderBottomWidth={0.5} borderBottomColor={"gray.300"} space={1} alignItems={"center"}>
                                                  <Image size="xs" source={{ uri: item.category_icon }} />
                                                  <CText>{item.category_title}</CText>
                                             </HStack>
                                        </TouchableOpacity>
                                   ))
                              }
                              {
                                   products.map((item) => (
                                        <TouchableOpacity key={item.id} onPress={() => true}>
                                             <HStack py={2} px={NEW_XPADDING + "px"} borderBottomWidth={0.5} borderBottomColor={"gray.300"} space={1} alignItems={"center"}>
                                                  <Icon size="md" as={<Feather name={"shopping-cart"} />} />
                                                  <CText>{item.product_name}</CText>
                                             </HStack>
                                        </TouchableOpacity>
                                   ))
                              }
                         </ScrollView> :
                         <SearchHistory setQuery={(val) => {
                              searchRef.current?.setNativeProps({ text: val })
                         }} />
               }
          </SafeScaffold>
     )
}