import { useNavigation, useRoute } from "@react-navigation/native";
import IconLoadingPage from "../../../../components/IconLoadingPage";
import routes, { AppNavProps } from "../../../config/routes.config";
import { useContext, useEffect } from "react";
import AppContext from "../../../contexts/AppContext";
import { AccountTypes } from "../../../config/enum.config";
import { useProfile } from "../../../api/queries/account.queries";


export default function VendorOnboarding() {
    const navigation = useNavigation<AppNavProps>();
    const appContext = useContext(AppContext);
    const route = useRoute();
    useProfile({
        enabled: (!!appContext.profileData?.user?.id === false),
        onSuccess: (data) => {
            const profile = data.data;
            if (profile.logged_in) {
                console.log('setting profile')
                appContext.setProfileData(profile);
            } else {
                console.log('profile is guest, login');
                navigation.replace(routes.login);
            }
        }
    })
    useEffect(() => {
        if (route.name) {
            console.log(route.name);
        }
    }, [route.name])

    // useEffect(() => {
    //     if (!!appContext.authData?.token === false) {
    //         console.log('no auth token, login');
    //         navigation.replace(routes.login);
    //     }
    // }, [appContext.authData?.token])

    useEffect(() => {
        console.log('rechecking the conditions ', "logged in", appContext.profileData?.logged_in)
        const timeHandler = setTimeout(() => {
            const profile = appContext.profileData;
            if (profile?.logged_in) {
                if (!!profile.current_store === false) {
                    if (profile.stores?.length > 0) {
                        console.log('no selected store, select from list')
                        navigation.replace(routes.selectStore)
                    } else {
                        if (profile.user.user_type == AccountTypes.StoreOwner) {
                            console.log('no store to work with, create store',)
                            navigation.replace(routes.createStore);
                        } else {
                            console.log('No Stores As a store worker join a store')
                            navigation.replace(routes.joinStore)
                        }
                    }
                } else {
                    console.log('checks completed rerouting to dashboard')
                    navigation.replace(routes.vendorDashboard);
                }
            } else {
                console.log('session expired')
                //toast.show('your session has expired.')
            }
        }, 1);
        return () => {
            clearTimeout(timeHandler);
        }

    }, [appContext.profileData, navigation])
    return (
        <>
            <IconLoadingPage />
        </>
    )
}