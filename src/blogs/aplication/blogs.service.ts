import {Blog, BlogsResponse} from "../types/blog";
import {WithId} from "mongodb";
import {blogsRepository} from "../repositories/blogs.repository";
import {BlogInputDto} from "../dto/blog.input-dto";
import {BlogsQuery} from "../types/get-blogs-query";

export const blogsService = {
    async findMany(query: BlogsQuery): Promise<BlogsResponse> {
        return blogsRepository.findMany(query);
    },

    async findById(id: string): Promise<WithId<Blog> | null> {
        return blogsRepository.findById(id);
    },

    async create(dto: BlogInputDto): Promise<WithId<Blog>> {
        const {name, description, websiteUrl} = dto;
        const blog: Blog = {
            name,
            description,
            websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false,
        }
        return blogsRepository.create(blog);
    },

    async update(id: string, dto: BlogInputDto): Promise<boolean> {
        const blog = await blogsRepository.findById(id);
        if(blog) {
            await blogsRepository.update(id, dto);
            return true;
        }
        return false;
    },

    async delete(id: string): Promise<boolean> {
        return blogsRepository.delete(id);
    }
}
