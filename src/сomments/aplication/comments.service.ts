import {CommentInputDto} from "../dto/comment.input-dto";
import {commentsRepository} from "../repositories/comments.repository";
import {ObjectId, WithId} from "mongodb";
import {Comment, CommentatorInfo} from "../types/comment";

export const commentsService = {
    async findById(id: string): Promise<WithId<Comment> | null> {
        return commentsRepository.findById(id)
    },

    async create(postId: string, commentatorInfo: CommentatorInfo, dto:  CommentInputDto): Promise<ObjectId> {
        const {content} = dto
        const comment: Comment = {
            content,
            postId,
            commentatorInfo,
            createdAt: new Date().toISOString()
        }
        return commentsRepository.create(comment)
    },

    async update(id: string, dto: CommentInputDto): Promise<boolean> {
        return commentsRepository.update(id, dto)
    },

    async delete(id: string): Promise<boolean> {
        return commentsRepository.delete(id)
    }
}
