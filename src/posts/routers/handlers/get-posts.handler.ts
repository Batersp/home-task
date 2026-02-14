import {Request, Response} from 'express'
import {HttpStatus} from "../../../core/types/http-statuses";
import {postsRepository} from "../../repositories/posts.repository";
import {mapToPostViewModel} from "../mappers/map-to-post-view-model.util";

export async function getPostsHandler(req: Request, res: Response) {
    try {
        const posts = await postsRepository.getAll()
        res.status(HttpStatus.Ok).send(posts.map(mapToPostViewModel))
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
