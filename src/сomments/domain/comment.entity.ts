import {HydratedDocument, model, Model, Schema} from "mongoose";
import {CommentatorInfo} from "../types/comment";
import {CommentInputDto} from "../dto/comment.input-dto";
import {Comment} from '../types/comment'
import {LIKE_STATUS} from "../../core/enums/like.enum";

const commentSchema = new Schema<Comment>({
    content: {type: String, required: true, minlength: 1, maxlength: 1000},
    commentatorInfo: {
        userId: {type: String, required: true, minlength: 1, maxlength: 100},
        userLogin: {type: String, required: true, minlength: 1, maxlength: 100},
    },
    postId: {type: String, required: true, minlength: 1, maxlength: 1000},
    createdAt: {type: String, required: true, default: new Date().toISOString()},
    likesInfo: {
        type: [{
            userId: { type: String, required: true },
            status: {
                type: String,
                enum: Object.values(LIKE_STATUS),
                required: true
            },
        }],
        default: []
    }
})

export class CommentEntity {
    private constructor(
        public content: string,
        public commentatorInfo: {
            userId: string,
            userLogin: string,
        },
        public postId: string,
        public createdAt: string,
        public likesInfo: {userId: string, status: LIKE_STATUS}[],
    ) {}

    static createComment(postId: string, commentatorInfo: CommentatorInfo, dto:  CommentInputDto) {
        const comment = new CommentModel({
            content: dto.content,
            postId,
            commentatorInfo,
            createdAt: new Date().toISOString(),
            likesInfo: []
        });
        if(comment.content.length < 1 || comment.content.length > 1000) {
            throw new Error("content length must be between 1 and 1000 characters");
        }
        return comment
    }

    update(dto: CommentInputDto) {
        const {content} = dto
        if(content && (content.length < 1 || content.length > 1000)) {
            throw new Error("content length must be between 1 and 1000 characters");
        }
        if(content) {
            this.content = content
        }
    }

    updateLikeStatus(userId: string, likeStatus: LIKE_STATUS) {
        const existingLike = this.likesInfo.find(like => like.userId === userId)
        if (existingLike) {
            existingLike.status = likeStatus
        } else {
            this.likesInfo.push({ userId, status: likeStatus })
        }
    }
}

interface CommentMethods {
    update: (dto: CommentInputDto) => void
    updateLikeStatus: (userId: string, likeStatus: LIKE_STATUS) => void
}

type CommentStatics = typeof CommentEntity;
type CommentModel = Model<Comment, {}, CommentMethods> & CommentStatics
export type CommentDocument = HydratedDocument<Comment, CommentMethods>
commentSchema.loadClass(CommentEntity)
export const CommentModel = model<Comment, CommentModel>('comments', commentSchema)
