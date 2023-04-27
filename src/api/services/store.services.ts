import client from "../../config/client.config"


export const createStore = async (data: FormData): Promise<any> => {
    return client.post(`store`,data,{
        headers: {
            'Content-Type':"multipart/form-data"
        }
    })
}