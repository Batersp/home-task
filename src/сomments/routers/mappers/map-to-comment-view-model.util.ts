import {WithId} from "mongodb";
import {CommentViewModel} from "../../types/comment-view-model";
import {Comment} from "../../types/comment";

export function mapToCommentViewModel(comment: WithId<Comment>): CommentViewModel {
    const {_id, content, commentatorInfo, createdAt} = comment;
    return {
        id: _id.toString(),
        content,
        commentatorInfo,
        createdAt
    }
}
