import {PostViewModel} from "./post-view-model";

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
    items: PostViewModel[]
}
