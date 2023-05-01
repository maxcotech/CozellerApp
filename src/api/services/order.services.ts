import client from "../../config/client.config"
import { SubOrderParams } from "../../config/data_types/order.types"

export const  fetchSubOrders = async (params: Partial<SubOrderParams>):Promise<any> => {
    return client.get(`sub_orders${(params?.sub_order_id)? "/"+params.sub_order_id: ""}`,{params})
}
