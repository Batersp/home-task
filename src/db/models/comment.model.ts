import mongoose, {Schema} from "mongoose";
import {Comment} from "../../сomments/types/comment";

const commentSchema = new Schema<Comment>({
    content: {type: String, required: true, minlength: 1, maxlength: 1000},
    commentatorInfo: {
        userId: {type: String, required: true, minlength: 1, maxlength: 100},
        userLogin: {type: String, required: true, minlength: 1, maxlength: 100},
    },
    postId: {type: String, required: true, minlength: 1, maxlength: 1000},
    createdAt: {type: String, required: true},
})

export const CommentModel = mongoose.model('comments', commentSchema)
