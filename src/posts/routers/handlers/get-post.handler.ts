import {Request, Response} from 'express'
import {postsRepository} from "../../repositories/posts.repository";
import {HttpStatus} from "../../../core/types/http-statuses";

export function getPostHandler(req: Request<{id: string}>, res: Response) {
    const post = postsRepository.getById(req.params.id);
    if (post) {
        res.status(HttpStatus.Ok).send(post);
        return;
    }
    res.sendStatus(HttpStatus.NotFound);
}