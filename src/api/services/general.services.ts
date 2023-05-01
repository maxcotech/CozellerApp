import { AxiosError } from "axios";
import client from "../../config/client.config";


export const uploadData = async <T>(url: string, data: FormData, iloader?: (val: boolean) => void, onComplete?: (data: T) => void): Promise<T> => {
    try{
        if(iloader) iloader(true);
        const result = await client.post(url,data,{
            headers: {
                'Content-Type':"multipart/form-data"
            }
        });
        const returnData: T = result.data;
        if(onComplete) onComplete(returnData);
        return returnData;
    }
    catch(e){
        if(e instanceof AxiosError){
            toast.show(e.response?.data?.message ?? e.message,{type:"danger"});
        }
    }
    finally {
        if(iloader) iloader(false);
    }
}