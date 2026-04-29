import mongoose, {Schema} from "mongoose";
import {Comment, LIKE_STATUS} from "../../сomments/types/comment";

const commentSchema = new Schema<Comment>({
    content: {type: String, required: true, minlength: 1, maxlength: 1000},
    commentatorInfo: {
        userId: {type: String, required: true, minlength: 1, maxlength: 100},
        userLogin: {type: String, required: true, minlength: 1, maxlength: 100},
    },
    postId: {type: String, required: true, minlength: 1, maxlength: 1000},
    createdAt: {type: String, required: true},
    likesInfo: {
        type: [{
            userId: { type: String, required: true },
            status: {
                type: String,
                enum: Object.values(LIKE_STATUS),
                required: true
            },
        }],
        default: []
    }
})

export const CommentModel = mongoose.model('comments', commentSchema)
