import client from "../../config/client.config";
import { PaginationParams } from "../../config/data_types/general.types";
import { CreateReviewData, ReviewsParams } from "../../config/data_types/reviews_types";

export const fetchPendingReviews = (params: PaginationParams): Promise<any> => {
     return client.get(`pending/reviews`, { params })
}

export const createProductReview = (data: CreateReviewData): Promise<any> => {
     return client.post(`review`, data)
}

export const fetchReviews = (params: ReviewsParams): Promise<any> => {
     return client.get(`reviews`, { params })
}
