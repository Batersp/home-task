import {CommentInputDto} from "../dto/comment.input-dto";
import {commentCollection} from "../../db/mongo.db";
import {ObjectId, WithId} from "mongodb";
import {Comment} from "../types/comment";

export const commentsRepository = {
    async findById(id: string): Promise<WithId<Comment> | null> {
        return commentCollection.findOne({ _id: new ObjectId(id) })
    },

    async create(comment: Comment): Promise<ObjectId> {
        const createdResult = await commentCollection.insertOne(comment);
        return createdResult.insertedId
    },

    async update(id: string, dto: CommentInputDto): Promise<boolean> {
        const {content} = dto
        const updatedResult = await commentCollection.updateOne(
            {
                _id: new ObjectId(id),
            },
            {
                $set: {content}
            }
        )
        return updatedResult.matchedCount > 0
    },

    async delete(id: string): Promise<boolean> {
        const deletedResult = await commentCollection.deleteOne({_id: new ObjectId(id)})
        return deletedResult.deletedCount >= 1;
    }
}
