import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {postsService} from "../../aplication/posts.service";

export async function deletePostHandler(req: Request<{id: string}>, res: Response) {
    try {
        const isSuccessful = await postsService.delete(req.params.id);
        if (isSuccessful) {
            res.sendStatus(HttpStatus.NoContent);
            return;
        }
        res.sendStatus(HttpStatus.NotFound)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
