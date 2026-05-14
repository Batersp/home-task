import {Post} from "../../types/post";
import {PostViewModel} from "../../types/post-view-model";
import {WithId} from "mongodb";
import {LIKE_STATUS} from "../../../core/enums/like.enum";

export function mapToPostViewModel(post: WithId<Post>, myStatus: LIKE_STATUS = LIKE_STATUS.NONE): PostViewModel {
    const {_id, blogId, blogName, title, shortDescription, content, createdAt, likesCount, dislikesCount, newestLikes} = post
    return {
        id: _id.toString(),
        blogId,
        blogName,
        title,
        shortDescription,
        content,
        createdAt,
        extendedLikesInfo: {
            likesCount,
            dislikesCount,
            myStatus,
            newestLikes: newestLikes.map(like => {
                const {userId, addedAt, login} = like
                return {
                    userId,
                    login,
                    addedAt
                }
            })
        }
    }
}
