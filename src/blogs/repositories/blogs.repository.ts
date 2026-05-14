import {ObjectId} from "mongodb";
import {injectable} from "inversify";
import {BlogDocument, BlogModel} from "../domain/blog.entity";

@injectable()
export class BlogsRepository {

    async findById(id: string) {
        return BlogModel.findOne({_id: new ObjectId(id)})
    }

    async save(blog: BlogDocument) {
        const saved = await blog.save()
        return saved._id
    }

    async delete(id: string) {
        const deletedResult = await BlogModel.deleteOne({_id: id})
        return deletedResult.deletedCount >= 1;
    }
}
