import { QueryFunction, useQuery } from "react-query"
import { GenericDataResponse, HttpDataResponse } from "../../config/data_types/general.types"
import { Country, CountryParams } from "../../config/data_types/country_types"
import { fetchCountries } from "../services/country.services"


export const CountryQueryKeys = {
    fetchCountries: "fetch/countries"
}

export const useCountries = (params?: CountryParams) => {
    return useQuery<CountryParams,HttpDataResponse,GenericDataResponse<Country[]>>(
        [CountryQueryKeys.fetchCountries,params],(() => fetchCountries(params)) as QueryFunction<CountryParams>
    )
}