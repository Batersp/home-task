import {Blog} from "../types/blog";
import {WithId} from "mongodb";
import {BlogsRepository} from "../repositories/blogs.repository";
import {BlogInputDto} from "../dto/blog.input-dto";
import {BlogViewModel} from "../types/blog-view-model";
import {inject, injectable} from "inversify";
import {BlogsQwRepository} from "../repositories/blogsQw.repository";

@injectable()
export class BlogsService {

    constructor(
        @inject(BlogsRepository) private blogsRepository: BlogsRepository,
        @inject(BlogsQwRepository) private blogsQwRepository: BlogsQwRepository
    ) {}

    async findById(id: string): Promise<WithId<Blog> | null> {
        return this.blogsRepository.findById(id);
    }

    async create(dto: BlogInputDto): Promise<BlogViewModel | null> {
        const {name, description, websiteUrl} = dto;
        const blog: Blog = {
            name,
            description,
            websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false,
        }
        const createdBlogId = await this.blogsRepository.create(blog);
        return await this.blogsQwRepository.findById(createdBlogId.toString());
    }

    async update(id: string, dto: BlogInputDto): Promise<boolean> {
        const blog = await this.findById(id);
        if (!blog) return false

        return this.blogsRepository.update(id, dto);
    }

    async delete(id: string): Promise<boolean> {
        return this.blogsRepository.delete(id);
    }
}
