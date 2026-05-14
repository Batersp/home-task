import {PostLike} from "../../core/types/postLikesCollection";
import {model, Schema} from "mongoose";
import {LIKE_STATUS} from "../../core/enums/like.enum";

const postLikesSchema = new Schema<PostLike>({
    postId: {type: String, required: true},
    userId: {type: String, required: true},
    userLogin: {type: String, required: true},
    status: {
        type: String,
        enum: Object.values(LIKE_STATUS),
        required: true
    },
    addedAt: {type: String, required: true},
})

export const PostLikesModel = model('postLikes', postLikesSchema)
