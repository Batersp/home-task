import {CommentInputDto} from "../dto/comment.input-dto";
import {commentsRepository} from "../repositories/comments.repository";
import {WithId} from "mongodb";
import {Comment, CommentatorInfo} from "../types/comment";
import {postsService} from "../../posts/aplication/posts.service";
import {CommentViewModel} from "../types/comment-view-model";
import {commentsQwRepository} from "../repositories/commentsQw.repository";
import {Result, ResultStatus} from "../../core/types/result";

export const commentsService = {
    async findById(id: string): Promise<WithId<Comment> | null> {
        return commentsRepository.findById(id)
    },

    async create(postId: string, commentatorInfo: CommentatorInfo, dto:  CommentInputDto): Promise<CommentViewModel | null> {
        const post = await postsService.findById(postId);
        if (!post) return null;

        const {content} = dto
        const comment: Comment = {
            content,
            postId,
            commentatorInfo,
            createdAt: new Date().toISOString()
        }
        const createdCommentId = await commentsRepository.create(comment)
        return await commentsQwRepository.findById(createdCommentId.toString())
    },

    async update(commentId: string, dto: CommentInputDto, currentUserId: string): Promise<Result> {
        const comment = await commentsService.findById(commentId)
        if(!comment) return {
            status: ResultStatus.NotFound,
            extensions: [],
            data: null
        };

        if (comment.commentatorInfo.userId !== currentUserId) return {
            status: ResultStatus.Forbidden,
            extensions: [],
            data: null
        }

        const isUpdated = await commentsRepository.update(commentId, dto)
        if(isUpdated) return {
            status: ResultStatus.NoContent,
            extensions: [],
            data: null
        }

        return {
            status: ResultStatus.InternalError,
            extensions: [],
            data: null
        }
    },

    async delete(commentId: string, currentUserId: string): Promise<Result> {
        const comment = await commentsService.findById(commentId);
        if(!comment) return {
            status: ResultStatus.NotFound,
            extensions: [],
            data: null
        }

        if (comment.commentatorInfo.userId !== currentUserId) return {
            status: ResultStatus.Forbidden,
            extensions: [],
            data: null
        }

        const isDeleted = await commentsRepository.delete(commentId)
        if(isDeleted) return {
            status: ResultStatus.NoContent,
            extensions: [],
            data: null
        }
        return {
            status: ResultStatus.InternalError,
            extensions: [],
            data: null
        }
    }
}
