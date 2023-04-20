import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Avatar, Box, Button, Divider, FlatList, HStack, Image, Input, Text, useTheme, View, VStack } from 'native-base';
import {  useNavigation } from '@react-navigation/native';
import routes, { AppParamList } from './../../config/routes.config';
import { Center, ScrollView } from 'native-base';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useEffect, useState } from 'react';
import * as Contacts from 'expo-contacts';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Home(){
    const theme = useTheme();
    const [offset,setOffset] = useState(0);
    const pageSize = 50;

    const [search,setSearch] = useState("");
    const [loading,setLoading] = useState(false);
    const [preSearch,setPreSearch] = useState("");
    const [contacts,setContacts] = useState([] as Contacts.Contact[])
    const navigation = useNavigation<DrawerNavigationProp<typeof AppParamList>>();
    useEffect(() => {
        (async () => {
            const {status} = await Contacts.requestPermissionsAsync();
            if(status === "granted"){
                setLoading(true)
                const {data} = await Contacts.getContactsAsync({
                    pageOffset: offset,
                    pageSize,
                    name: search
                })
                setLoading(false);
                setContacts(data);

            }
        })()
        
    },[offset,search])
    return (
        <View flex={1}>
            <HStack backgroundColor={"primary.600"} pt={6} px={3} pb={3}>
                
                    <Box ml="auto">
                        <MaterialCommunityIcons onPress={() => navigation.toggleDrawer()} size={25} name="menu" color="white" />
                    </Box>
                
            </HStack>
            <ScrollView flex={1}>
            <Center mt={50}>
                <Text fontSize={25} color="primary.600">Add Contact</Text>
                <HStack alignItems="center" space={10}  my={8}>
                    <TouchableOpacity onPress={() => navigation.navigate(routes.createContacts as never)}>
                        <VStack alignItems={"center"} space={2}>
                            <Avatar size={75} backgroundColor={"primary.600"}>
                                <MaterialIcons color="white" name="add-to-photos" size={40} />
                            </Avatar>
                            <Text>Add</Text>
                        </VStack>
                    </TouchableOpacity>
                    <VStack alignItems={"center"} space={2}>
                        <Avatar size={75} backgroundColor={"primary.600"}>
                            <FontAwesome color="white" name="address-book-o" size={40} />
                        </Avatar>
                        <Text>Phone Book</Text>
                    </VStack>
                    <VStack alignItems={"center"} space={2}>
                        <Avatar size={75} backgroundColor={"primary.600"}>
                            <MaterialIcons color="white" name="mail-outline" size={40} />
                        </Avatar>
                        <Text>Email</Text>
                    </VStack>
                </HStack>
                
                <Divider />
                <Box w="100%" px={5} py={10}>
                    <Input leftElement={<Box ml={2}><MaterialIcons style={{color:"gray"}} size={18} name="search" /></Box>} fontSize="md" placeholderTextColor={"skyblue"} value={preSearch}  onChangeText={(val) => setPreSearch(val)}   placeholder="Search Contacts"   />
                    <Button isLoading={loading} onPress={() => setSearch(preSearch)} mt={3} py={2}>SEARCH</Button>
                </Box>
                </Center>
                <FlatList  onEndReached={() => setOffset(offset + pageSize)} renderItem={({item}) => (
                    <HStack w="100%" px={"20px"} py={3} alignItems="center"  space={2}>
                        <Image alt="Avatar" width={55} height={55} source={require('../../../assets/avatar.png')} />
                        <VStack>
                            <Text>{item.name}</Text>
                        </VStack>
                    </HStack>
                )} data={contacts} />
            </ScrollView>
                
                
           
            <HStack backgroundColor={"primary.600"} pt={6} px={4} pb={3}>
                <TouchableOpacity onPress={() => setSearch("")}>
                <VStack>
                <Avatar  backgroundColor={"white"}>
                    <MaterialIcons color="blue" size={20} name="person-outline" />
                </Avatar>
                <Text color="white" fontSize={7}>Refresh Contact</Text>
                </VStack>
                </TouchableOpacity>
            </HStack>
        </View>
    )
}