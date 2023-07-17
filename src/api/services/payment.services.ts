import client from "../../config/client.config"

export const fetchCheckoutData = (): Promise<any> => {
     return client.get(`checkout`)
}