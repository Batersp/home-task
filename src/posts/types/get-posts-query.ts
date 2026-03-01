import {SortDirection} from "./sort-direction";

export type PostsQuery = {
    sortBy: string
    sortDirection: SortDirection
    pageNumber: number
    pageSize: number
}
