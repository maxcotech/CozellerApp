import client from "../../config/client.config"
import { StoreDashboardParams } from "../../config/data_types/store_types"


export const createStore = async (data: FormData): Promise<any> => {
    return client.post(`store`,data,{
        headers: {
            'Content-Type':"multipart/form-data"
        }
    })
}

export const fetchStoreDashboard = async (params: StoreDashboardParams): Promise<any> => {
    return client.get(`store/dashboard`,{params})
}

