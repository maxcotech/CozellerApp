import { Box, HStack, Icon, Image, KeyboardAvoidingView, ScrollView, VStack, View } from "native-base";
import AppBar from "../../../../components/AppBar";
import SafeScaffold from "../../../../components/SafeScaffold";
import AppBtn from "../../../../components/AppBtn";
import { XPADDING } from "../../../config/constants.config";
import CustomInput, { CustomSearchInput } from "../../../../components/CustomInput";
import { useMemo, useState } from "react";
import { JoinStoreFormData, Store } from "../../../config/data_types/store_types";
import { TouchableOpacity } from "react-native";
import CText from "../../../../components/CText";
import { Ionicons } from "@expo/vector-icons";
import { useJoinStore, useSearchStores } from "../../../api/queries/store.queries";
import { errorMessage, successMessage } from "../../../helpers/message.helpers";
import { getProperKeyboardAvoidingArea } from "../../../helpers/platform.helpers";

export default function JoinStore() {
    const [selectedStore, setSelectedStore] = useState<Store>(null);
    const [query, setQuery] = useState<string>("");
    const [accessKey, setAccessKey] = useState<string>("");
    const [errors, setErrors] = useState({
        access_key: [],
        store_id: []
    })
    const searchQuery = useSearchStores(query, {
        enabled: (!!query && selectedStore === null)
    });
    const joinMutation = useJoinStore({
        onSuccess: (data) => {
            successMessage(data?.message);
            setSelectedStore(null);
            setAccessKey("");
        },
        onError: (data) => {
            errorMessage(data?.message);
            setErrors(data?.data);
        }
    })

    const stores = useMemo(() => {
        return searchQuery?.data?.data ?? [];
    }, [searchQuery?.data?.data])

    const onSelectStore = (store: Store) => {
        setSelectedStore(store);
    }

    const onSubmit = () => {
        const data: JoinStoreFormData = {
            access_key: accessKey,
            store_id: selectedStore?.id
        }
        joinMutation.mutate(data);
    }

    return (
        <SafeScaffold>
            <AppBar title="Join A Store" subtitle="Fill in the details to file a join request" />
            <View flex={1} pt="15px" px={XPADDING} >
                <KeyboardAvoidingView flex={1} behavior={getProperKeyboardAvoidingArea()}>
                    <Box flex={1}>
                        <Box my="8px">
                            {
                                (!!selectedStore?.id === false) ?
                                    <>
                                        <CustomSearchInput onChangeText={(query) => setQuery(query)} isLoading={searchQuery.isLoading || searchQuery.isRefetching} borderRadius={8} backgroundColor={"gray.100"} labelText="Search Stores" placeholder="Search For Stores..." />
                                        {
                                            (stores.length > 0) ?
                                                <Box>
                                                    <ScrollView my="8px" maxHeight={"400px"} shadow={9} backgroundColor={"white"} borderRadius="md" >
                                                        {
                                                            stores.map((store) => (
                                                                <TouchableOpacity onPress={() => onSelectStore(store)} key={store.id}>
                                                                    <HStack alignItems="center" width="full" space={1} px="10px" py="10px" borderBottomColor={"gray.100"} borderBottomWidth={1}>
                                                                        <Image alt={store.store_name ?? "Store Name"} rounded="md" width="50px" height="50px" backgroundColor={"gray.200"} source={{ uri: store.store_logo }} />
                                                                        <VStack flex={1}>
                                                                            <CText>{store.store_name}</CText>
                                                                            <CText numberOfLines={1} color="gray.400" variant="body3">{store.store_address}</CText>
                                                                        </VStack>
                                                                    </HStack>
                                                                </TouchableOpacity>
                                                            ))
                                                        }
                                                    </ScrollView>
                                                </Box>
                                                : <></>
                                        }
                                    </> :
                                    <HStack alignItems="center" width="full" space={1} px="10px" py="10px" borderBottomColor={"gray.100"} borderBottomWidth={1}>
                                        <Image alt={selectedStore?.store_name} rounded="md" width="50px" height="50px" backgroundColor={"gray.200"} source={{ uri: selectedStore?.store_logo }} />
                                        <VStack flex={1}>
                                            <CText>{selectedStore?.store_name}</CText>
                                            <CText numberOfLines={1} color="gray.400" variant="body3">{selectedStore?.store_address}</CText>
                                        </VStack>
                                        <Icon onPress={() => setSelectedStore(null)} ml="auto" color="danger.400" size="md" as={<Ionicons name="ios-trash-outline" />} />
                                    </HStack>
                            }


                        </Box>
                        <CustomInput keyboardType="number-pad" onChangeText={(val) => setAccessKey(val)} value={accessKey} error={errors.access_key} my="8px" labelText="Access Code" placeholder="Enter Access Code" />
                        <Box pt="40px" >
                            <AppBtn isLoading={joinMutation.isLoading} onPress={onSubmit} gradient={true}>Send Request</AppBtn>
                        </Box>
                    </Box>
                </KeyboardAvoidingView>
            </View>
        </SafeScaffold>
    )
}