import {Request, Response} from "express";
import {BlogCreatePostInputDto} from "../../dto/blogCreatePost.input-dto";
import {postsService} from "../../../posts/aplication/posts.service";
import {HttpStatus} from "../../../core/types/http-statuses";
import {PostViewModel} from "../../../posts/types/post-view-model";

export async function createPostForBlogHandler(req: Request<{
    id: string
}, {}, BlogCreatePostInputDto>, res: Response<PostViewModel>) {
    try {
        const {title, shortDescription, content} = req.body;
        const createdPost = await postsService.create({
            blogId: req.params.id,
            content,
            title,
            shortDescription
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
