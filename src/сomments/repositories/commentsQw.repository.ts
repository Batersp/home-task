import {CommentViewModel} from "../types/comment-view-model";
import {ObjectId} from "mongodb";
import {mapToCommentViewModel} from "../routers/mappers/map-to-comment-view-model.util";
import {CommentsQuery} from "../../blogs/types/get-comments-query";
import {PaginatedResponse} from "../../core/types/paginatedResponse";
import {injectable} from "inversify";
import {CommentModel} from "../domain/comment.entity";

@injectable()
export class CommentsQwRepository {
    async findMany(query: CommentsQuery, postId?: string, userId?: string): Promise<PaginatedResponse<CommentViewModel>> {

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

        const items = await CommentModel
            .find(filter)
            .sort({[sortBy]: sortDirection, 'createdAt': sortDirection || -1})
            .skip(skip)
            .limit(pageSize)
            .lean();

        const totalCount = await CommentModel.countDocuments(filter);

        return {
            items: items.map(item =>  mapToCommentViewModel(item, userId)),
            totalCount,
            pageSize,
            page: pageNumber,
            pagesCount: Math.ceil(totalCount / pageSize)
        };
    }

    async findById(id: string, userId?: string): Promise<CommentViewModel | null> {
        const comment = await CommentModel.findOne({_id: new ObjectId(id)}).lean();
        if(!comment) return null;
        return mapToCommentViewModel(comment, userId);
    }
}
