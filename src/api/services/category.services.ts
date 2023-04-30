import client from "../../config/client.config";
import { CategoryParams } from "../../config/data_types/category_types";

export const fetchCategories = async (params: CategoryParams): Promise<any> => {
    return client.get(`categories`,{params})
}