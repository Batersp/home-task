import {Blog} from "../types/blog";
import {WithId} from "mongodb";
import {blogsRepository} from "../repositories/blogs.repository";
import {BlogInputDto} from "../dto/blog.input-dto";
import {blogsQwRepository} from "../repositories/blogsQw.repository";
import {BlogViewModel} from "../types/blog-view-model";

export const blogsService = {

    async findById(id: string): Promise<WithId<Blog> | null> {
        return blogsRepository.findById(id);
    },

    async create(dto: BlogInputDto): Promise<BlogViewModel | null> {
        const {name, description, websiteUrl} = dto;
        const blog: Blog = {
            name,
            description,
            websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false,
        }
        const createdBlogId = await blogsRepository.create(blog);
        return await blogsQwRepository.findById(createdBlogId.toString());
    },

    async update(id: string, dto: BlogInputDto): Promise<boolean> {
        const blog = await blogsService.findById(id);
        if(!blog) return false

        return blogsRepository.update(id, dto);
    },

    async delete(id: string): Promise<boolean> {
        return blogsRepository.delete(id);
    }
}
