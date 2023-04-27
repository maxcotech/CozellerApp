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
import IconLoadingPage from "../../../../components/IconLoadingPage";

export default function CreateStore(){
    const navigation = useNavigation<AppNavProps>();
    const appContext = useContext(AppContext);
    const profileQuery = useProfile({onSuccess: (data) => {
        if(!!data?.data?.current_store?.id){
            appContext.setProfileData(data?.data);
            navigation.replace(routes.vendorDashboard);
        }
    }});
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


    
    
   
    return (
        <SafeScaffold>
            <AppBar title="Create Store" subtitle="Create a store account" />
            <View flex={1}>
                {
                    (profileQuery.isLoading)? <IconLoadingPage />:
                    <StoreForm isLoading={isLoading} handleSubmit={onCreateStore} />
                }
                
            </View>
        </SafeScaffold>
    )
}