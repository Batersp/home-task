import {ObjectId} from "mongodb";
import {injectable} from "inversify";
import {PostDocument, PostModel} from "../domain/post.entity";
import {PostLikesModel} from "../../db/models/postLikes.model";
import {PostLike} from "../../core/types/postLikesCollection";

@injectable()
export class PostsRepository {

    async findById(id: string) {
        return PostModel.findOne({_id: new ObjectId(id)});
    }

    async save(post: PostDocument): Promise<ObjectId> {
        const saved = await post.save()
        return saved._id
    }

    async findLike(postId: string, userId: string): Promise<PostLike | null> {
        return PostLikesModel.findOne({postId, userId}).lean()
    }

    async saveLike(like: PostLike) {
        await PostLikesModel.findOneAndUpdate(
            {postId: like.postId, userId: like.userId},
            {$set: like},
            {upsert: true}
        )
    }

    async delete(id: string):Promise<boolean> {
        const deletedResult = await PostModel.deleteOne({_id: new ObjectId(id)});
        return deletedResult.deletedCount >= 1;
    }
}
