import { UseMutationOptions, useMutation } from "react-query";
import { HttpDataResponse } from "../../config/data_types/general.types";
import { createStore } from "../services/store.services";


export const useCreateStore = (options?: UseMutationOptions<HttpDataResponse,HttpDataResponse,FormData>) => {
    return useMutation<HttpDataResponse,HttpDataResponse,FormData>(createStore,options)
}