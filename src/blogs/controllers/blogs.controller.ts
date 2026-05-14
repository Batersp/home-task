import {inject, injectable} from "inversify";
import {Request, Response} from "express";
import {matchedData} from "express-validator";
import {BlogsQuery} from "../types/get-blogs-query";
import {BlogsQwRepository} from "../repositories/blogsQw.repository";
import {HttpStatus} from "../../core/types/http-statuses";
import {PostsQuery} from "../../posts/types/get-posts-query";
import {PostsQwRepository} from "../../posts/repositories/postsQw.repository";
import {BlogInputDto} from "../dto/blog.input-dto";
import {BlogViewModel} from "../types/blog-view-model";
import {BlogsService} from "../aplication/blogs.service";
import {BlogCreatePostInputDto} from "../dto/blogCreatePost.input-dto";
import {PostViewModel} from "../../posts/types/post-view-model";
import {PostsService} from "../../posts/aplication/posts.service";

@injectable()
export class BlogsController {

    constructor(
        @inject(BlogsQwRepository) private blogsQwRepository: BlogsQwRepository,
        @inject(PostsQwRepository) private postsQwRepository: PostsQwRepository,
        @inject(BlogsService) private blogsService: BlogsService,
        @inject(PostsService) private postsService: PostsService
    ) {}

    async getBlogs(req: Request, res: Response) {
        try {
            const sanitizedQuery = matchedData<BlogsQuery>(req, {
                locations: ['query'],
                includeOptionals: true,
            })
            const blogsResponse = await this.blogsQwRepository.findMany(sanitizedQuery);
            res.status(HttpStatus.Ok).send(blogsResponse);
        } catch {
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }

    async getBlog(req: Request<{ id: string }>, res: Response) {
        try {
            const blog = await this.blogsQwRepository.findById(req.params.id);
            if (blog) {
                res.status(HttpStatus.Ok).send(blog)
                return
            }
            res.sendStatus(HttpStatus.NotFound)
        } catch {
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }

    async getBlogPosts(req: Request<{ id: string }, {}, {}>, res: Response) {
        try {
            const currentBlog = await this.blogsQwRepository.findById(req.params.id);
            if (!currentBlog) {
                res.sendStatus(HttpStatus.NotFound)
                return
            }
            const sanitizedQuery = matchedData<PostsQuery>(req, {
                locations: ['query'],
                includeOptionals: true,
            })
            const postsResponse = await this.postsQwRepository.findMany(sanitizedQuery, req.params.id, req.user?.userId);
            res.status(HttpStatus.Ok).send(postsResponse)
        } catch {
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }

    async createBlog(req: Request<{}, {}, BlogInputDto>, res: Response<BlogViewModel>) {
        try {
            const createdBlog = await this.blogsService.create(req.body);
            if (createdBlog) {
                res.status(HttpStatus.Created).send(createdBlog);
                return
            }
            res.sendStatus(HttpStatus.InternalServerError)

        } catch {
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }

    async createPostForBlog(req: Request<{ id: string }, {}, BlogCreatePostInputDto>, res: Response<PostViewModel>) {
        try {
            const {title, shortDescription, content} = req.body;
            const createdPost = await this.postsService.create({
                blogId: req.params.id,
                content,
                title,
                shortDescription,
                dislikesCount: 0,
                likesCount: 0,
                newestLikes: []
            })
            if (createdPost) {
                res.status(HttpStatus.Created).send(createdPost)
                return
            }
            res.sendStatus(HttpStatus.NotFound)
        } catch {
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }

    async updateBlog(req: Request<{ id: string }, {}, BlogInputDto>, res: Response) {
        const id = req.params.id;
        try {
            const isUpdated = await this.blogsService.update(id, req.body)
            if(isUpdated) {
                res.sendStatus(HttpStatus.NoContent);
                return;
            }
            res.sendStatus(HttpStatus.NotFound)
        } catch {
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }

    async deleteBlog(req: Request<{id: string}>, res: Response) {
        try {
            const isSuccessful = await this.blogsService.delete(req.params.id)
            if (isSuccessful) {
                res.sendStatus(HttpStatus.NoContent);
                return
            }
            res.sendStatus(HttpStatus.NotFound)
        } catch {
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }
}
