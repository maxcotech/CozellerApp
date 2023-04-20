import { Box, ScrollView, View , Input , Button, Select} from 'native-base';
import { useState } from 'react';
import * as Contacts from "expo-contacts";


export default function AddContact(){
    const [contact,setContact] = useState({} as Contacts.Contact);
    const [loading,setLoading] = useState(false);
    const onAddContact = async () => {
        setLoading(true);
        const res = await Contacts.addContactAsync(contact);
        setLoading(false);
        toast.show("Contact Added successfully "+res,{type:"success"});
    }
    return (
        <ScrollView  backgroundColor={"white"} contentContainerStyle={{paddingHorizontal:10}} py={10} flex={1}>
            <Box py={3}>
                <Input placeholder='Enter Name' onChangeText={(name) => setContact({...contact,name})} value={contact.name} />
            </Box>
            <Box py={3}>
                <Input keyboardType="number-pad" placeholder='Phone Number' onChangeText={(value) => setContact({...contact,phoneNumbers:[{number: value,label:contact.name,isPrimary: true} as Contacts.PhoneNumber]})}  />
            </Box>
            <Box py={3}>
                <Select placeholder='Select Company Type' selectedValue={contact.contactType} onValueChange={(contactType) => setContact({...contact,contactType})} >
                    <Select.Item value={Contacts.ContactTypes.Company} label={"Company"} />
                    <Select.Item value={Contacts.ContactTypes.Person} label={"Person"} />
                </Select>
            </Box>
            <Box mt={8}>
                <Button isLoading={loading} onPress={onAddContact} py={3}>Create Contact</Button>
            </Box>
            
        </ScrollView >
    )
}