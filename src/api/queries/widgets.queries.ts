import { QueryFunction, useQuery } from "react-query"
import { GenericDataResponse, HttpDataResponse, PaginatedDataResponse } from "../../config/data_types/general.types"
import { HomeBanner, Widget, WidgetParams } from "../../config/data_types/widgets_types"
import { fetchHomeBanners, fetchWidgets } from "../services/widgets.services"

export const WidgetsQueryKeys = {
     fetchHomeBanners: "widgets/home-banners",
     fetchWidgets: "widgets/widgets"
}

export const useHomeBanners = () => {
     return useQuery<unknown, HttpDataResponse, GenericDataResponse<HomeBanner[]>>(
          [WidgetsQueryKeys.fetchHomeBanners],
          (() => fetchHomeBanners()) as QueryFunction<unknown>
     )
}

export const useWidgets = (params: WidgetParams = {}) => {
     return useQuery<WidgetParams, HttpDataResponse, PaginatedDataResponse<Widget[]>>(
          [WidgetsQueryKeys.fetchWidgets, params],
          (() => fetchWidgets(params)) as QueryFunction<WidgetParams>
     )
}                                           