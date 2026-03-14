import {Request, Response} from 'express'
import {HttpStatus} from "../../../core/types/http-statuses";
import {postsService} from "../../aplication/posts.service";
import {PostInputDto} from "../../dto/post.input-dto";

export async function updatePostHandler(req: Request<{id: string}, {}, PostInputDto>, res: Response) {
    try {
        const post = await postsService.findById(req.params.id)
        if(!post) {
            res.sendStatus(HttpStatus.NotFound)
            return
        }

        const isUpdated = await postsService.update(req.params.id, req.body)
        if (isUpdated) {
            res.sendStatus(HttpStatus.NoContent)
            return;
        }
        res.sendStatus(HttpStatus.InternalServerError)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
