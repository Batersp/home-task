import {WithId} from "mongodb";
import {Post} from "../types/post";
import {postsRepository} from "../repositories/posts.repository";
import {PostInputDto} from "../dto/post.input-dto";
import {blogsService} from "../../blogs/aplication/blogs.service";
import {PostViewModel} from "../types/post-view-model";
import {postsQwRepository} from "../repositories/postsQw.repository";

export const postsService = {

    async findById(id: string): Promise<WithId<Post> | null> {
        return postsRepository.findById(id);
    },

    async create(dto: PostInputDto): Promise<PostViewModel | null> {
        const {title, shortDescription, content, blogId} = dto;

        const currentBlog = await blogsService.findById(blogId);
        if (!currentBlog) return null

        const post: Post = {
            title,
            shortDescription,
            content,
            blogId,
            blogName: '1',
            createdAt: new Date().toISOString()
        }
        const createdPostId = await postsRepository.create(post)
        return await postsQwRepository.findById(createdPostId.toString())
    },

    async update(id: string, dto: PostInputDto): Promise<boolean> {
        const post = await postsService.findById(id)
        if(!post) return false

        return await postsRepository.update(id, dto)
    },

    async delete(id: string): Promise<boolean> {
        const post = await postsService.findById(id);
        if(!post) return false
        return postsRepository.delete(id)
    }
}
