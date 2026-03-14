import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {postsService} from "../../aplication/posts.service";

export async function deletePostHandler(req: Request<{id: string}>, res: Response) {
    try {
        const post = await postsService.findById(req.params.id);
        if(!post) {
            res.sendStatus(HttpStatus.NotFound)
            return;
        }
        const isSuccessful = await postsService.delete(req.params.id);
        if (isSuccessful) {
            res.sendStatus(HttpStatus.NoContent);
            return;
        }
        res.sendStatus(HttpStatus.InternalServerError)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
