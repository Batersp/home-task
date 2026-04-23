import {CommentViewModel} from "../types/comment-view-model";
import {commentCollection} from "../../db/mongo.db";
import {ObjectId} from "mongodb";
import {mapToCommentViewModel} from "../routers/mappers/map-to-comment-view-model.util";
import {CommentsQuery} from "../../blogs/types/get-comments-query";
import {PaginatedResponse} from "../../core/types/paginatedResponse";
import {injectable} from "inversify";

@injectable()
export class CommentsQwRepository {
    async findMany(query: CommentsQuery, postId?: string): Promise<PaginatedResponse<CommentViewModel>> {

        const {
            pageNumber,
            sortBy,
            sortDirection,
            pageSize
        } = query;

        const skip = (pageNumber - 1) * pageSize;
        const filter: any = {};
        if (postId) {
            filter.postId = postId
        }

        const items = await commentCollection
            .find(filter)
            .sort({[sortBy]: sortDirection, 'createdAt': sortDirection || -1})
            .skip(skip)
            .limit(pageSize)
            .toArray();

        const totalCount = await commentCollection.countDocuments(filter);

        return {
            items: items.map(mapToCommentViewModel),
            totalCount,
            pageSize,
            page: pageNumber,
            pagesCount: Math.ceil(totalCount / pageSize)
        };
    }

    async findById(id: string): Promise<CommentViewModel | null> {
        const comment = await commentCollection.findOne({_id: new ObjectId(id)});
        if(!comment) return null;
        return mapToCommentViewModel(comment);
    }
}
