import {Request, Response} from "express";
import {PaginatedResponse} from "../../core/types/paginatedResponse";
import {PostViewModel} from "../types/post-view-model";
import {matchedData} from "express-validator";
import {PostsQuery} from "../types/get-posts-query";
import {PostsQwRepository} from "../repositories/postsQw.repository";
import {HttpStatus} from "../../core/types/http-statuses";
import {inject, injectable} from "inversify";
import {CommentViewModel} from "../../сomments/types/comment-view-model";
import {PostsRepository} from "../repositories/posts.repository";
import {CommentsQuery} from "../../blogs/types/get-comments-query";
import {CommentsQwRepository} from "../../сomments/repositories/commentsQw.repository";
import {Post} from "../types/post";
import {PostInputDto} from "../dto/post.input-dto";
import {PostsService} from "../aplication/posts.service";
import {CommentsService} from "../../сomments/aplication/comments.service";

@injectable()
export class PostsController {

    constructor(
        @inject(PostsQwRepository) private postsQwRepository: PostsQwRepository,
        @inject(PostsRepository) private postsRepository: PostsRepository,
        @inject(PostsService) private postsService: PostsService,
        @inject(CommentsService) private commentsService: CommentsService,
        @inject(CommentsQwRepository) private commentsQwRepository: CommentsQwRepository
    ) {}

    async getPosts(req: Request, res: Response<PaginatedResponse<PostViewModel>>) {
        try {
            const sanitizedQuery = matchedData<PostsQuery>(req, {
                locations: ['query'],
                includeOptionals: true,
            })
            const postsResponse = await this.postsQwRepository.findMany(sanitizedQuery)
            res.status(HttpStatus.Ok).send(postsResponse)
        } catch {
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }

    async getPost(req: Request<{id: string}>, res: Response<PostViewModel>) {
        try {
            const post = await this.postsQwRepository.findById(req.params.id);
            if (post) {
                res.status(HttpStatus.Ok).send(post);
                return;
            }
            res.sendStatus(HttpStatus.NotFound);
        } catch {
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }

    async getComments(req: Request<{id: string}>, res: Response<PaginatedResponse<CommentViewModel>>) {
        try {
            const post = await this.postsRepository.findById(req.params.id);
            if(!post) {
                res.sendStatus(HttpStatus.NotFound);
                return
            }
            const sanitizedQuery = matchedData<CommentsQuery>(req, {
                locations: ['query'],
                includeOptionals: true,
            })
            const commentsResponse = await this.commentsQwRepository.findMany(sanitizedQuery, req.params.id);
            res.status(HttpStatus.Ok).send(commentsResponse);
        } catch {
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }

    async createPost(req: Request<{}, Post, PostInputDto>, res: Response<PostViewModel>) {
        try {
            const createdPost = await this.postsService.create(req.body)
            if(createdPost) {
                res.status(HttpStatus.Created).send(createdPost)
                return
            }
            res.sendStatus(HttpStatus.InternalServerError)
        } catch {
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }

    async createComment(req: Request<{id: string}>, res: Response<CommentViewModel>) {
        try {
            const createdComment = await this.commentsService.create(
                req.params.id,
                {userId: req.user!.userId, userLogin: req.user!.userLogin},
                req.body
            )
            if(createdComment) {
                res.status(HttpStatus.Created).send(createdComment)
                return
            }
            res.sendStatus(HttpStatus.NotFound)
        } catch {
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }

    async updatePost(req: Request<{id: string}, {}, PostInputDto>, res: Response) {
        try {
            const isUpdated = await this.postsService.update(req.params.id, req.body)
            if (isUpdated) {
                res.sendStatus(HttpStatus.NoContent)
                return;
            }
            res.sendStatus(HttpStatus.NotFound)
        } catch {
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }

    async deletePost(req: Request<{id: string}>, res: Response) {
        try {
            const isSuccessful = await this.postsService.delete(req.params.id);
            if (isSuccessful) {
                res.sendStatus(HttpStatus.NoContent);
                return;
            }
            res.sendStatus(HttpStatus.NotFound)
        } catch {
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }
}
