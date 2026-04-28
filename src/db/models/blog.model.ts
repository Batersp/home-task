import mongoose, {Schema} from "mongoose";
import {Blog} from "../../blogs/types/blog";

const blogSchema = new Schema<Blog>({
    name: {type: String, required: true, minlength: 1, maxlength: 100},
    description: {type: String, required: true, minlength: 1, maxlength: 1000},
    websiteUrl: {type: String, required: true, minlength: 5, maxlength: 500},
    createdAt: {type: String, required: true},
    isMembership: {type: Boolean, required: true},
})

export const BlogModel = mongoose.model('blogs', blogSchema)
