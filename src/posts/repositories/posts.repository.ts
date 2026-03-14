import {Post} from "../types/post";
import {PostInputDto} from "../dto/post.input-dto";
import {ObjectId, WithId} from "mongodb";
import {postCollection} from "../../db/mongo.db";

export const postsRepository = {

    async findById(id: string): Promise<WithId<Post> | null> {
        return postCollection.findOne({_id: new ObjectId(id)});
    },

    async create(post: Post): Promise<ObjectId> {
        const createdResult = await postCollection.insertOne(post);
        return createdResult.insertedId;
    },

    async update(id: string, dto: PostInputDto): Promise<boolean> {
        const {title, shortDescription, content, blogId} = dto
        const updatedResult = await postCollection.updateOne(
            {
                _id: new ObjectId(id),
            },
            {$set: {title, shortDescription, content, blogId}},
        )
        return updatedResult.matchedCount > 0
    },

    async delete(id: string):Promise<boolean> {
        const deletedResult = await postCollection.deleteOne({_id: new ObjectId(id)});
        return deletedResult.deletedCount >= 1;
    }
}
