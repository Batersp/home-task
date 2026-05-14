import {PostsQuery} from "../types/get-posts-query";
import {mapToPostViewModel} from "../routers/mappers/map-to-post-view-model.util";
import {ObjectId} from "mongodb";
import {PostViewModel} from "../types/post-view-model";
import {PaginatedResponse} from "../../core/types/paginatedResponse";
import {injectable} from "inversify";
import {PostModel} from "../domain/post.entity";
import {PostLikesModel} from "../../db/models/postLikes.model";
import {LIKE_STATUS} from "../../core/enums/like.enum";

@injectable()
export class PostsQwRepository {
    async findMany(query: PostsQuery, blogId?: string, userId?: string): Promise<PaginatedResponse<PostViewModel>> {

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

        const sortDir = sortDirection === 'asc' ? 1 : -1

        const items = await PostModel
            .find(filter)
            .sort({[sortBy]: sortDir, '_id': -1})
            .skip(skip)
            .limit(pageSize)
            .lean()

        const totalCount = await PostModel.countDocuments(filter);

        const postIds = items.map(p => p._id.toString())
        const userLikes = userId
            ? await PostLikesModel.find({postId: {$in: postIds}, userId}).lean()
            : []

        const userLikeByPost = userLikes.reduce<Record<string, LIKE_STATUS>>((acc, like) => {
            acc[like.postId] = like.status
            return acc
        }, {})

        return {
            items: items.map(post => mapToPostViewModel(post, userLikeByPost[post._id.toString()])),
            totalCount,
            pageSize,
            page: pageNumber,
            pagesCount: Math.ceil(totalCount / pageSize)
        };
    }

    async findById(id: string, userId?: string): Promise<PostViewModel | null> {
        const post = await PostModel.findOne({_id: new ObjectId(id)}).lean();
        if (!post) return null;
        const userLike = userId
            ? await PostLikesModel.findOne({postId: id, userId}).lean()
            : null

        return mapToPostViewModel(post, userLike?.status);
    }
}
