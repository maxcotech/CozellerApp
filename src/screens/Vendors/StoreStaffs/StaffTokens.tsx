import { View } from "native-base";
import AppBar from "../../../../components/AppBar";
import SafeScaffold from "../../../../components/SafeScaffold";
import { useStaffTokens } from "../../../api/queries/staff_token.queries";
import { useContext, useMemo, useState } from "react";
import AppContext from "../../../contexts/AppContext";
import { StaffTokenParams } from "../../../config/data_types/staff_token.types";
import OrderSkeleton from "../Dashboard/Orders/Fragment/OrderSkeleton";
import EmptyPage from "../../../../components/EmptyPage";
import StaffTokenItem from "./fragments/StaffTokenItem";
import { XPADDING } from "../../../config/constants.config";
import PaginatedScrollView from "../../../../components/PaginatedScrollView";
import AppBtn from "../../../../components/AppBtn";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../config/routes.config";

export default function StaffTokens(){
    const appContext = useContext(AppContext);
    const navigation = useNavigation<AppNavProps>();
    const [queryParams,setQueryParams] = useState<StaffTokenParams>({
        store: appContext?.profileData?.current_store?.id
    })
    const tokenQuery = useStaffTokens(queryParams,{
        enabled: (!!queryParams?.store)
    })
    const tokens = useMemo(() => {
        return tokenQuery?.data?.data?.data ?? []
    },[tokenQuery?.data?.data?.data])
    return (
        <SafeScaffold>
            <AppBar right={<AppBtn onPress={() => navigation.navigate(routes.createStaffToken)} borderRadius={8} gradient={true} textVariant="body4">CREATE TOKENS</AppBtn>} title="Staff Tokens" subtitle="Onboard prospective staffs" />
            <View pt="10px" flex={1} px={XPADDING}>
                {
                    (tokenQuery.isLoading)?
                    <OrderSkeleton />:
                    <>
                        {
                            (tokens.length > 0)?
                            <PaginatedScrollView onLoadNewPage={(newParams: StaffTokenParams) => setQueryParams(newParams)} pageParams={queryParams} paginationData={tokenQuery?.data?.data} style={{flex:1}}  showsVerticalScrollIndicator={false}>
                                {
                                    tokens.map((token) => (
                                        <StaffTokenItem data={token} key={token.id} />
                                    ))
                                }
                            </PaginatedScrollView>:<EmptyPage title="No staff token" subtitle="You haven't added any access token yet" />
                        }
                    </>
                }
            </View>
        </SafeScaffold>
    )
}