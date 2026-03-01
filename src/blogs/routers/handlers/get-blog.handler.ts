import { Request, Response } from 'express';
import {HttpStatus} from "../../../core/types/http-statuses";
import {mapToBlogViewModel} from "../mappers/map-to-blog-view-model.util";
import {blogsService} from "../../aplication/blogs.service";

export async function getBlogHandler(req: Request<{id: string}>, res: Response) {
    try {
        const blog = await blogsService.findById(req.params.id);
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
