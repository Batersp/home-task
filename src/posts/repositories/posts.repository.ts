import {Post} from "../types/post";
import {PostInputDto} from "../dto/post.input-dto";
import {ObjectId, WithId} from "mongodb";
import {postCollection} from "../../db/mongo.db";

export const postsRepository = {
    async getAll(): Promise<WithId<Post>[]> {
        return postCollection.find().toArray();
    },

    async getById(id: string): Promise<WithId<Post> | null> {
        return postCollection.findOne({_id: new ObjectId(id)});
    },

    async create(post: Post): Promise<WithId<Post>> {
        const createResult = await postCollection.insertOne(post);
        return {_id: createResult.insertedId, ...post};
    },

    async update(id: string, dto: PostInputDto): Promise<void> {
        const {title, shortDescription, content, blogId} = dto
        const updatedResult = await postCollection.updateOne(
            {
                _id: new ObjectId(id),
            },
            {$set: {title, shortDescription, content, blogId}},
        )
        if(updatedResult.matchedCount < 1) {
            throw new Error('Post not exist')
        }
    },

    async delete(id: string):Promise<boolean> {
        const deleteResult = await postCollection.deleteOne({_id: new ObjectId(id)});
        return deleteResult.deletedCount >= 1;
    }
}
