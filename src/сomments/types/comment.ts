export type Comment = {
    content: string,
    createdAt: string
    postId: string
    commentatorInfo: CommentatorInfo,
    likesInfo: LikesInfo[]
}

export type CommentatorInfo = {
    userId: string,
    userLogin: string
}

export type LikesInfo = {
    userId: string,
    status: LIKE_STATUS
}

export enum LIKE_STATUS {
    LIKE = "Like",
    DISLIKE = "Dislike",
    NONE = "None",
}
