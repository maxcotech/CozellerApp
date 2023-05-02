import client from "../../config/client.config"
import { SubOrderParams, SubOrderStatusParams } from "../../config/data_types/order.types"

export const  fetchSubOrders = async (params: Partial<SubOrderParams>):Promise<any> => {
    return client.get(`sub_orders${(params?.sub_order_id)? "/"+params.sub_order_id: ""}`,{params})
}

export const updateOrderStatus = async (data: Partial<SubOrderStatusParams>): Promise<any> => {
    return client.put(`sub_order/status`,data);
}