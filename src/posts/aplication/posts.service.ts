import {WithId} from "mongodb";
import {Post, PostsResponse} from "../types/post";
import {postsRepository} from "../repositories/posts.repository";
import {PostInputDto} from "../dto/post.input-dto";
import {PostsQuery} from "../types/get-posts-query";

export const postsService = {
    async findMany(query: PostsQuery, blogId?: string): Promise<PostsResponse> {
        return postsRepository.findMany(query, blogId);
    },

    async findById(id: string): Promise<WithId<Post> | null> {
        return postsRepository.findById(id);
    },

    async create(dto: PostInputDto): Promise<WithId<Post>> {
        const {title, shortDescription, content, blogId} = dto;
        const post: Post = {
            title,
            shortDescription,
            content,
            blogId,
            blogName: '1',
            createdAt: new Date().toISOString()
        }
        return postsRepository.create(post)
    },

    async update(id: string, dto: PostInputDto): Promise<boolean> {
        const post = await postsRepository.findById(id)
        if(post) {
            await postsRepository.update(id, dto)
            return true
        }
        return false
    },

    async delete(id: string): Promise<boolean> {
        return postsRepository.delete(id)
    }
}
