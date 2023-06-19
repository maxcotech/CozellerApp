import client from "../../config/client.config"


export const fetchHomeBanners = async (): Promise<any> => {
     return client.get(`home_banners`)
}

export const fetchWidgets = async (params = {}): Promise<any> => {
     return client.get(`widgets`, { params })
}