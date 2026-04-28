import {Blog} from "../types/blog";
import {BlogInputDto} from "../dto/blog.input-dto";
import {ObjectId, WithId} from "mongodb";
import {injectable} from "inversify";
import {BlogModel} from "../../db/models/blog.model";

@injectable()
export class BlogsRepository {

    async findById(id: string): Promise<WithId<Blog> | null> {
        return BlogModel.findOne({_id: new ObjectId(id)}).lean()
    }

    async create(blog: Blog): Promise<ObjectId> {
        const blogInstance = new BlogModel(blog);
        await blogInstance.save()
        return blogInstance._id
    }

    async update(id: string, dto: BlogInputDto): Promise<boolean> {
        const {name, description, websiteUrl} = dto
        const blog = await BlogModel.findById(id)
        if(!blog) return false
        blog.name = name
        blog.description = description
        blog.websiteUrl = websiteUrl
        await blog.save()
        return true
    }

    async delete(id: string) {
        const deletedResult = await BlogModel.deleteOne({_id: id})
        return deletedResult.deletedCount >= 1;
    }
}
