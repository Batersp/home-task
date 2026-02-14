import {Post} from "../../types/post";
import {PostViewModel} from "../../types/post-view-model";
import {WithId} from "mongodb";

export function mapToPostViewModel(post: WithId<Post>): PostViewModel {
    const {_id, blogId, blogName, title, shortDescription, content, createdAt} = post
    return {
        id: _id.toString(),
        blogId,
        blogName,
        title,
        shortDescription,
        content,
        createdAt,
    }
}
