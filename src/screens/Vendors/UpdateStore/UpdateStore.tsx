import { useContext } from "react";
import AppBar from "../../../../components/AppBar";
import SafeScaffold from "../../../../components/SafeScaffold";
import AppContext from "../../../contexts/AppContext";
import { View } from "native-base";
import StoreForm from "../CreateStore/fragment/StoreForm";
import { useUpdateStore } from "../../../api/queries/store.queries";
import { AccountQueryKeys, useProfile } from "../../../api/queries/account.queries";
import { useQueryClient } from "react-query";
import { errorMessage, successMessage } from "../../../helpers/message.helpers";
import { useNavigation } from "@react-navigation/native";
import { AppNavProps } from "../../../config/routes.config";

export default function UpdateStore(){
    const appContext = useContext(AppContext);
    const queryClient = useQueryClient();
    const navigation = useNavigation<AppNavProps>();

    useProfile({
        onSuccess: (data) => {
            const stores = data?.data?.stores ?? [];
            appContext.setProfileData({
                ...appContext.profileData,
                stores
            })
        }
    })
    const mutation = useUpdateStore({
        onSuccess: async (data) => {
            successMessage(data?.message);
            await queryClient.invalidateQueries({queryKey:[AccountQueryKeys.fetchProfile]});
            navigation.pop();
        }
    })
    const onUpdateStore = (data: any,setErrors) => {

        mutation.mutate(data,{
            onError: (data) => {
                errorMessage(data?.message);
                setErrors(data?.data)
            }
        })
    }
    return (
        <SafeScaffold>
            <AppBar title="Update Store" />
            <View flex={1}>
                <StoreForm handleSubmit={onUpdateStore} defaultData={appContext.profileData?.current_store} />
            </View>
        </SafeScaffold>
    )
}