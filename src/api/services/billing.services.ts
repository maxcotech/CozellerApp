import client from "../../config/client.config"
import { BillingAddressesParams } from "../../config/data_types/billing_address.types"


export const fetchBillingAddresses = (params: BillingAddressesParams): Promise<any> => {
     return client.get(`billing/addresses`, { params })
}

export const createBillingAddress = (data: any): Promise<any> => {
     return client.post(`billing/address`, data);
}

export const updateBillingAddress = (data: any): Promise<any> => {
     return client.put(`billing/address`, data);
}

export const markAsCurrentAddress = (id: number): Promise<any> => {
     return client.patch(`billing/current/${id}`);
}

export const deleteBillingAddress = (id: number): Promise<any> => {
     return client.delete(`billing/address/${id}`)
}