import { useNavigation } from "@react-navigation/native";
import IconLoadingPage from "../../../../components/IconLoadingPage";
import routes, { AppNavProps } from "../../../config/routes.config";
import { useContext, useEffect } from "react";
import AppContext from "../../../contexts/AppContext";
import { AccountTypes } from "../../../config/enum.config";
import { useProfile } from "../../../api/queries/account.queries";


export default function VendorOnboarding(){
    const navigation = useNavigation<AppNavProps>();
    const appContext = useContext(AppContext);
    useProfile({
        enabled: ((!!appContext.profileData === false || appContext.profileData?.logged_in === false) && !!appContext.authData?.token),
        onSuccess: (data) => {
            const profile = data.data;
            if(profile.logged_in){
                appContext.setProfileData(profile);
            } else {
                console.log('profile is guest, login');
                navigation.replace(routes.login);
            }
        }
    })

    useEffect(() => {
        if(!!appContext.authData?.token === false){
            console.log('no auth token, login');
            navigation.replace(routes.login);
        }
    },[appContext.authData?.token])

    useEffect(() => {
        const profile = appContext.profileData;
        const timeHandler = setTimeout(() => {
            if(profile.logged_in){
                if(!!profile.current_store === false){
                    if(profile.stores?.length > 0){
                        console.log('no selected store, select from list')
                        navigation.replace(routes.selectStore)
                    } else {
                        if(profile.user.user_type == AccountTypes.StoreOwner){
                            console.log('no store to work with, create store',)
                            navigation.replace(routes.createStore);
                        } else {
                            console.log('No Stores As a store worker join a store')
                            navigation.replace(routes.joinStore)
                        }
                    }
                }
            } 
        },1000);
        return () => {
            clearTimeout(timeHandler);
        }
        
    },[appContext.profileData, navigation])
    return (
        <IconLoadingPage />
    )
}