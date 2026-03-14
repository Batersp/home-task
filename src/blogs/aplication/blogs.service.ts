import {Blog} from "../types/blog";
import {ObjectId, WithId} from "mongodb";
import {blogsRepository} from "../repositories/blogs.repository";
import {BlogInputDto} from "../dto/blog.input-dto";

export const blogsService = {

    async findById(id: string): Promise<WithId<Blog> | null> {
        return blogsRepository.findById(id);
    },

    async create(dto: BlogInputDto): Promise<ObjectId> {
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
        return blogsRepository.update(id, dto);
    },

    async delete(id: string): Promise<boolean> {
        return blogsRepository.delete(id);
    }
}
