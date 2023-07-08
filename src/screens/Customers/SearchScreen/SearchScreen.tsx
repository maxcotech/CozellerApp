import { Box, HStack, Icon, Image, ScrollView } from "native-base";
import SafeScaffold from "../../../../components/SafeScaffold";
import { CustomSearchInput2 } from "../../../../components/CustomInput";
import { APP_COLOR, NEW_XPADDING } from "../../../config/constants.config";
import CartIcon from "../components/CartIcon";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useEffect, useRef, useState, useMemo } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { debounced } from "../../../helpers/value.helpers";
import { useGeneralSearch, useSaveSearchQuery } from "../../../api/queries/search.queries";
import { ParamListBase } from "@react-navigation/native"
import { TextInput, TouchableOpacity } from "react-native";
import SearchHistory from "./components/SearchHistory";
import CText from "../../../../components/CText";
import { CategorySearchResult, ProductSearchResult } from "../../../config/data_types/search_types";
import routes, { AppNavProps } from "../../../config/routes.config";

export interface SearchScreenProps extends RouteProp<ParamListBase> {
     params: { query: string }
}

export default function SearchScreen() {
     const [query, setQuery] = useState("");
     const [preQuery, setPreQuery] = useState("");
     const searchRef = useRef<TextInput>();
     const route = useRoute<SearchScreenProps>();
     const navigation = useNavigation<AppNavProps>();
     const searchHandle = useGeneralSearch({ query });
     const searchMutation = useSaveSearchQuery({});

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

     const onSelectItem = (item: ProductSearchResult | CategorySearchResult) => {
          if ('product_name' in item) {
               navigation.navigate(routes.customerProductDetails, { product: item.id })
          } else {
               navigation.navigate(routes.customerCatalog, { category_parameter: item.id })
          }
          searchMutation.mutate(query);

     }

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
                                        <TouchableOpacity key={item.id} onPress={() => onSelectItem(item)}>
                                             <HStack py={2} px={NEW_XPADDING + "px"} borderBottomWidth={0.5} borderBottomColor={"gray.300"} space={1} alignItems={"center"}>
                                                  <Image alt={item.category_title} size="xs" source={{ uri: item.category_icon }} />
                                                  <CText>{item.category_title}</CText>
                                             </HStack>
                                        </TouchableOpacity>
                                   ))
                              }
                              {
                                   products.map((item) => (
                                        <TouchableOpacity key={item.id} onPress={() => onSelectItem(item)}>
                                             <HStack py={2} px={NEW_XPADDING + "px"} borderBottomWidth={0.5} borderBottomColor={"gray.300"} space={1} alignItems={"center"}>
                                                  <Image alt={item.product_name} size="xs" source={{ uri: item.product_image }} />
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