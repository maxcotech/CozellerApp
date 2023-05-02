import { Box, Fab, Icon, ScrollView, View } from "native-base";
import AppBar from "../../../../components/AppBar";
import SafeScaffold from "../../../../components/SafeScaffold";
import { useBankAccounts, useBankCodes } from "../../../api/queries/bank.queries";
import { useContext } from "react";
import AppContext from "../../../contexts/AppContext";
import OrderSkeleton from "../Dashboard/Orders/Fragment/OrderSkeleton";
import EmptyPage from "../../../../components/EmptyPage";
import AppBtn from "../../../../components/AppBtn";
import { APP_COLOR, XPADDING } from "../../../config/constants.config";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../config/routes.config";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import BankAccountItem from "./components/BankAccountItem";
import { RefreshControl } from "react-native";

export default function BankAccounts(){
    const appContext = useContext(AppContext);
    const navigation = useNavigation<AppNavProps>();
    const {isLoading,data,refetch,isRefetching} = useBankAccounts(appContext.profileData?.current_store?.id, {
        enabled: (!!appContext.profileData?.current_store?.id)
    })
    const onAddAccount = () => navigation.navigate(routes.vendorCreateBankAccount);

    return (
        <SafeScaffold>
            <AppBar subtitle="Manage bank accounts" title="Bank Accounts" />
            <View pt="10px" px={XPADDING} flex={1}>
                {
                    (isLoading)?
                    <OrderSkeleton />:
                    <>
                        {
                            (data?.data && data?.data?.length > 0)?
                            <ScrollView refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />} flex={1}>
                                {
                                    data?.data.map((item) => (
                                        <BankAccountItem key={item.id} data={item} />
                                    ))
                                }
                            </ScrollView>:
                            <EmptyPage title="No Bank Account" subtitle="You haven't added any bank account yet, click the button below to start adding bank accounts for your withdrawals">
                                <AppBtn onPress={onAddAccount} textVariant="body4" gradient={true}>Add Bank Account</AppBtn>
                            </EmptyPage>

                        }
                    </>
                }
               
            </View>
            <Fab onPress={() => navigation.navigate(routes.vendorCreateBankAccount)} backgroundColor={APP_COLOR} renderInPortal={false} label={<Icon color="white" as={<MaterialIcons name="add" />} size="md" />}/>
        </SafeScaffold>
    )
}