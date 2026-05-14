import {LIKE_STATUS} from "../enums/like.enum";

export type PostLike = {
    postId: string
    userId: string
    userLogin: string
    status: LIKE_STATUS
    addedAt: string
}
