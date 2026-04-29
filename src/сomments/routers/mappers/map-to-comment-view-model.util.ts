import {WithId} from "mongodb";
import {CommentViewModel} from "../../types/comment-view-model";
import {Comment, LIKE_STATUS} from "../../types/comment";

export function mapToCommentViewModel(comment: WithId<Comment>, userId?: string): CommentViewModel {
    const {_id, content, commentatorInfo, createdAt, likesInfo} = comment;
    const likesCount = likesInfo.filter(i => i.status === LIKE_STATUS.LIKE).length
    const dislikesCount = likesInfo.filter(i => i.status === LIKE_STATUS.DISLIKE).length
    const myStatus = likesInfo.find(i => i.userId === userId)?.status

    return {
        id: _id.toString(),
        content,
        commentatorInfo,
        createdAt,
        likesInfo: {
            likesCount,
            dislikesCount,
            myStatus: myStatus || LIKE_STATUS.NONE,
        }
    }
}
