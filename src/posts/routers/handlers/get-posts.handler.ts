import {Request, Response} from 'express'
import {HttpStatus} from "../../../core/types/http-statuses";
import {postsRepository} from "../../repositories/posts.repository";

export function getPostsHandler(req: Request, res: Response) {
    res.status(HttpStatus.Ok).send(postsRepository.getAll())
}