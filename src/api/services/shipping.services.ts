import client from "../../config/client.config"
import { DeleteShippingGroupParams, LocationDeleteParams, ShippingGroupFormData, ShippingGroupParams, ShippingLocationFormData, ShippingLocationsParams } from "../../config/data_types/shipping_types"

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

export const fetchShippingLocations = async (params: ShippingLocationsParams): Promise<any> => {
    return client.get(`shipping/locations`,{params})
}

export const createShippingLocation = async (data: ShippingLocationFormData): Promise<any> => {
    return client.post(`shipping/location`,data);
}

export const updateShippingLocation = async (data: ShippingLocationFormData): Promise<any> => {
    return client.put(`shipping/location`,data);
}

export const deleteShippingLocation = async (params: LocationDeleteParams): Promise<any> => {
    return client.delete(`shipping/location/${params.location_id}`,{params})
}

