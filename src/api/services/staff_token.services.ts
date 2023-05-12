import client from "../../config/client.config";
import { StaffTokenFormData, StaffTokenParams } from "../../config/data_types/staff_token.types";

export const fetchStaffTokens = (params: StaffTokenParams): Promise<any> => {
    return client.get(`store/staff/tokens`,{params})
}

export const toggleExpiry = (id: number): Promise<any> => {
    return client.patch(`store/staff/token/${id}/toggle_expiry`,{})
}

export const deleteToken = (id: number): Promise<any> => {
    return client.delete(`store/staff/token/${id}`)
}

export const createToken = (data: StaffTokenFormData): Promise<any> => {
    return client.post(`store/staff/token`,data);
}