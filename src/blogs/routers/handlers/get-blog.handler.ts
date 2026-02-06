import { Request, Response } from 'express';
import {blogsRepository} from "../../repositories/blogs.repository";
import {HttpStatus} from "../../../core/types/http-statuses";

export function getBlogHandler(req: Request<{id: string}>, res: Response) {
    const blog = blogsRepository.findById(req.params.id);
    if(blog) {
        res.status(HttpStatus.Ok).send(blog)
        return
    }
    res.sendStatus(HttpStatus.NotFound)
}