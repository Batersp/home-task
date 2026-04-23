import {WithId} from "mongodb";
import {Post} from "../types/post";
import {PostsRepository} from "../repositories/posts.repository";
import {PostInputDto} from "../dto/post.input-dto";
import {BlogsService} from "../../blogs/aplication/blogs.service";
import {PostViewModel} from "../types/post-view-model";
import {inject, injectable} from "inversify";
import {PostsQwRepository} from "../repositories/postsQw.repository";

@injectable()
export class PostsService {

    constructor(
        @inject(BlogsService) private blogsService: BlogsService,
        @inject(PostsQwRepository) private postsQwRepository: PostsQwRepository,
        @inject(PostsRepository) private postsRepository: PostsRepository,
    ) {}

    async findById(id: string): Promise<WithId<Post> | null> {
        return this.postsRepository.findById(id);
    }

    async create(dto: PostInputDto): Promise<PostViewModel | null> {
        const {title, shortDescription, content, blogId} = dto;

        const currentBlog = await this.blogsService.findById(blogId);
        if (!currentBlog) return null

        const post: Post = {
            title,
            shortDescription,
            content,
            blogId,
            blogName: '1',
            createdAt: new Date().toISOString()
        }
        const createdPostId = await this.postsRepository.create(post)
        return await this.postsQwRepository.findById(createdPostId.toString())
    }

    async update(id: string, dto: PostInputDto): Promise<boolean> {
        const post = await this.findById(id)
        if(!post) return false

        return await this.postsRepository.update(id, dto)
    }

    async delete(id: string): Promise<boolean> {
        const post = await this.findById(id);
        if(!post) return false
        return this.postsRepository.delete(id)
    }
}
