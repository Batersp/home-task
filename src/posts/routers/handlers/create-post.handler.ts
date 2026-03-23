import {Request, Response} from 'express'
import {PostInputDto} from "../../dto/post.input-dto";
import {Post} from "../../types/post";
import {HttpStatus} from "../../../core/types/http-statuses";
import {postsService} from "../../aplication/posts.service";
import {PostViewModel} from "../../types/post-view-model";

export async function createPostHandler(req: Request<{}, Post, PostInputDto>, res: Response<PostViewModel>) {
    try {
        const createdPost = await postsService.create(req.body)
        if(createdPost) {
            res.status(HttpStatus.Created).send(createdPost)
            return
        }
        res.sendStatus(HttpStatus.InternalServerError)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
