import {WithId} from "mongodb";

export type Post = {
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string,
    createdAt?: string
}

export type PostsResponse = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: WithId<Post>[]
}
