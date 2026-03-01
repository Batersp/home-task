import {Post, PostsResponse} from "../types/post";
import {PostInputDto} from "../dto/post.input-dto";
import {ObjectId, WithId} from "mongodb";
import {postCollection} from "../../db/mongo.db";
import {PostsQuery} from "../types/get-posts-query";

export const postsRepository = {
    async findMany(query: PostsQuery, blogId?: string): Promise<PostsResponse> {

        const {
            pageNumber,
            sortBy,
            sortDirection,
            pageSize
        } = query;

        const skip = (pageNumber - 1) * pageSize;
        const filter: any = {};
        if(blogId) {
            filter.blogId = blogId
        }
        console.log(filter)

        const items = await postCollection
            .find(filter)
            .sort({[sortBy]: sortDirection, 'createdAt': sortDirection || -1})
            .skip(skip)
            .limit(pageSize)
            .toArray();

        const totalCount = await postCollection.countDocuments(filter);

        return {items, totalCount, pageSize, page: pageNumber, pagesCount: Math.ceil(totalCount / pageSize)};
    },

    async findById(id: string): Promise<WithId<Post> | null> {
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
