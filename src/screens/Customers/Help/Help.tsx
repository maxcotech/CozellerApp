import { Box, Circle, Divider, HStack, Icon, ScrollView, VStack, View } from "native-base";
import AppBar from "../../../../components/AppBar";
import { APP_COLOR, FACEBOOK_HANDLE, NEW_XPADDING, TELEGRAM_CHANNEL, TWITTER_HANDLE, XPADDING } from "../../../config/constants.config";
import CustomInput from "../../../../components/CustomInput";
import { useState } from 'react';
import { SupportMessageData } from "../../../config/data_types/account_types";
import AppBtn from "../../../../components/AppBtn";
import CText from "../../../../components/CText";
import { useSendSupportMessage } from "../../../api/queries/account.queries";
import { Image } from "native-base";
import { TouchableOpacity } from 'react-native';
import { openUrl } from "../../../helpers/url.helpers";
import WhatsappOptions from "./fragments/WhatsappOptions";
import InstagramOptions from "./fragments/InstagramOptions";
import { Ionicons } from "@expo/vector-icons";
import { APP_COLOR_LIGHTER } from './../../../config/constants.config';

export default function Help() {
     const [formState, setFormState] = useState<SupportMessageData>({} as SupportMessageData)
     const [showWhatsappOptions, setShowWhatsappOptions] = useState(false);
     const [showInstagramOptions, setShowInstagramOptions] = useState(false);
     const supportMessage = useSendSupportMessage({
          onError(data) { toast.show(data?.message, { type: "danger" }); },
          onSuccess(data) {
               setFormState({} as SupportMessageData);
               toast.show(data?.message, { type: "success" });
          }
     })
     return <><View flex={1}>
          <AppBar textColor="white" title="Help Desk" backgroundColor={APP_COLOR} />
          <ScrollView contentContainerStyle={{ paddingVertical: 10 }} paddingX={XPADDING} flex={1}>
               <CustomInput onChangeText={(email_address) => setFormState({ ...formState, email_address })} value={formState.email_address} placeholder="Enter your email address" labelText="Email" keyboardType="email-address" />
               <CustomInput textAlignVertical="top" multiline={true} my={"10px"} numberOfLines={5} onChangeText={(message) => setFormState({ ...formState, message })} value={formState.message} placeholder="Enter your message" labelText="Message" />
               <Box my="10px">
                    <AppBtn isLoading={supportMessage.isLoading} onPress={() => supportMessage.mutate(formState)} elevation={8}>Submit</AppBtn>
               </Box>
               <HStack alignItems="center">
                    <Box flex={1}>
                         <Divider />
                    </Box>
                    <CText fontWeight={"bold"} marginX="10px">OR</CText>
                    <Box flex={1}>
                         <Divider />
                    </Box>
               </HStack>
               <CText variant="body3" color="gray.400" textAlign="center">You can also contact us and join our ever growing community via any of our following social handles.</CText>
               <HStack space={4} justifyContent={"center"} alignItems="center" mt="20px">
                    <TouchableOpacity onPress={() => openUrl(TELEGRAM_CHANNEL)}>
                         <Circle overflow={"hidden"}>
                              <Image resizeMode="cover" width="40px" height="40px" source={require('../../../../assets/telegram.png')} />
                         </Circle>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openUrl(FACEBOOK_HANDLE)}>
                         <Circle overflow={"hidden"}>
                              <Image resizeMode="cover" width="35px" height="35px" source={require('../../../../assets/facebook.png')} />
                         </Circle>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowWhatsappOptions(true)}>
                         <Circle overflow={"hidden"}>
                              <Image resizeMode="cover" width="35px" height="35px" source={require('../../../../assets/whatsapp.png')} />
                         </Circle>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowInstagramOptions(true)}>
                         <Circle overflow={"hidden"}>
                              <Image resizeMode="cover" width="35px" height="35px" source={require('../../../../assets/instagram.png')} />
                         </Circle>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openUrl(TWITTER_HANDLE)}>
                         <Circle overflow={"hidden"}>
                              <Image resizeMode="cover" width="35px" height="35px" source={require('../../../../assets/twitter.png')} />
                         </Circle>
                    </TouchableOpacity>

               </HStack>
               <CText fontWeight={"bold"} color={APP_COLOR} textAlign="center" mt="30px" mb="10px">Our call lines</CText>
               <TouchableOpacity onPress={() => openUrl("tel:+2348129611090")}>
                    <HStack space={2} paddingY="8px" marginX={NEW_XPADDING} backgroundColor={APP_COLOR_LIGHTER} borderRadius={20} alignItems="center" justifyContent={"center"}>
                         <Icon color={APP_COLOR} size="md" as={<Ionicons name="call-outline" />} />
                         <CText color={APP_COLOR} fontWeight={"bold"}>+2348129611090</CText>
                    </HStack>
               </TouchableOpacity>
               <Box my="5px" />
               <TouchableOpacity onPress={() => openUrl("tel:+447438455963")}>
                    <HStack space={2} paddingY="8px" marginX={NEW_XPADDING} backgroundColor={APP_COLOR_LIGHTER} borderRadius={20} alignItems="center" justifyContent={"center"}>
                         <Icon color={APP_COLOR} size="md" as={<Ionicons name="call-outline" />} />
                         <CText color={APP_COLOR} fontWeight={"bold"}>+447438455963</CText>
                    </HStack>
               </TouchableOpacity>

          </ScrollView>

     </View>
          <WhatsappOptions onClose={() => setShowWhatsappOptions(false)} show={showWhatsappOptions} />
          <InstagramOptions onClose={() => setShowInstagramOptions(false)} show={showInstagramOptions} />
     </>
}