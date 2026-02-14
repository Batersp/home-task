import {Request, Response} from 'express'
import {postsRepository} from "../../repositories/posts.repository";
import {HttpStatus} from "../../../core/types/http-statuses";

export async function updatePostHandler(req: Request<{id: string}>, res: Response) {
    const id = req.params.id;
    try {
        const post = await postsRepository.getById(id)
        if (post) {
            await postsRepository.update(id, req.body)
            res.sendStatus(HttpStatus.NoContent)
            return;
        }
        res.sendStatus(HttpStatus.NotFound)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
