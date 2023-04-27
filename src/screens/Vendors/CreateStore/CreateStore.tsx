import SafeScaffold from "../../../../components/SafeScaffold";
import AppBar from "../../../../components/AppBar";
import {  View } from "native-base";
import StoreForm from "./fragment/StoreForm";
import { useCreateStore } from "../../../api/queries/store.queries";
import { useProfile } from "../../../api/queries/account.queries";
import { useEffect } from 'react';
import { useContext } from 'react';
import AppContext from "../../../contexts/AppContext";
import { useQueryClient } from "react-query";
import { AccountQueryKeys } from "../../../api/queries/account.queries";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../config/routes.config";

export default function CreateStore(){
    const navigation = useNavigation<AppNavProps>();
    const profileQuery = useProfile({});
    const appContext = useContext(AppContext);
    const queryClient = useQueryClient();
    const {isLoading,mutate} = useCreateStore({
        onSuccess: (data) => {
            toast.show(data.message,{type:"success"});
            queryClient.invalidateQueries({queryKey:[AccountQueryKeys.fetchProfile]});
        }
    });
    const onCreateStore = (data: FormData, setErrors: (errors: any) => void) => {
        mutate(data,{onError:(error) => setErrors(error.data)})
    }

    useEffect(() => {
        const profileData = profileQuery?.data?.data;
        let timeHandler = null;
        if(profileData){
            appContext.setProfileData(profileData);
            if(!!profileData?.current_store){
               timeHandler = setTimeout(() => {
                 navigation.replace(routes.vendorDashboard)
               },1000)
            }
        }
        return () => {
            clearTimeout(timeHandler);
        }
    },[JSON.stringify(profileQuery?.data?.data)]);

    
    
   
    return (
        <SafeScaffold>
            <AppBar title="Create Store" subtitle="Create a store account" />
            <View flex={1}>
                <StoreForm isLoading={isLoading} handleSubmit={onCreateStore} />
            </View>
        </SafeScaffold>
    )
}