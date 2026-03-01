import {Request, Response} from 'express'
import {HttpStatus} from "../../../core/types/http-statuses";
import {mapToPostViewModel} from "../mappers/map-to-post-view-model.util";
import {postsService} from "../../aplication/posts.service";

export async function getPostHandler(req: Request<{id: string}>, res: Response) {
    try {
        const post = await postsService.findById(req.params.id);
        if (post) {
            const postViewModel = mapToPostViewModel(post);
            res.status(HttpStatus.Ok).send(postViewModel);
            return;
        }
        res.sendStatus(HttpStatus.NotFound);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
