import { Request, Response } from 'express';
import {blogsRepository} from "../../repositories/blogs.repository";
import {HttpStatus} from "../../../core/types/http-statuses";
import {mapToBlogViewModel} from "../mappers/map-to-blog-view-model.util";

export async function getBlogHandler(req: Request<{id: string}>, res: Response) {
    try {
        const blog = await blogsRepository.findById(req.params.id);
        if(blog) {
            const blogViewModel = mapToBlogViewModel(blog);
            res.status(HttpStatus.Ok).send(blogViewModel)
            return
        }
        res.sendStatus(HttpStatus.NotFound)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
