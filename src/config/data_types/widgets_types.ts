import { DeviceTypesEnum, WidgetTypes } from "../enum.config";
import { ResourceStatuses } from ../enum.config;
import { PaginationParams } from "./general.types";

export interface HomeBanner {
     id: number,
     banner: string,
     banner_link: string,
     created_at: string,
     updated_at: string
}

export interface WidgetParams extends PaginationParams {
     with_items?: 0 | 1,
     with_indexes?: 0 | 1,
     status?: ResourceStatuses,
     paginate?: 0 | 1,
     device_type?: DeviceTypesEnum
}

export interface Widget {
     id: number,
     widget_title: string,
     widget_link_text: string,
     widget_link_address: string,
     widget_type: WidgetTypes,
     index_no: number,
     status: ResourceStatuses,
     is_block: 0 | 1,
     widget_type_text: string,
     is_block_text: string,
     items: WidgetItem[]
}

export interface WidgetItem {
     id: number,
     widget_id: number,
     item_title: string,
     item_image_url: string,
     item_link: string
}