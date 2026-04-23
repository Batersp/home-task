import {PostsQuery} from "../types/get-posts-query";
import {postCollection} from "../../db/mongo.db";
import {mapToPostViewModel} from "../routers/mappers/map-to-post-view-model.util";
import {ObjectId} from "mongodb";
import {PostViewModel} from "../types/post-view-model";
import {PaginatedResponse} from "../../core/types/paginatedResponse";
import {injectable} from "inversify";

@injectable()
export class PostsQwRepository {
    async findMany(query: PostsQuery, blogId?: string): Promise<PaginatedResponse<PostViewModel>> {

        const {
            pageNumber,
            sortBy,
            sortDirection,
            pageSize
        } = query;

        const skip = (pageNumber - 1) * pageSize;
        const filter: any = {};
        if (blogId) {
            filter.blogId = blogId
        }

        const items = await postCollection
            .find(filter)
            .sort({[sortBy]: sortDirection, 'createdAt': sortDirection || -1})
            .skip(skip)
            .limit(pageSize)
            .toArray();

        const totalCount = await postCollection.countDocuments(filter);

        return {
            items: items.map(mapToPostViewModel),
            totalCount,
            pageSize,
            page: pageNumber,
            pagesCount: Math.ceil(totalCount / pageSize)
        };
    }

    async findById(id: string): Promise<PostViewModel | null> {
        const post = await postCollection.findOne({_id: new ObjectId(id)});
        if (!post) return null;
        return mapToPostViewModel(post);
    }
}
