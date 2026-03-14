import {ObjectId, WithId} from "mongodb";
import {Post} from "../types/post";
import {postsRepository} from "../repositories/posts.repository";
import {PostInputDto} from "../dto/post.input-dto";

export const postsService = {

    async findById(id: string): Promise<WithId<Post> | null> {
        return postsRepository.findById(id);
    },

    async create(dto: PostInputDto): Promise<ObjectId> {
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
        return await postsRepository.update(id, dto)
    },

    async delete(id: string): Promise<boolean> {
        return postsRepository.delete(id)
    }
}
