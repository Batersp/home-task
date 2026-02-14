import {Blog} from "../types/blog";
import {BlogInputDto} from "../dto/blog.input-dto";
import {ObjectId, WithId} from "mongodb";
import {blogCollection} from "../../db/mongo.db";

export const blogsRepository = {
    async getAll(): Promise<WithId<Blog>[]> {
        return blogCollection.find().toArray();
    },

    async findById(id: string): Promise<WithId<Blog> | null> {
        return blogCollection.findOne({_id: new ObjectId(id)})
    },

    async create(blog: Blog): Promise<WithId<Blog>> {
        const createResult = await blogCollection.insertOne(blog);
        return {_id: createResult.insertedId, ...blog};
    },

    async update(id: string, dto: BlogInputDto): Promise<void> {
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
        if(updatedBlog.matchedCount < 1) {
            throw new Error('Blog not exist');
        }
    },

    async delete(id: string) {
        const deletedResult = await blogCollection.deleteOne({_id: new ObjectId(id)})
        return deletedResult.deletedCount >= 1;
    }
}
