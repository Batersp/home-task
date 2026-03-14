import {Request, Response} from 'express'
import {PostInputDto} from "../../dto/post.input-dto";
import {Post} from "../../types/post";
import {HttpStatus} from "../../../core/types/http-statuses";
import {postsService} from "../../aplication/posts.service";
import {PostViewModel} from "../../types/post-view-model";
import {postsQwRepository} from "../../repositories/postsQw.repository";

export async function createPostHandler(req: Request<{}, Post, PostInputDto>, res: Response<PostViewModel>) {
    try {
        const createdPostId = await postsService.create(req.body)
        const post = await postsQwRepository.findById(createdPostId.toString())
        if(post) {
            res.status(HttpStatus.Created).send(post)
            return
        }
        res.sendStatus(HttpStatus.InternalServerError)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
