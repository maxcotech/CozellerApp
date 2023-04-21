import client from "../../config/client.config";
import { CountryParams } from "../../config/data_types/country_types";


export const fetchCountries = async (params: CountryParams): Promise<any> => {
    return client.get(`countries`,{params});
}