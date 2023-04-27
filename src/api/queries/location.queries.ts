import { QueryFunction, UseQueryOptions, useQuery } from "react-query"
import { GenericDataResponse, HttpDataResponse } from "../../config/data_types/general.types"
import { City, CityParams, Country, CountryParams, State, StateParams } from "../../config/data_types/location_types"
import { fetchCities, fetchCountries, fetchStates } from "../services/location.services"


export const LocationQueryKeys = {
    fetchCountries: "fetch/countries",
    fetchStates: "fetch/states",
    fetchCities: "fetch/cities"
}

export const useCountries = (params?: CountryParams) => {
    return useQuery<CountryParams,HttpDataResponse,GenericDataResponse<Country[]>>(
        [LocationQueryKeys.fetchCountries,params],(() => fetchCountries(params)) as QueryFunction<CountryParams>
    )
}

export const useStates = (params: StateParams, options? : UseQueryOptions<StateParams,HttpDataResponse,GenericDataResponse<State[]>>) => {
    return useQuery<StateParams,HttpDataResponse,GenericDataResponse<State[]>>(
        [LocationQueryKeys.fetchStates,params], (() => fetchStates(params)), options
    )
}

export const useCities = (params: CityParams, options?: UseQueryOptions<CityParams,HttpDataResponse,GenericDataResponse<City[]>>) => {
    return useQuery<CityParams,HttpDataResponse,GenericDataResponse<City[]>>(
        [LocationQueryKeys.fetchCities,params],(() => fetchCities(params)), options
    )
}