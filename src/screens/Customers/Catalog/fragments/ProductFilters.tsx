import { Actionsheet, Box, Divider, HStack, Icon, Progress, ScrollView, Slider } from "native-base";
import CText from "../../../../../components/CText";
import { useContext } from 'react';
import CatalogContext from "../../../../contexts/CatalogContext";
import { AntDesign } from "@expo/vector-icons";
import { APP_COLOR_LIGHTER, APP_COLOR_LIGHTER_2, XPADDING } from "../../../../config/constants.config";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../../config/routes.config";
import { TouchableOpacity } from 'react-native';
import { CategoryOptionsRouteParams } from "../../../Vendors/CategoryOptions/CategoryOptions";
import { Category } from "../../../../config/data_types/category_types";
import { CatalogFilterLimits, CatalogFilters } from "../../../../config/data_types/catalog.types";
import { BrandRouteParams } from "../../../Vendors/BrandOptions/BrandOptions";
import { Brand } from "../../../../config/data_types/brand_types";
import AppBtn from "../../../../../components/AppBtn";
import CustomInput from "../../../../../components/CustomInput";
import { useState } from 'react';
import { decode } from 'html-entities';

export default function ProductFilters({ filters, show, onClose, setParams, params }: { setParams: (val: Partial<CatalogFilters>) => void, params: Partial<CatalogFilters>, filters: CatalogFilterLimits, show: boolean, onClose: () => void }) {
     const context = useContext(CatalogContext);
     const [priceRange, setPriceRange] = useState<Partial<CatalogFilters>>({
          max_price: filters?.price_range?.max_price,
          min_price: filters?.price_range?.min_price
     })
     const navigation = useNavigation<AppNavProps>();
     const onCategorySelect = (selected: Category) => {
          navigation.navigate(routes.customerIndex, {
               screen: routes.customerCatalog,
               merge: true,
               params: {
                    ...context.filters,
                    category_parameter: selected.category_slug
               }
          })
     }

     const onBrandSelect = (selected: Brand) => {
          navigation.navigate(routes.customerIndex, {
               screen: routes.customerCatalog,
               merge: true,
               params: { ...context.filters, brand: selected.id }
          });
     }
     return (
          <Actionsheet isOpen={show} onClose={onClose}>

               <Actionsheet.Content >
                    <CText>Filter Products</CText>
                    <ScrollView width="100%">
                         <Box marginY={"10px"} borderRadius={8} bgColor={APP_COLOR_LIGHTER_2}>
                              <TouchableOpacity onPress={() => {

                                   navigation.navigate(routes.categoryOptions, {
                                        onSelect: onCategorySelect,
                                        parent: (filters?.main_category?.category_slug ?? undefined)
                                   } as CategoryOptionsRouteParams)
                                   onClose();
                              }}>
                                   <HStack paddingX={"10px"} paddingY={"15px"} space={2} justifyContent={"space-between"} alignItems={"center"}>
                                        <CText>Filter by categories</CText>
                                        <Icon color="gray.400" size="sm" as={<AntDesign name="right" />} />
                                   </HStack>
                              </TouchableOpacity>

                              <Divider thickness={0.5} />
                              <TouchableOpacity onPress={() => {
                                   navigation.navigate(routes.brandOptions, {
                                        onSelect: onBrandSelect
                                   } as BrandRouteParams)
                                   onClose();
                              }}>
                                   <HStack paddingX={"10px"} paddingY={"15px"} space={2} justifyContent={"space-between"} alignItems={"center"}>
                                        <CText>Filter by Brands</CText>
                                        <Icon color="gray.400" size="sm" as={<AntDesign name="right" />} />
                                   </HStack>
                              </TouchableOpacity>

                         </Box>
                         <Box bgColor={APP_COLOR_LIGHTER_2} borderRadius={8}>
                              <HStack alignItems="center" justifyContent="space-between" paddingX={"10px"} paddingY={"10px"}>
                                   <CText>Price Range</CText>
                                   <Box>
                                        <AppBtn onPress={() => {
                                             onClose();
                                             setParams({ ...params, ...priceRange })
                                        }}>Apply</AppBtn>
                                   </Box>
                              </HStack>
                              <Divider thickness={0.5} />
                              <Box paddingX={"10px"} paddingY={"10px"}>
                                   <HStack space={3} marginTop={"10px"} alignItems="center" justifyContent="space-between">
                                        <Box flex={1}>
                                             <CustomInput value={priceRange.min_price?.toString()} onChangeText={(val) => setPriceRange({ ...priceRange, min_price: (val) ? parseFloat(val) : 0 })} suffix={<CText>{decode(filters?.currency?.currency_sym)}</CText>} placeholder="Min" keyboardType="number-pad" backgroundColor={APP_COLOR_LIGHTER} />

                                        </Box>
                                        <Icon size="md" as={<AntDesign name="arrowright" />} />

                                        <Box flex={1}>
                                             <CustomInput value={priceRange.max_price?.toString()} onChangeText={(val) => setPriceRange({ ...priceRange, max_price: (val) ? parseFloat(val) : 0 })} suffix={<CText>{decode(filters?.currency?.currency_sym)}</CText>} placeholder="Max" keyboardType="number-pad" backgroundColor={APP_COLOR_LIGHTER} />
                                        </Box>

                                   </HStack>
                              </Box>

                         </Box>
                    </ScrollView>
               </Actionsheet.Content>
          </Actionsheet>
     )
}