export type Post = {
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string,
    createdAt: string
    likesCount: number
    dislikesCount: number
    newestLikes: NewestLike[]
}

export type NewestLike = {
    addedAt: string
    userId: string
    login: string
}
