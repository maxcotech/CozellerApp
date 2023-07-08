import client from "../../config/client.config"
import { CatalogFilters } from "../../config/data_types/catalog.types";
import { ProductFormData, ProductGalleryResult, StoreProductParams } from "../../config/data_types/product_types";
import { uploadData } from "./general.services";


export const fetchStoreProducts = (params: StoreProductParams): Promise<any> => {
    return client.get(`store/products`, { params });
}

export const uploadGalleryImage = async (data: FormData, iloader?: (val: boolean) => void, onComplete?: (data: ProductGalleryResult) => void) => {
    return await uploadData(`product/gallery_image`, data, iloader, onComplete);
}

export const uploadProductImage = async (data: FormData, iloader: any, onComplete?: (data: ProductGalleryResult) => void) => {
    return await uploadData(`product/image`, data, iloader, onComplete);
}

export const uploadVariationImage = async (data: FormData, iloader: any, onComplete?: (data: ProductGalleryResult) => void) => {
    return await uploadData(`product/variation_image`, data, iloader, onComplete)
}

export const createProduct = async (data: Partial<ProductFormData>): Promise<any> => {
    return client.post(`product`, data);
}

export const updateProduct = async (data: Partial<ProductFormData>): Promise<any> => {
    return client.put(`product`, data);
}

export const fetchProduct = async (id: string | number): Promise<any> => {
    return client.get(`product/${id}`)
}

export const deleteProduct = async (id: number): Promise<any> => {
    return client.delete(`product/${id}`);
}

export const fetchProducts = (params: CatalogFilters): Promise<any> => {
    return client.get(`catalog`, { params })
}

export const fetchCategoryProducts = (params: CatalogFilters): Promise<any> => {
    return client.get(`category/products/${params.category_parameter}`, { params })
}
