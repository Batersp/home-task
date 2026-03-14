import {Request, Response} from "express";
import {BlogCreatePostInputDto} from "../../dto/blogCreatePost.input-dto";
import {postsService} from "../../../posts/aplication/posts.service";
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsService} from "../../aplication/blogs.service";
import {PostViewModel} from "../../../posts/types/post-view-model";
import {postsQwRepository} from "../../../posts/repositories/postsQw.repository";

export async function createPostForBlogHandler(req: Request<{
    id: string
}, {}, BlogCreatePostInputDto>, res: Response<PostViewModel>) {
    try {
        const currentBlog = await blogsService.findById(req.params.id);
        if (!currentBlog) {
            res.sendStatus(HttpStatus.NotFound)
            return
        }
        const {title, shortDescription, content} = req.body;
        const createdPostId = await postsService.create({
            blogId: req.params.id,
            content,
            title,
            shortDescription
        })
        const createdPost = await postsQwRepository.findById(createdPostId.toString())
        if (createdPost) {
            res.status(HttpStatus.Created).send(createdPost)
            return
        }
        res.sendStatus(HttpStatus.InternalServerError)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
