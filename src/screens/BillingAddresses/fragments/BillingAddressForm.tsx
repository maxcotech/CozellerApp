import { Box, HStack, KeyboardAvoidingView, ScrollView } from "native-base";
import { getProperKeyboardAvoidingArea } from "../../../helpers/platform.helpers";
import { BillingAddress } from "../../../config/data_types/billing_address.types";
import { useState } from "react";
import CustomInput from "../../../../components/CustomInput";
import { createFormErrorObject } from "../../../helpers/message.helpers";
import SelectTelephoneCode from "../../Register/fragments/SelectTelephoneCode";
import CustomSelect from "../../../../components/CustomSelect";
import { useCities, useCountries, useStates } from "../../../api/queries/location.queries";
import AppBtn from "../../../../components/AppBtn";

export interface BillingAddressFormProps {
     defaultData?: BillingAddress,
     handleSubmit: (formState: any, onErrors: (errors: any) => void) => void,
     isLoading?: boolean
}

export default function BillingAddressForm({ defaultData, isLoading = false, handleSubmit }: BillingAddressFormProps) {
     const countryHandle = useCountries();
     const [formState, setFormState] = useState({
          'id': defaultData?.id ?? undefined,
          'first_name': defaultData?.first_name ?? "",
          'last_name': defaultData?.last_name ?? "",
          'street_address': defaultData?.street_address ?? "",
          'postal_code': defaultData?.postal_code ?? "",
          'phone_number': defaultData?.phone_number,
          'telephone_code': defaultData?.telephone_code ?? "+44",
          'additional_number': defaultData?.additional_number ?? "",
          'additional_telephone_code': defaultData?.additional_telephone_code ?? "",
          'country_id': defaultData?.country_id ?? "",
          'state_id': defaultData?.state_id ?? "",
          'city_id': defaultData?.city_id ?? ""
     })
     const [errors, setErrors] = useState(createFormErrorObject(formState));
     const stateHandle = useStates({ country_id: formState.country_id as number }, { enabled: (!!formState.country_id) });
     const cityHandle = useCities({ state_id: formState.state_id as number }, { enabled: (!!formState.state_id) })

     const setFormValue = (val: any, key: keyof typeof formState) => setFormState({ ...formState, [key]: val })
     return (
          <KeyboardAvoidingView flex={1} behavior={getProperKeyboardAvoidingArea()}>
               <ScrollView flex={1}>
                    <HStack alignItems="center" space={2}>
                         <Box flex={1}>
                              <CustomInput placeholder="Enter first name" error={errors.first_name} labelText="First Name*" onChangeText={(val) => setFormValue(val, "first_name")} value={formState.first_name} />

                         </Box>
                         <Box flex={1}>
                              <CustomInput placeholder="Enter last name" error={errors.last_name} labelText="Last Name*" onChangeText={(val) => setFormValue(val, "last_name")} value={formState.last_name} />

                         </Box>
                    </HStack>
                    <Box >
                         <CustomInput
                              error={errors.phone_number || errors.telephone_code}
                              onChangeText={(val) => setFormValue(val, "phone_number")}
                              prefix={<SelectTelephoneCode setValue={(val) => setFormValue(val, "telephone_code")} value={formState.telephone_code} />}
                              keyboardType="phone-pad" value={formState.phone_number} labelText="Phone Number*" my="8px" placeholder="eg. 7067532057"
                         />
                    </Box>
                    <Box >
                         <CustomInput
                              error={errors.additional_number || errors.additional_telephone_code}
                              onChangeText={(val) => setFormValue(val, "additional_number")}
                              prefix={<SelectTelephoneCode setValue={(val) => setFormValue(val, "additional_telephone_code")} value={formState.additional_telephone_code} />}
                              keyboardType="phone-pad" value={formState.additional_number} labelText="Additional Phone" my="8px" placeholder="eg. 7067532057"
                         />
                    </Box>
                    <Box mb={"10px"}>
                         <CustomInput placeholder="Enter Street Address" error={errors.street_address} labelText="Street Address*" onChangeText={(val) => setFormValue(val, "street_address")} value={formState.street_address} />
                    </Box>
                    <Box mb={"10px"}>
                         <CustomSelect error={errors.country_id} valueKey="id" titleKey="country_name" placeholder="Select country" labelText="Country*" value={formState.country_id} onValueChange={(val) => setFormValue(val, "country_id")} isLoading={countryHandle?.isLoading} options={countryHandle?.data?.data ?? []} />
                    </Box>
                    <Box mb={"10px"}>
                         <CustomSelect error={errors.state_id} includeSearch={true} valueKey="id" titleKey="state_name" placeholder="Select State" labelText="State / Province*" value={formState.state_id} onValueChange={(val) => setFormValue(val, "state_id")} isLoading={stateHandle?.isLoading} options={stateHandle?.data?.data ?? []} />
                    </Box>
                    <Box mb={"10px"}>
                         <CustomSelect error={errors.city_id} includeSearch={true} valueKey="id" titleKey="city_name" placeholder="Select City" labelText="City / Region*" value={formState.city_id} onValueChange={(val) => setFormValue(val, "city_id")} isLoading={cityHandle?.isLoading} options={cityHandle?.data?.data ?? []} />
                    </Box>

               </ScrollView>
               <Box my={2}>
                    <AppBtn onPress={() => handleSubmit(formState, setErrors)} isLoading={isLoading}>Continue</AppBtn>
               </Box>
          </KeyboardAvoidingView>
     )
}