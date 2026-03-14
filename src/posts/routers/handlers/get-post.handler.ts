import {Request, Response} from 'express'
import {HttpStatus} from "../../../core/types/http-statuses";
import {PostViewModel} from "../../types/post-view-model";
import {postsQwRepository} from "../../repositories/postsQw.repository";

export async function getPostHandler(req: Request<{id: string}>, res: Response<PostViewModel>) {
    try {
        const post = await postsQwRepository.findById(req.params.id);
        if (post) {
            res.status(HttpStatus.Ok).send(post);
            return;
        }
        res.sendStatus(HttpStatus.NotFound);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
