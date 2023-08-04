import { Actionsheet, Box, Checkbox, HStack, Image, KeyboardAvoidingView, ScrollView, VStack } from "native-base";
import { CreateReviewData, Review } from "../../../../config/data_types/reviews_types";
import { TouchableOpacity } from 'react-native';
import { APP_COLOR_LIGHTER_2 } from "../../../../config/constants.config";
import CText from "../../../../../components/CText";
import Money from "../../../../../components/Money";
import { useProfile } from "../../../../api/queries/account.queries";
import RatingStars from "../../Catalog/fragments/RatingStars";
import AppBtn from "../../../../../components/AppBtn";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../../config/routes.config";
import { getProperKeyboardAvoidingArea } from "../../../../helpers/platform.helpers";
import { useState } from 'react';
import CustomInput from "../../../../../components/CustomInput";
import { ReviewQueryKeys, useCreateReview } from "../../../../api/queries/reviews.queries";
import { useQueryClient } from "react-query";

export default function PendingReviewItem({ item }: { item: Review }) {
     const profileQuery = useProfile({})
     const queryClient = useQueryClient();
     const initFormData: CreateReviewData = {
          product_id: item.product_id,
          variation_id: item.variation_id,
          star_rating: 0,
          review_comment: "",
          product_type: item.product_type
     }
     const [reviewForm, setReviewForm] = useState<CreateReviewData>(initFormData);
     const [showCreateForm, setShowCreateForm] = useState(false);
     const createReviewHandle = useCreateReview({
          onError(data) {
               toast.show(data?.message, { type: "danger" })
          },
          onSuccess(data) {
               setShowCreateForm(false);
               setReviewForm(initFormData);
               toast.show(data?.message, { type: "success" });
               queryClient.invalidateQueries({ queryKey: [ReviewQueryKeys.fetchPendingReviews] })
          }
     })
     const navigation = useNavigation<AppNavProps>();
     return (
          <>
               <TouchableOpacity onPress={() => navigation.navigate(routes.customerProductDetails, { id: item.product_id })}>
                    <HStack borderRadius={8} bgColor={APP_COLOR_LIGHTER_2} style={{ overflow: "hidden" }}>
                         <Image height="140px" width="140px" source={{ uri: item?.variation?.variation_image ?? item?.product?.product_image }} />
                         <VStack p="8px" flex={1}>
                              <CText numberOfLines={1}>{item.product?.product_name}</CText>
                              {
                                   (item.variation?.variation_name) ?
                                        <CText color="gray.400">Variation: {item.variation?.variation_name}</CText> : <></>
                              }
                              <Money fontWeight={"bold"} currencySym={profileQuery?.data?.data?.currency?.currency_sym}>{item.product?.current_price}</Money>
                              <Box my="5px" mb="auto">
                                   <RatingStars rating={item.star_rating ?? 0} />
                              </Box>
                              <AppBtn onPress={() => setShowCreateForm(true)} textVariant="body4">Add Review</AppBtn>
                         </VStack>
                    </HStack>
               </TouchableOpacity>
               <Actionsheet isOpen={showCreateForm} onClose={() => setShowCreateForm(false)}>
                    <Actionsheet.Content>
                         <CText>Review {item.product?.product_name}</CText>
                         <ScrollView width="100%">
                              <KeyboardAvoidingView behavior={getProperKeyboardAvoidingArea()}>
                                   <Box paddingX="10px" marginTop="10px" borderRadius={8}>
                                        <Box paddingTop={"10px"} paddingBottom={"4px"}>
                                             <CText color="gray.500">Rate this product</CText>
                                        </Box>
                                        <Box borderRadius={8} backgroundColor={APP_COLOR_LIGHTER_2} paddingX="15px">

                                             <Box paddingY={"10px"}>
                                                  <HStack alignItems={"center"} marginY="5px" space={5}>
                                                       <Checkbox value="rating" onChange={() => setReviewForm({ ...reviewForm, star_rating: 5 })} isChecked={(reviewForm.star_rating === 5)} />
                                                       <RatingStars size="lg" spacing={5} rating={5} />

                                                  </HStack>
                                                  <HStack alignItems={"center"} marginY="5px" space={5}>
                                                       <Checkbox value="rating" onChange={() => setReviewForm({ ...reviewForm, star_rating: 4 })} isChecked={(reviewForm.star_rating === 4)} />
                                                       <RatingStars size="lg" spacing={5} rating={4} />

                                                  </HStack>
                                                  <HStack alignItems={"center"} marginY="5px" space={5}>
                                                       <Checkbox value="rating" onChange={() => setReviewForm({ ...reviewForm, star_rating: 3 })} isChecked={(reviewForm.star_rating === 3)} />
                                                       <RatingStars size="lg" spacing={5} rating={3} />

                                                  </HStack>
                                                  <HStack alignItems={"center"} marginY="5px" space={5}>
                                                       <Checkbox value="rating" onChange={() => setReviewForm({ ...reviewForm, star_rating: 2 })} isChecked={(reviewForm.star_rating === 2)} />
                                                       <RatingStars size="lg" spacing={5} rating={2} />

                                                  </HStack>
                                                  <HStack alignItems={"center"} marginY="5px" space={5}>
                                                       <Checkbox value="rating" onChange={() => setReviewForm({ ...reviewForm, star_rating: 1 })} isChecked={(reviewForm.star_rating === 1)} />
                                                       <RatingStars size="lg" spacing={5} rating={1} />

                                                  </HStack>

                                             </Box>
                                        </Box>



                                        <CustomInput value={reviewForm.review_comment} onChangeText={(review_comment) => setReviewForm({ ...reviewForm, review_comment })} my={"10px"} backgroundColor={APP_COLOR_LIGHTER_2} labelText="Add Comment" placeholder="Enter your comment" multiline={true} numberOfLines={5} />
                                        <Box mt="20px" mb="10px">
                                             <AppBtn isLoading={createReviewHandle.isLoading} onPress={() => createReviewHandle.mutate(reviewForm)} borderRadius={8}>Submit</AppBtn>

                                        </Box>
                                   </Box>

                              </KeyboardAvoidingView>
                         </ScrollView>

                    </Actionsheet.Content>
               </Actionsheet>
          </>
     )
}