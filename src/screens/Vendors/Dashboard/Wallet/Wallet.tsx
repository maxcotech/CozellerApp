import { useContext, useMemo, useState } from "react";
import AppBar from "../../../../../components/AppBar";
import CText from "../../../../../components/CText";
import SafeScaffold from "../../../../../components/SafeScaffold";
import { useStoreWallet } from "../../../../api/queries/wallet.queries";
import { WalletParams } from "../../../../config/data_types/wallet_types";
import { Box, HStack, Icon, ScrollView, VStack, View } from "native-base";
import WalletSkeleton from "./Fragments/WalletSkeleton";
import { XPADDING } from "../../../../config/constants.config";
import { LinearGradient } from "expo-linear-gradient";
import Money from "../../../../../components/Money";
import { AntDesign, MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import AppContext from "../../../../contexts/AppContext";
import EmptyPage from "../../../../../components/EmptyPage";
import PaginatedScrollView from "../../../../../components/PaginatedScrollView";
import WalletRecordItem from "./Fragments/WalletRecordItem";
import AppBtn from "../../../../../components/AppBtn";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../../config/routes.config";

export default function Wallet() {
    const appContext = useContext(AppContext);
    const navigation = useNavigation<AppNavProps>();
    const [queryParams, setQueryParams] = useState<WalletParams>(
        { store_id: appContext?.profileData?.current_store?.id } as WalletParams
    )
    const walletQuery = useStoreWallet(queryParams, {
        enabled: (!!queryParams?.store_id)
    });

    const walletRecords = useMemo(() => {
        return walletQuery?.data?.data?.data;
    },[walletQuery?.data?.data?.data])

    return (
        <SafeScaffold>
            <AppBar centered={false} title="Store Wallet" subtitle="Manage Store Wallet Funds " right={
                <AppBtn onPress={() => navigation.navigate(routes.vendorRequestWithdrawal)} paddingX={10} borderRadius={8} gradient={true} textVariant="body4">Withdraw Fund</AppBtn>
            }  />
            <View flex={1} pt="10px" px={XPADDING}>
                {
                    (walletQuery.isLoading) ?
                        <WalletSkeleton /> :
                        <View flex={1}>
                            <View  borderRadius={"md"} overflow={"hidden"} minHeight={"200px"} mt="10px">
                                <LinearGradient end={{ x: 0, y: 0.2 }} start={{ x: 1, y: 0.8 }} style={{ flex: 1, padding: 15 }} colors={["#009445", "#008761", "#007971", "#006974", "#02586b"]}>
                                    <VStack flex={1} justifyContent={"space-between"}>
                                        <Box>
                                            <CText fontWeight="bold" color="gray.300" variant="body3">TOTAL BALANCE</CText>
                                            <Money mt="-7px" color="white" variant="superheading">
                                                {walletQuery?.data?.data?.total_balance ?? 0}
                                            </Money>
                                        </Box>
                                        <HStack pb="10px" justifyContent={"space-between"}>
                                            <VStack alignItems="center">
                                                <Money color="white" fontWeight={"bold"}>{walletQuery?.data?.data?.locked_credits}</Money>
                                                <CText color="gray.300" variant="body4">LOCKED CREDITS</CText>
                                            </VStack>
                                            <VStack alignItems="center">
                                                <Money color="white" fontWeight={"bold"}>{walletQuery?.data?.data?.unlocked_credits}</Money>
                                                <CText color="gray.300" variant="body4">UNLOCKED CREDITS</CText>
                                            </VStack>
                                            <VStack alignItems="center">
                                                <Money color="white" fontWeight={"bold"}>{walletQuery?.data?.data?.total_debits}</Money>
                                                <CText color="gray.300" variant="body4">TOTAL DEBITS</CText>
                                            </VStack>
                                        </HStack>
                                    </VStack>

                                    <SimpleLineIcons style={{
                                        position: "absolute", right: -40, bottom: -40,
                                        transform: [{ rotateZ: "45deg" }]
                                    }} color="rgba(200,200,200,0.2)" size={150} name="wallet"
                                    />
                                </LinearGradient>
                            </View>
                            <HStack py="10px" justifyContent={"space-between"} alignItems="center">
                                <CText my="10px" color="gray.400" variant="body1">Transaction History</CText>
                                <AppBtn paddingY={10} borderRadius={8} gradient={true}>
                                    <Icon  color="gray.200" size="md" as={<MaterialCommunityIcons  name="filter"  />} />
                                </AppBtn>
                                
                               
                            </HStack>
                            {
                                (walletRecords && walletRecords?.length > 0)?
                                <PaginatedScrollView onLoadNewPage={(newParams: WalletParams) => setQueryParams(newParams)} pageParams={queryParams} paginationData={walletQuery?.data?.data} style={{flex:1}}>
                                    {
                                        walletRecords.map((item) => (
                                            <WalletRecordItem data={item} />
                                        ))
                                    }
                                </PaginatedScrollView>:
                                <EmptyPage subtitle="You do not have any transactional records yet" title="No Transaction Record" />
                            }
                            

                        </View>
                }

            </View>
        </SafeScaffold>
    )
}