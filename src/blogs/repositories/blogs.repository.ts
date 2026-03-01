import {Blog, BlogsResponse} from "../types/blog";
import {BlogInputDto} from "../dto/blog.input-dto";
import {ObjectId, WithId} from "mongodb";
import {blogCollection} from "../../db/mongo.db";
import {BlogsQuery} from "../types/get-blogs-query";

export const blogsRepository = {

    async findMany(query: BlogsQuery): Promise<BlogsResponse> {

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
            .sort({[sortBy]: sortDirection})
            .skip(skip)
            .limit(pageSize)
            .toArray();

        const totalCount = await blogCollection.countDocuments(filter);

        return {items, totalCount, pageSize, page: pageNumber, pagesCount: Math.ceil(totalCount / pageSize)};

    },

    async findById(id: string): Promise<WithId<Blog> | null> {
        return blogCollection.findOne({_id: new ObjectId(id)})
    },

    async create(blog: Blog): Promise<WithId<Blog>> {
        const createResult = await blogCollection.insertOne(blog);
        return {_id: createResult.insertedId, ...blog};
    },

    async update(id: string, dto: BlogInputDto): Promise<void> {
        const {name, description, websiteUrl} = dto
        const updatedBlog = await blogCollection.updateOne(
            {
                _id: new ObjectId(id)
            },
            {
                $set: {
                    name,
                    description,
                    websiteUrl
                }
            }
        );
        if(updatedBlog.matchedCount < 1) {
            throw new Error('Blog not exist');
        }
    },

    async delete(id: string) {
        const deletedResult = await blogCollection.deleteOne({_id: new ObjectId(id)})
        return deletedResult.deletedCount >= 1;
    }
}
