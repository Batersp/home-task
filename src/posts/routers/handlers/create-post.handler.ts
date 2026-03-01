import {Request, Response} from 'express'
import {PostInputDto} from "../../dto/post.input-dto";
import {Post} from "../../types/post";
import {HttpStatus} from "../../../core/types/http-statuses";
import {mapToPostViewModel} from "../mappers/map-to-post-view-model.util";
import {postsService} from "../../aplication/posts.service";

export async function createPostHandler(req: Request<{}, Post, PostInputDto>, res: Response) {
    try {
        const createdPost = await postsService.create(req.body)
        const postViewModel = mapToPostViewModel(createdPost)
        res.status(HttpStatus.Created).send(postViewModel)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
