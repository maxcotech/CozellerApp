import React from "react";
import { Center, View, Image, Button, ScrollView, HStack, Box, Text, Input } from 'native-base';
import AppContext from "../../contexts/AppContext";
import { AccountFormData } from "../../config/data_types/account_types";
import { ProfileTabOptions } from "../../config/enum.config";
import { useUpdateAccount } from "../../api/queries/account.queries";
import { renderErrorText } from "../../helpers/message.helpers";



export default function Profile() {
    const appContext = React.useContext(AppContext);
    const [currentTab, setCurrentTab] = React.useState(ProfileTabOptions.Profile)
    const [errors,setErrors] = React.useState({
        full_name: "",
        user_name: "",
        contact_number: "",
        email: "",
    })
    const {isLoading,mutate} = useUpdateAccount({
        onError: (data) => {setErrors(data.errors)},
        onSuccess: (data) => {
            toast.show(data.message,{type:"success"});
        }
    })
    const [formState, setFormState] = React.useState({
        id: appContext?.authData?.user?.id,
        full_name: appContext?.authData?.user?.full_name,
        user_name: appContext?.authData?.user?.user_name,
        contact_number: appContext?.authData?.user?.contact_number,
        email: appContext?.authData?.user?.email,
    } as Partial<AccountFormData>)

   
    return (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 15 }} flex={1}>
            <Center my={50}>
                <Image height={100} width={100} source={(appContext.authData.user?.profile_image_url) ?
                    { uri: appContext.authData.user?.profile_image_url } : require("../../../assets/avatar.png")} />
            </Center>
            <Button py={3}>Top Badges</Button>
            <HStack pt={10}>
                <Box flex={1}><Button borderColor="primary.600" borderWidth={1} color={(currentTab !== ProfileTabOptions.Profile) ? "black" : undefined} onPress={() => setCurrentTab(ProfileTabOptions.Profile)} backgroundColor={(currentTab !== ProfileTabOptions.Profile) ? "white" : undefined} py={3}>
                    <Text color={(currentTab !== ProfileTabOptions.Profile) ? "black" : "white"}>
                        Profile
                    </Text>

                </Button></Box>
                <Box flex={1}><Button borderColor="primary.600" borderWidth={1} color={(currentTab !== ProfileTabOptions.Social) ? "black" : undefined} onPress={() => setCurrentTab(ProfileTabOptions.Social)} backgroundColor={(currentTab !== ProfileTabOptions.Social) ? "white" : undefined} py={3}>
                    <Text color={(currentTab !== ProfileTabOptions.Social) ? "black" : "white"}>Social</Text></Button></Box>
                <Box flex={1}><Button borderColor="primary.600" borderWidth={1} color={(currentTab !== ProfileTabOptions.Links) ? "black" : undefined} onPress={() => setCurrentTab(ProfileTabOptions.Links)} backgroundColor={(currentTab !== ProfileTabOptions.Links) ? "white" : undefined} py={3}>
                    <Text color={(currentTab !== ProfileTabOptions.Links) ? "black" : "white"}>
                        Links</Text></Button></Box>
            </HStack>
            <View mt={5}>
                {
                    (currentTab === ProfileTabOptions.Profile)?
                    <Box>
                        <Box my={3}>
                            <Input fontSize="md" placeholderTextColor={"skyblue"} borderWidth={0} borderBottomWidth={2} onChangeText={(user_name) => setFormState({...formState,user_name})}   placeholder="User Name"  value={formState.user_name}  />
                            <Text color="red.400" fontSize={12}>{renderErrorText(errors.user_name)}</Text>
                        </Box>
                        <Box my={3}>
                            <Input fontSize="md" placeholderTextColor={"skyblue"} borderWidth={0} borderBottomWidth={2} onChangeText={(full_name) => setFormState({...formState,full_name})}   placeholder="Full Name"  value={formState.full_name}  />
                            <Text color="red.400" fontSize={12}>{renderErrorText(errors.full_name)}</Text>

                        </Box>
                        <Box my={3}>
                            <Input   keyboardType="phone-pad" fontSize="md" placeholderTextColor={"skyblue"} borderWidth={0} borderBottomWidth={2} onChangeText={(contact_number) => setFormState({...formState,contact_number})}   placeholder="Mobile Number"  value={formState.contact_number}  />
                            <Text color="red.400" fontSize={12}>{renderErrorText(errors.contact_number)}</Text>

                        </Box>
                        <Box my={3}>
                            <Input  keyboardType="email-address" fontSize="md" placeholderTextColor={"skyblue"} borderWidth={0} borderBottomWidth={2} onChangeText={(email) => setFormState({...formState,email})}   placeholder="Email Address"  value={formState.email}  />
                            <Text color="red.400" fontSize={12}>{renderErrorText(errors.email)}</Text>

                        </Box>

                        <Box py={10}>
                            <Button isLoading={isLoading} onPress={() => mutate(formState)} py={3}>Apply Changes</Button>
                        </Box>
                        
                    </Box>:<></>
                }
            </View>
        </ScrollView>
    )
}