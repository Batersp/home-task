import {SortDirection} from "../../posts/types/sort-direction";

export type CommentsQuery = {
    sortBy: string
    sortDirection: SortDirection
    pageNumber: number
    pageSize: number
}
