import {BlogsQuery} from "../types/get-blogs-query";
import {mapToBlogViewModel} from "../routers/mappers/map-to-blog-view-model.util";
import {ObjectId} from "mongodb";
import {BlogViewModel} from "../types/blog-view-model";
import {PaginatedResponse} from "../../core/types/paginatedResponse";
import {injectable} from "inversify";
import {BlogModel} from "../domain/blog.entity";

@injectable()
export class BlogsQwRepository {
    async findMany(query: BlogsQuery): Promise<PaginatedResponse<BlogViewModel>> {

        const {
            searchNameTerm,
            pageNumber,
            sortBy,
            sortDirection,
            pageSize
        } = query;

        const skip = (pageNumber - 1) * pageSize;
        const filter: any = {};
        if (searchNameTerm) {
            filter.$or = [];
            if (searchNameTerm) {
                filter.$or.push({ name: { $regex: searchNameTerm, $options: 'i' } });
            }
        }

        const items = await BlogModel
            .find(filter)
            .sort({[sortBy]: sortDirection, 'createdAt': sortDirection || -1})
            .skip(skip)
            .limit(pageSize)
            .lean();

        const totalCount = await BlogModel.countDocuments(filter);

        return {items: items.map(mapToBlogViewModel), totalCount, pageSize, page: pageNumber, pagesCount: Math.ceil(totalCount / pageSize)};
    }

    async findById(id: string): Promise<BlogViewModel | null> {
        const blog = await BlogModel.findOne({_id: new ObjectId(id)}).lean()
        if (!blog) return null;
        return mapToBlogViewModel(blog)
    }
}
