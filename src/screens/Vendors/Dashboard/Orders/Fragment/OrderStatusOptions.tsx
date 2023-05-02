import { Actionsheet, Box, HStack, Icon } from "native-base";
import { SubOrder, SubOrderStatusParams } from "../../../../../config/data_types/order.types";
import { OrderStatuses } from "../../../../../config/enum.config";
import CText from "../../../../../../components/CText";
import { useContext, useEffect, useMemo, useState } from "react";
import { getOrderStatusLabel } from "../../../../../helpers/status.helpers";
import { AntDesign } from "@expo/vector-icons";
import { OrderQueryKeys, useUpdateSubOrderStatus } from "../../../../../api/queries/order.queries";
import { useQueryClient } from "react-query";
import AppContext from "../../../../../contexts/AppContext";
import { CustomPasswordInput } from "../../../../../../components/CustomInput";
import { createFormErrorObject } from "../../../../../helpers/message.helpers";
import AppBtn from "../../../../../../components/AppBtn";
import { XPADDING } from "../../../../../config/constants.config";

export interface OrderStatusOptionsProps {
    order?: SubOrder,
    onSelect?: (option: OrderStatuses | string) => void,
    isOpen: boolean,
    onClose: () => void,
    onComplete?: () => void,
    title?: string,
    iloader?: (val:boolean) => void
}

export default function OrderStatusOptions({iloader, isOpen,onComplete, title = "Update Order Status", onClose, order, onSelect}: OrderStatusOptionsProps){
    const queryClient = useQueryClient();
    const appContext = useContext(AppContext);
    const [showFundPassword,setShowFundPassword] = useState(false);
    const [formState,setFormState] = useState({
        store_id: appContext?.profileData?.current_store?.id,
        new_status: undefined,
        sub_order_id: order?.id,
        fund_password: ""
    } as SubOrderStatusParams)
    const [errors,setErrors] = useState(createFormErrorObject(formState));
    
    const updateQuery = useUpdateSubOrderStatus({
        onSuccess: (data) => {
            toast.show(data?.message,{type:"success"});
            queryClient.invalidateQueries({ queryKey: [OrderQueryKeys.fetchSubOrders]})
            queryClient.invalidateQueries({ queryKey: [OrderQueryKeys.fetchSubOrder]})
            setShowFundPassword(false);
            if(onComplete) onComplete();
        }
    });
    const onSubmit = (data: SubOrderStatusParams) => {
        updateQuery.mutate(data,{
            onError: (data) => {
                toast.show(data.message,{type:"danger"});
                setErrors(data?.data);
            }
        })
    }
    const onSelectOption = (option: OrderStatuses | string) => {
        onClose();
        if(onSelect){
            onSelect(option);
        } else {
            const newData = {...formState,new_status:option as OrderStatuses}
            setFormState(newData);
            if(option === OrderStatuses.STATUS_COMPLETED){
                setShowFundPassword(true);
            } else {
                onSubmit(newData);
            }
            
        }
        
    }

    const statusList = useMemo(() => {
        const i = Object.values(OrderStatuses).filter((val) => !isNaN(val));
        console.log(i);
        return i;

    },[OrderStatuses])

    useEffect(() => {
        if(order){
            setFormState({...formState,sub_order_id:order?.id})
        }
    },[order?.id])

    useEffect(() => {
        if(iloader){
            iloader(updateQuery.isLoading)
        }
    },[updateQuery.isLoading])

    return (
        <>
            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <CText>{title}</CText>
                    {
                        statusList.map((currentVal) => {
                        
                            if((order)? currentVal !== order.status : true){
                                return (
                                    <Actionsheet.Item onPress={() => onSelectOption(currentVal)}>
                                        <HStack width="full" >
                                            <CText>{getOrderStatusLabel(currentVal)}</CText>
                                            <Icon ml="auto" size="md" as={<AntDesign name="arrowright" />} />
                                        </HStack>
                                    </Actionsheet.Item>
                                )
                            }
                            return <></>
                            
                        })
                    }
                </Actionsheet.Content>
            </Actionsheet>
            <Actionsheet isOpen={showFundPassword} onClose={() => setShowFundPassword(false)}>
                <Actionsheet.Content px={XPADDING}>
                    <CText>Order Passcode Required</CText>
                    <CustomPasswordInput my="8px" error={errors.fund_password} onChangeText={(fund_password) => setFormState({...formState,fund_password})} value={formState.fund_password} placeholder="Enter Passcode " />
                    <Box width="full" justifyContent="flex-start">
                        <AppBtn paddingX={20} onPress={() => onSubmit(formState)} isLoading={updateQuery.isLoading} gradient={true} textVariant="body3">Apply</AppBtn>
                    </Box>
                </Actionsheet.Content>
            </Actionsheet>
        </>
    )
}