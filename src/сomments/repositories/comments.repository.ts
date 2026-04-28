import {CommentInputDto} from "../dto/comment.input-dto";
import {ObjectId, WithId} from "mongodb";
import {Comment} from "../types/comment";
import {injectable} from "inversify";
import {CommentModel} from "../../db/models/comment.model";

@injectable()
export class CommentsRepository {
    async findById(id: string): Promise<WithId<Comment> | null> {
        return CommentModel.findOne({ _id: new ObjectId(id) }).lean()
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
}
