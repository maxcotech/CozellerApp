import { QueryFunction, useQuery } from "react-query"
import { Category, CategoryParams } from "../../config/data_types/category_types"
import { fetchCategories } from "../services/category.services"
import { HttpDataResponse, PaginatedDataResponse } from "../../config/data_types/general.types"

export const CategoryQueryKeys = {
    fetchCategories: "fetch/categories"
}

export const useCategories = (params: CategoryParams) => {
    return useQuery<CategoryParams,HttpDataResponse,PaginatedDataResponse<Category[]>>([CategoryQueryKeys.fetchCategories, params], (() => fetchCategories(params)) as QueryFunction<CategoryParams>)
}