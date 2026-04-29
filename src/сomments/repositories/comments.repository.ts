import {CommentInputDto} from "../dto/comment.input-dto";
import {ObjectId, WithId} from "mongodb";
import {Comment, LIKE_STATUS, LikesInfo} from "../types/comment";
import {injectable} from "inversify";
import {CommentModel} from "../../db/models/comment.model";

@injectable()
export class CommentsRepository {
    async findById(id: string) {
        return CommentModel.findOne({ _id: new ObjectId(id) })
    }

    async create(comment: Comment): Promise<ObjectId> {
        const commentInstance = new CommentModel(comment);
        await commentInstance.save()
        return commentInstance._id
    }

    async update(id: string, dto: CommentInputDto): Promise<boolean> {
        const {content} = dto
        const updatedResult = await CommentModel.updateOne(
            {_id: new ObjectId(id)}, {content}
        )
        return updatedResult.matchedCount > 0
    }

    async delete(id: string): Promise<boolean> {
        const deletedResult = await CommentModel.deleteOne({_id: new ObjectId(id)})
        return deletedResult.deletedCount >= 1;
    }

    async updateLikeStatus(commentId: string, userId: string, likeStatus: LIKE_STATUS): Promise<boolean> {
        const updateExisting = await CommentModel.updateOne(
            { _id: new ObjectId(commentId), 'likesInfo.userId': userId },
            { $set: { 'likesInfo.$.status': likeStatus } }
        )

        if (updateExisting.matchedCount > 0) return true;

        const addNew = await CommentModel.updateOne(
            { _id: new ObjectId(commentId) },
            { $push: { likesInfo: { userId, status: likeStatus } } }
        )

        return addNew.matchedCount > 0;
    }
}
