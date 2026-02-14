import {Request, Response} from 'express'
import {postsRepository} from "../../repositories/posts.repository";
import {HttpStatus} from "../../../core/types/http-statuses";
import {mapToPostViewModel} from "../mappers/map-to-post-view-model.util";

export async function getPostHandler(req: Request<{id: string}>, res: Response) {
    try {
        const post = await postsRepository.getById(req.params.id);
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
