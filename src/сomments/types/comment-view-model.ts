import {CommentatorInfo, LIKE_STATUS} from "./comment";

export type CommentViewModel = {
    id: string,
    content: string,
    commentatorInfo: CommentatorInfo,
    createdAt: string,
    likesInfo: {
        likesCount: number,
        dislikesCount: number,
        myStatus: LIKE_STATUS
    }
};
