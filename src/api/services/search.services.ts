import client from "../../config/client.config"
import { PaginationParams } from "../../config/data_types/general.types"
import { SearchParams } from "../../config/data_types/search_types"


export const generalSearch = async (params: SearchParams): Promise<any> => {
     return client.get(`search_query`, { params })
}

export const fetchSearchHistory = async (params: PaginationParams): Promise<any> => {
     return client.get(`search_query/history`, { params });
}

export const saveSearchQuery = async (query: string): Promise<any> => {
     return client.post(`search_query/history`, { query });
}