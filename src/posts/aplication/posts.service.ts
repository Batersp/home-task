import {WithId} from "mongodb";
import {Post} from "../types/post";
import {PostsRepository} from "../repositories/posts.repository";
import {PostInputDto} from "../dto/post.input-dto";
import {BlogsService} from "../../blogs/aplication/blogs.service";
import {PostViewModel} from "../types/post-view-model";
import {inject, injectable} from "inversify";
import {PostsQwRepository} from "../repositories/postsQw.repository";
import {PostModel} from "../domain/post.entity";
import {Result, ResultStatus} from "../../core/types/result";
import {LIKE_STATUS} from "../../core/enums/like.enum";

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
        const currentBlog = await this.blogsService.findById(dto.blogId);
        if (!currentBlog) return null
        const post = PostModel.createPost(dto, currentBlog.name)
        const createdPostId = await this.postsRepository.save(post)
        return await this.postsQwRepository.findById(createdPostId.toString())
    }

    async update(id: string, dto: PostInputDto): Promise<boolean> {
        const post = await this.postsRepository.findById(id)
        if(!post) return false
        post.update(dto)
        await this.postsRepository.save(post)
        return true
    }

    async updateLikeStatus(postId: string, userId: string, userLogin: string, newStatus: LIKE_STATUS): Promise<Result> {
        const post = await this.postsRepository.findById(postId)
        if(!post) return {
            status: ResultStatus.NotFound,
            extensions: [],
            data: null
        }

        const existingLike = await this.postsRepository.findLike(postId, userId)
        const oldStatus = existingLike?.status ?? LIKE_STATUS.NONE as LIKE_STATUS

        if (oldStatus === newStatus) return {status: ResultStatus.NoContent, extensions: [], data: null}
        post.updateLikeStatus(userId, userLogin, oldStatus, newStatus)
        await this.postsRepository.save(post)

        await this.postsRepository.saveLike({
            postId,
            userId,
            userLogin,
            status: newStatus,
            addedAt: new Date().toISOString()
        })

        return {
            status: ResultStatus.NoContent,
            extensions: [],
            data: null
        }
    }

    async delete(id: string): Promise<boolean> {
        const post = await this.findById(id);
        if(!post) return false
        return this.postsRepository.delete(id)
    }
}
