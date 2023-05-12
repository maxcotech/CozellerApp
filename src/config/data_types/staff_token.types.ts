import { StoreStaffTypes } from "../enum.config";
import { PaginationParams } from "./general.types";

export interface  StaffTokenParams extends PaginationParams{
    store: number
}

export interface StaffToken {
    id: number,
    staff_token: string,
    staff_type: StoreStaffTypes,
    expired: 0 | 1,
    created_at: string,
    staff_type_text: string
}

export interface StaffTokenFormData {
    store_id: number,
    staff_type: StoreStaffTypes,
    amount: number | string
}