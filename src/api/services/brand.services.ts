import client from "../../config/client.config"
import { BrandParams } from "../../config/data_types/brand_types"


export const fetchBrands = async (params: BrandParams): Promise<any> => {
    return client.get(`brands`,{params})
}

export const createBrand = async (data: FormData): Promise<any> => {
    return client.post(`brand`,data,{
        headers: {
            'Content-Type':"multipart/form-data"
        }
    })
}