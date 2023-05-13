import client from "../../config/client.config"
import { JoinStoreFormData, StoreDashboardParams } from "../../config/data_types/store_types"
import { uploadData } from "./general.services"


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

export const searchStores = async (query:string): Promise<any> => {
    return client.get(`store/search`,{params:{query}})
}

export const joinStore = async (data: JoinStoreFormData): Promise<any> => {
    return client.post(`store/add_user`,data)
}

export const uploadStoreLogo = async (data: FormData, iloader?: any, onComplete?: any): Promise<any> => {
    return uploadData(`store/logo`,data,iloader,onComplete)
}

export const updateStore = async (data: FormData): Promise<any> => {
    return client.put(`store`,data) 
}
