import { QueryFunction, UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "react-query"
import { HttpDataResponse, PaginatedDataResponse, PaginationParams } from "../../config/data_types/general.types"
import { CreateReviewData, Review } from "../../config/data_types/reviews_types"
import { createProductReview, fetchPendingReviews } from "../services/reviews.services"



export const ReviewQueryKeys = {
     fetchPendingReviews: "fetch/pending-reviews"
}

export const usePendingReviews = (params: PaginationParams, options?: UseQueryOptions<PaginationParams, HttpDataResponse, PaginatedDataResponse<Review[]>>) => {
     return useQuery<PaginationParams, HttpDataResponse, PaginatedDataResponse<Review[]>>(
          [ReviewQueryKeys.fetchPendingReviews, params],
          (() => fetchPendingReviews(params)) as QueryFunction<PaginationParams>,
          options
     )
}

export const useCreateReview = (options?: UseMutationOptions<HttpDataResponse, HttpDataResponse, CreateReviewData>) => {
     return useMutation<HttpDataResponse, HttpDataResponse, CreateReviewData>(
          createProductReview,
          options
     )
}