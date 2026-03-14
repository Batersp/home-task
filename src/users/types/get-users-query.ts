import {SortDirection} from "../../blogs/types/sort-direction";

export type UsersQuery = {
    sortBy: string
    sortDirection: SortDirection
    pageNumber: number
    pageSize: number
    searchLoginTerm: string | null
    searchEmailTerm: string | null
}
