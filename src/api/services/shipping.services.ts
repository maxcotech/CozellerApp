import client from "../../config/client.config"
import { DeleteShippingGroupParams, ShippingGroupFormData, ShippingGroupParams } from "../../config/data_types/shipping_types"

export const fetchShippingGroups = async (params: ShippingGroupParams): Promise<any> => {
    return client.get(`shipping/groups`,{params})
}

export const deleteShippingGroup = async (params: DeleteShippingGroupParams): Promise<any> => {
    return client.delete(`shipping/group/${params.id}`,{params})
}

export const updateShippingGroup = async (data: ShippingGroupFormData): Promise<any> => {
    return client.put(`shipping/group`,data)
}

export const createShippingGroup = async (data: ShippingGroupFormData): Promise<any> => {
    return client.post(`shipping/group`,data);
}