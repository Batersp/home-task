import {CommentatorInfo} from "./comment";
import {LIKE_STATUS} from "../../core/enums/like.enum";

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
