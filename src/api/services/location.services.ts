import client from "../../config/client.config";
import { CityParams, CountryParams, StateParams } from "../../config/data_types/location_types";


export const fetchCountries = async (params: CountryParams): Promise<any> => {
    return client.get(`countries`,{params});
}

export const fetchStates = async (params: StateParams): Promise<any> => {
    return client.get(`states`,{params})
}

export const fetchCities = async (params: CityParams): Promise<any> => {
    return client.get(`cities`,{params})
}

