import {SortDirection} from "./sort-direction";

export type BlogsQuery = {
    searchNameTerm: string
    sortBy: string
    sortDirection: SortDirection
    pageNumber: number
    pageSize: number
}
