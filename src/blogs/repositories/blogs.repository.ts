import {Blog} from "../types/blog";
import {BlogInputDto} from "../dto/blog.input-dto";
import {ObjectId, WithId} from "mongodb";
import {blogCollection} from "../../db/mongo.db";

export const blogsRepository = {

    async findById(id: string): Promise<WithId<Blog> | null> {
        return blogCollection.findOne({_id: new ObjectId(id)})
    },

    async create(blog: Blog): Promise<ObjectId> {
        const createResult = await blogCollection.insertOne(blog);
        return createResult.insertedId;
    },

    async update(id: string, dto: BlogInputDto): Promise<boolean> {
        const {name, description, websiteUrl} = dto
        const updatedBlog = await blogCollection.updateOne(
            {
                _id: new ObjectId(id)
            },
            {
                $set: {
                    name,
                    description,
                    websiteUrl
                }
            }
        );
        return updatedBlog.matchedCount > 0
    },

    async delete(id: string) {
        const deletedResult = await blogCollection.deleteOne({_id: new ObjectId(id)})
        return deletedResult.deletedCount >= 1;
    }
}
