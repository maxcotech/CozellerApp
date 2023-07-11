import client from "../../config/client.config";
import { ShoppingCartData, ShoppingCartUpdateData } from "../../config/data_types/shopping_cart.types";



export const updateShoppingCart = async (data: ShoppingCartUpdateData): Promise<any> => {
     return client.put(`shopping_cart/item`, data)
}

export const addToShoppingCart = async (data: ShoppingCartData): Promise<any> => {
     return client.post(`shopping_cart/item`, data);
}


export const fetchCartCount = async (): Promise<any> => {
     return client.get(`shopping_cart/item/count`);
}