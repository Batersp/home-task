import {Request, Response} from "express";
import {blogsRepository} from "../../repositories/blogs.repository";
import {HttpStatus} from "../../../core/types/http-statuses";

export function updateBlogHandler(req: Request<{id: string}>, res: Response) {
    const blog = blogsRepository.findById(req.params.id);
    if (blog) {
        blogsRepository.update(blog, req.body)
        res.sendStatus(HttpStatus.NoContent);
        return;
    }
    res.sendStatus(HttpStatus.NotFound)
}