import mongoose, {Schema} from "mongoose";
import {Post} from "../../posts/types/post";

const postSchema = new Schema<Post>({
    title: {type: String, required: true, minlength: 1, maxlength: 100},
    shortDescription: {type: String, required: true, minlength: 1, maxlength: 1000},
    content: {type: String, required: true, minlength: 1, maxlength: 2000},
    blogId: {type: String, required: true, minlength: 1, maxlength: 1000},
    blogName: {type: String, required: true, minlength: 1, maxlength: 100},
    createdAt: {type: String, required: true},
})

export const PostModel = mongoose.model('posts', postSchema)
