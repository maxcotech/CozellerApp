import client from "../../config/client.config"
import { ProductGalleryResult, StoreProductParams } from "../../config/data_types/product_types";
import { uploadData } from "./general.services";


export const fetchStoreProducts = (params: StoreProductParams ): Promise<any> => {
    return client.get(`store/products`,{params});
}

export const uploadGalleryImage = async (data: FormData, iloader?: (val:boolean) => void, onComplete?: (data: ProductGalleryResult) => void) => {
    return await uploadData(`product/gallery_image`,data,iloader,onComplete);
}

export const uploadProductImage = async (data: FormData, iloader: any, onComplete?: (data: ProductGalleryResult) => void) => {
    return await uploadData(`product/image`,data,iloader,onComplete);
}

