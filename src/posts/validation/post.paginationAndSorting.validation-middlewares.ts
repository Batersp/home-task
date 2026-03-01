import {query} from "express-validator";
import {SortDirection} from "../types/sort-direction";

const DEFAULT_SORT_BY = 'createdAt'
const DEFAULT_SORT_DIRECTION = SortDirection.Desc
const DEFAULT_PAGE_NUMBER = 1
const DEFAULT_PAGE_SIZE = 10

const sortByValidation = query('sortBy')
    .default(DEFAULT_SORT_BY)

const sortDirectionValidation = query('sortDirection')
    .default(DEFAULT_SORT_DIRECTION)
    .isIn(Object.values(SortDirection))
    .withMessage(`Sort direction must be one of: ${Object.values(SortDirection).join(', ')}`)

const pageNumberValidation = query('pageNumber')
    .default(DEFAULT_PAGE_NUMBER)
    .isInt({ min: 1 })
    .withMessage('Page number must be a positive integer')
    .toInt()

const pageSizeValidation = query('pageSize')
    .default(DEFAULT_PAGE_SIZE)
    .isInt({ min: 1 })
    .withMessage('Page size must be a positive integer')
    .toInt()


export const postPaginationAndSortingValidation = [
    sortByValidation,
    sortDirectionValidation,
    pageNumberValidation,
    pageSizeValidation,
]
