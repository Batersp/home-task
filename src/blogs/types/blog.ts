import {WithId} from "mongodb";

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
    items: WithId<Blog>[]
}
