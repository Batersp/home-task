import {Request, Response} from "express";
import {postsRepository} from "../../repositories/posts.repository";
import {HttpStatus} from "../../../core/types/http-statuses";

export function deletePostHandler(req: Request<{id: string}>, res: Response) {
    const isSuccessful = postsRepository.delete(req.params.id);
    if (isSuccessful) {
        res.sendStatus(HttpStatus.NoContent);
        return;
    }
    res.sendStatus(HttpStatus.NotFound)
}