import {Post} from "../types/post";
import {PostInputDto} from "../dto/post.input-dto";
import {ObjectId, WithId} from "mongodb";
import {injectable} from "inversify";
import {PostModel} from "../../db/models/post.model";

@injectable()
export class PostsRepository {

    async findById(id: string): Promise<WithId<Post> | null> {
        return PostModel.findOne({_id: new ObjectId(id)}).lean();
    }

    async create(post: Post): Promise<ObjectId> {
        const postInstance = new PostModel(post);
        await postInstance.save()
        return postInstance._id
    }

    async update(id: string, dto: PostInputDto): Promise<boolean> {
        const {title, shortDescription, content, blogId} = dto
        const updatedResult = await PostModel.updateOne(
            {_id: new ObjectId(id)},
            {title, shortDescription, content, blogId},
        )
        return updatedResult.matchedCount > 0
    }

    async delete(id: string):Promise<boolean> {
        const deletedResult = await PostModel.deleteOne({_id: new ObjectId(id)});
        return deletedResult.deletedCount >= 1;
    }
}
