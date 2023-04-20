
export interface HttpDataResponse {
    message: string,
    code?: number,
    status?: string,
    data?: any,
    errors?: any
}

export interface LinkData {
    url: (string | null),
    label: (string | null),
    active: boolean
}

export interface PaginatedData<DataType> {
    current_page: number | null,
    data: DataType
    next_page_url: string | null,
    path: string | null,
    per_page: number | null,
    prev_page_url: string | null,
    to: number | null,
    total: number | null,
    first_page_url: string | null,
    from: number | null,
    last_page: number | null,
    last_page_url: string | null,
    links: Array<LinkData> | null
}

export interface PaginatedDataResponse<DataType> extends HttpDataResponse {
    data: PaginatedData<DataType>
}

export interface GenericDataResponse<DataType> extends HttpDataResponse {
    data: DataType
}

export interface PaginationParams {
    page?: number,
    limit?: number
}
