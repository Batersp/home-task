import {Request, Response} from "express";
import {Post} from "../../../posts/types/post";
import {BlogCreatePostInputDto} from "../../dto/blogCreatePost.input-dto";
import {postsService} from "../../../posts/aplication/posts.service";
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsService} from "../../aplication/blogs.service";
import {mapToPostViewModel} from "../../../posts/routers/mappers/map-to-post-view-model.util";

export async function createPostForBlogHandler(req: Request<{id: string}, Post, BlogCreatePostInputDto>, res: Response) {
    try {
        console.log(req.params.id)
        const currentBlog = await blogsService.findById(req.params.id);
        if(!currentBlog) {
            res.sendStatus(HttpStatus.NotFound)
            return
        }
        const {title, shortDescription, content} = req.body;
        const createdPost = await postsService.create({
            blogId: req.params.id,
            content,
            title,
            shortDescription
        })
        const postViewModel = mapToPostViewModel(createdPost)
        res.status(HttpStatus.Created).send(postViewModel)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
