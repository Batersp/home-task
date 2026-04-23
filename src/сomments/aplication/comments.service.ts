import {CommentInputDto} from "../dto/comment.input-dto";
import {CommentsRepository} from "../repositories/comments.repository";
import {WithId} from "mongodb";
import {Comment, CommentatorInfo} from "../types/comment";
import {PostsService} from "../../posts/aplication/posts.service";
import {CommentViewModel} from "../types/comment-view-model";
import {CommentsQwRepository} from "../repositories/commentsQw.repository";
import {Result, ResultStatus} from "../../core/types/result";
import {inject, injectable} from "inversify";

@injectable()
export class CommentsService {

    constructor(
        @inject(CommentsRepository) private commentsRepository: CommentsRepository,
        @inject(PostsService) private postsService: PostsService,
        @inject(CommentsQwRepository) private commentsQwRepository: CommentsQwRepository
    ) {}

    async findById(id: string): Promise<WithId<Comment> | null> {
        return this.commentsRepository.findById(id)
    }

    async create(postId: string, commentatorInfo: CommentatorInfo, dto:  CommentInputDto): Promise<CommentViewModel | null> {
        const post = await this.postsService.findById(postId);
        if (!post) return null;

        const {content} = dto
        const comment: Comment = {
            content,
            postId,
            commentatorInfo,
            createdAt: new Date().toISOString()
        }
        const createdCommentId = await this.commentsRepository.create(comment)
        return await this.commentsQwRepository.findById(createdCommentId.toString())
    }

    async update(commentId: string, dto: CommentInputDto, currentUserId: string): Promise<Result> {
        const comment = await this.findById(commentId)
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

        const isUpdated = await this.commentsRepository.update(commentId, dto)
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
    }

    async delete(commentId: string, currentUserId: string): Promise<Result> {
        const comment = await this.findById(commentId);
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

        const isDeleted = await this.commentsRepository.delete(commentId)
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
