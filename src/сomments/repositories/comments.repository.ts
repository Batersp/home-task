import {ObjectId} from "mongodb";
import {injectable} from "inversify";
import {CommentDocument, CommentModel} from "../domain/comment.entity";

@injectable()
export class CommentsRepository {
    async findById(id: string) {
        return CommentModel.findOne({ _id: new ObjectId(id) })
    }

    async save(comment: CommentDocument): Promise<ObjectId> {
        const saved = await comment.save()
        return saved._id
    }

    async delete(id: string): Promise<boolean> {
        const deletedResult = await CommentModel.deleteOne({_id: new ObjectId(id)})
        return deletedResult.deletedCount >= 1;
    }
}
