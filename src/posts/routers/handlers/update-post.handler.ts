import {Request, Response} from 'express'
import {postsRepository} from "../../repositories/posts.repository";
import {HttpStatus} from "../../../core/types/http-statuses";

export function updatePostHandler(req: Request<{id: string}>, res: Response) {
    const post = postsRepository.getById(req.params.id)
    if(post) {
        postsRepository.update(post, req.body)
        res.sendStatus(HttpStatus.NoContent)
        return;
    }
    res.sendStatus(HttpStatus.NotFound)
}