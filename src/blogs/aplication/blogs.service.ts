import {BlogsRepository} from "../repositories/blogs.repository";
import {BlogInputDto} from "../dto/blog.input-dto";
import {BlogViewModel} from "../types/blog-view-model";
import {inject, injectable} from "inversify";
import {BlogsQwRepository} from "../repositories/blogsQw.repository";
import {BlogModel} from "../domain/blog.entity";

@injectable()
export class BlogsService {

    constructor(
        @inject(BlogsRepository) private blogsRepository: BlogsRepository,
        @inject(BlogsQwRepository) private blogsQwRepository: BlogsQwRepository
    ) {}

    async findById(id: string) {
        return this.blogsRepository.findById(id);
    }

    async create(dto: BlogInputDto): Promise<BlogViewModel | null> {
        const blog = BlogModel.createBlog(dto)
        const createdBlogId = await this.blogsRepository.save(blog);
        return await this.blogsQwRepository.findById(createdBlogId.toString());
    }

    async update(id: string, dto: BlogInputDto): Promise<boolean> {
        const blog = await this.blogsRepository.findById(id)
        if (!blog) return false

        blog.update(dto)
        await this.blogsRepository.save(blog)
        return true
    }

    async delete(id: string): Promise<boolean> {
        return this.blogsRepository.delete(id);
    }
}
