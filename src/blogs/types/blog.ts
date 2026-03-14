import {BlogViewModel} from "./blog-view-model";

export type Blog = {
    name: string,
    description: string,
    websiteUrl: string
    createdAt?: string,
    isMembership?: boolean,
}

export type BlogsResponse = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: BlogViewModel[]
}
