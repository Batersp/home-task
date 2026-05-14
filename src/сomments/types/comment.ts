import {LIKE_STATUS} from "../../core/enums/like.enum";

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
