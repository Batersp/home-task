import { Request, Response } from 'express';
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsQwRepository} from "../../repositories/blogsQw.repository";

export async function getBlogHandler(req: Request<{id: string}>, res: Response) {
    try {
        const blog = await blogsQwRepository.findById(req.params.id);
        if(blog) {
            res.status(HttpStatus.Ok).send(blog)
            return
        }
        res.sendStatus(HttpStatus.NotFound)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
