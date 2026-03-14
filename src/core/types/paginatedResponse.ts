export type PaginatedResponse<T> = {
    items: T[]
    totalCount: number
    pageSize: number
    page: number
    pagesCount: number
}
