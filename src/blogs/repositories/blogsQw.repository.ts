import {BlogsQuery} from "../types/get-blogs-query";
import {blogCollection} from "../../db/mongo.db";
import {mapToBlogViewModel} from "../routers/mappers/map-to-blog-view-model.util";
import {ObjectId} from "mongodb";
import {BlogViewModel} from "../types/blog-view-model";
import {PaginatedResponse} from "../../core/types/paginatedResponse";

export const blogsQwRepository = {
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

        const items = await blogCollection
            .find(filter)
            .sort({[sortBy]: sortDirection, 'createdAt': sortDirection || -1})
            .skip(skip)
            .limit(pageSize)
            .toArray();

        const totalCount = await blogCollection.countDocuments(filter);

        return {items: items.map(mapToBlogViewModel), totalCount, pageSize, page: pageNumber, pagesCount: Math.ceil(totalCount / pageSize)};
    },

    async findById(id: string): Promise<BlogViewModel | null> {
        const blog = await blogCollection.findOne({_id: new ObjectId(id)})
        if (!blog) return null;
        return mapToBlogViewModel(blog)
    },
}
