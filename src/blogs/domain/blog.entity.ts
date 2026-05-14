import {BlogInputDto} from "../dto/blog.input-dto";
import {Blog} from "../types/blog";
import {HydratedDocument, model, Model, Schema} from "mongoose";

const blogSchema = new Schema<Blog>({
    name: {type: String, required: true, minlength: 1, maxlength: 100},
    description: {type: String, required: true, minlength: 1, maxlength: 1000},
    websiteUrl: {type: String, required: true, minlength: 5, maxlength: 500},
    createdAt: {type: String, required: true, default: new Date().toISOString()},
    isMembership: {type: Boolean, required: true, default: false},
})

export class BlogEntity {
    private constructor(
        public name: string,
        public description: string,
        public websiteUrl: string,
        public createdAt: string,
        public isMembership: boolean,
    ) {}

    static createBlog(dto: BlogInputDto): BlogDocument {
        const blog = new BlogModel(dto)
        if(blog.name.length < 1) {
            throw new Error("Name is required");
        }
        if(blog.description.length < 1) {
            throw new Error("Description is required");
        }
        if(blog.websiteUrl.length < 5) {
            throw new Error('WebsiteUrl cannot be less than 5 characters');
        }
        return blog
    }

    update(dto: BlogInputDto) {
        const {name, description, websiteUrl} = dto
        if (name && (name.length < 1 || name.length > 100)) {
            throw new Error("Name length must be between 1 and 100 characters");
        }
        if (description && (description.length < 1 || description.length > 1000)) {
            throw new Error("Description length must be between 1 and 1000 characters");
        }
        if (websiteUrl && websiteUrl.length < 5) {
            throw new Error("WebsiteUrl length can not be less than 5 characters");
        }
        if(!name || !description || !websiteUrl) {
            throw new Error("all fields are required");
        }
        if(name) {
            this.name = name
        }
        if(description) {
            this.description = description
        }
        if(websiteUrl) {
            this.websiteUrl = websiteUrl
        }
    }
}

interface BlogMethods {
    update: (dto: BlogInputDto) => void
}

type BlogStatics = typeof BlogEntity;
type BlogModel = Model<Blog, {}, BlogMethods> & BlogStatics;
export type BlogDocument = HydratedDocument<Blog, BlogMethods>
blogSchema.loadClass(BlogEntity)
export const BlogModel = model<Blog, BlogModel>('blogs', blogSchema)
