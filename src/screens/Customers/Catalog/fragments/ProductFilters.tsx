import { Actionsheet, Box, Checkbox, Divider, HStack, Icon, ScrollView } from "native-base";
import CText from "../../../../../components/CText";
import { AntDesign } from "@expo/vector-icons";
import { APP_COLOR, APP_COLOR_LIGHTER, APP_COLOR_LIGHTER_2, XPADDING } from "../../../../config/constants.config";
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
import RatingStars from "./RatingStars";
import CustomSelect from "../../../../../components/CustomSelect";
import { useCities, useCountries, useStates } from "../../../../api/queries/location.queries";

export default function ProductFilters({ filters, show, onClose, setParams, params }: { setParams: (val: Partial<CatalogFilters>) => void, params: Partial<CatalogFilters>, filters: CatalogFilterLimits, show: boolean, onClose: () => void }) {
     const [newParams, setNewParams] = useState<Partial<CatalogFilters>>({
          max_price: filters?.price_range?.max_price,
          min_price: filters?.price_range?.min_price,
          rating: params?.rating
     })
     const navigation = useNavigation<AppNavProps>();
     const onCategorySelect = (selected: Category) => {
          navigation.navigate(routes.customerIndex, {
               screen: routes.customerCatalog,
               merge: true,
               params: {
                    ...params,
                    category_parameter: selected.category_slug
               }
          })
          setParams({ ...params, category_parameter: selected.category_slug })
     }

     const onBrandSelect = (selected: Brand) => {
          navigation.navigate(routes.customerIndex, {
               screen: routes.customerCatalog,
               merge: true,
               params: { ...params, brand: selected.id }
          });
          setParams({ ...params, brand: selected.id })
     }

     const countryQuery = useCountries();
     const statesQuery = useStates({ country_id: newParams?.country }, { enabled: !!newParams?.country })
     const cityQuery = useCities({ state_id: newParams?.state }, { enabled: !!newParams?.state })


     return (
          <Actionsheet isOpen={show} onClose={onClose}>

               <Actionsheet.Content >
                    <CText>Filter Products</CText>
                    <ScrollView width="100%" showsVerticalScrollIndicator={false}>
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

                              </HStack>
                              <Divider thickness={0.5} />
                              <Box paddingX={"10px"} paddingY={"10px"}>

                                   <HStack space={3} marginTop={"5px"} alignItems="center" justifyContent="space-between">
                                        <Box flex={1}>
                                             <CustomInput labelText="Min. Price" value={newParams.min_price?.toString()} onChangeText={(val) => setNewParams({ ...newParams, min_price: (val) ? parseFloat(val) : 0 })} prefix={<CText>{decode(filters?.currency?.currency_sym)}</CText>} placeholder="Min" keyboardType="number-pad" backgroundColor={APP_COLOR_LIGHTER} />

                                        </Box>
                                        <Icon size="md" as={<AntDesign name="arrowright" />} />

                                        <Box flex={1}>
                                             <CustomInput labelText="Max. Price" value={newParams.max_price?.toString()} onChangeText={(val) => setNewParams({ ...newParams, max_price: (val) ? parseFloat(val) : 0 })} prefix={<CText>{decode(filters?.currency?.currency_sym)}</CText>} placeholder="Max" keyboardType="number-pad" backgroundColor={APP_COLOR_LIGHTER} />
                                        </Box>

                                   </HStack>
                              </Box>

                         </Box>
                         <Box marginTop="10px" bgColor={APP_COLOR_LIGHTER_2} borderRadius={8}>
                              <Box paddingX="10px" paddingY={"10px"}>
                                   <CText>Filter By Rating</CText>
                              </Box>
                              <Divider thickness={0.5} />
                              <Box paddingX="10px" paddingY={"10px"}>
                                   <HStack marginY="5px" space={2}>
                                        <Checkbox value="rating" onChange={() => setNewParams({ ...newParams, rating: 4 })} isChecked={(newParams.rating === 4)} />
                                        <RatingStars rating={4} />
                                        <CText>& Above</CText>
                                   </HStack>
                                   <HStack marginY="5px" space={2}>
                                        <Checkbox value="rating" onChange={() => setNewParams({ ...newParams, rating: 3 })} isChecked={(newParams.rating === 3)} />
                                        <RatingStars rating={3} />
                                        <CText>& Above</CText>
                                   </HStack>
                                   <HStack marginY="5px" space={2}>
                                        <Checkbox value="rating" onChange={() => setNewParams({ ...newParams, rating: 2 })} isChecked={(newParams.rating === 2)} />
                                        <RatingStars rating={2} />
                                        <CText>& Above</CText>
                                   </HStack>
                                   <HStack marginY="5px" space={2}>
                                        <Checkbox value="rating" onChange={() => setNewParams({ ...newParams, rating: 1 })} isChecked={(newParams.rating === 1)} />
                                        <RatingStars rating={1} />
                                        <CText>& Above</CText>
                                   </HStack>
                                   <HStack marginY="5px" space={2}>
                                        <Checkbox value="rating" onChange={() => setNewParams({ ...newParams, rating: 0 })} isChecked={(newParams.rating === 0)} />
                                        <RatingStars rating={0} />
                                        <CText>& Above</CText>
                                   </HStack>
                              </Box>
                         </Box>
                         <Box marginTop="10px" bgColor={APP_COLOR_LIGHTER_2} borderRadius={8}>
                              <Box paddingX="10px" paddingY={"10px"}>
                                   <CText>Location</CText>
                              </Box>
                              <Divider thickness={0.5} />
                              <Box paddingX="10px" paddingY={"5px"}>
                                   <CustomSelect my="5px" placeholder="Select country" labelText="Country" isLoading={countryQuery.isLoading} backgroundColor={APP_COLOR_LIGHTER} onValueChange={(val) => setNewParams({ ...newParams, country: val })} value={newParams.country} valueKey="id" titleKey={"country_name"} options={countryQuery?.data?.data ?? []} />
                                   <CustomSelect searchPlaceholder="Search states..." includeSearch={true} my="5px" placeholder="Select State" labelText="State" isLoading={statesQuery.isLoading} backgroundColor={APP_COLOR_LIGHTER} onValueChange={(val) => setNewParams({ ...newParams, state: val })} value={newParams.state} valueKey="id" titleKey={"state_name"} options={statesQuery?.data?.data ?? []} />
                                   <CustomSelect searchPlaceholder="Search cities..." includeSearch={true} my="5px" placeholder="Select City/Region" labelText="City" isLoading={cityQuery.isLoading} backgroundColor={APP_COLOR_LIGHTER} onValueChange={(val) => setNewParams({ ...newParams, city: val })} value={newParams.city} valueKey="id" titleKey={"city_name"} options={cityQuery?.data?.data ?? []} />
                              </Box>
                         </Box>
                         <Box mt="20px">
                              <AppBtn onPress={() => {
                                   setParams({ ...params, ...newParams });
                                   onClose();
                              }}>Apply Filters</AppBtn>
                         </Box>
                         <Box mt="10px">
                              <AppBtn
                                   backgroundColor={"transparent"}
                                   textColor={APP_COLOR}
                                   onPress={() => {
                                        setParams({});
                                        onClose();
                                   }}
                              >Reset Filters</AppBtn>
                         </Box>

                    </ScrollView>
               </Actionsheet.Content>
          </Actionsheet>
     )
}