import client from "../../config/client.config"
import { StoreProductParams } from "../../config/data_types/product_types";


export const fetchStoreProducts = (params: StoreProductParams ): Promise<any> => {
    return client.get(`store/products`,{params});
}