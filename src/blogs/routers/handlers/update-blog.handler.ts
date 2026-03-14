import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsService} from "../../aplication/blogs.service";
import {BlogInputDto} from "../../dto/blog.input-dto";

export async function updateBlogHandler(req: Request<{ id: string }, {}, BlogInputDto>, res: Response) {
    const id = req.params.id;
    try {
        const blog = await blogsService.findById(id);
        if(!blog) {
            res.sendStatus(HttpStatus.NotFound)
            return
        }
        const isUpdated = await blogsService.update(id, req.body)
        if(isUpdated) {
            res.sendStatus(HttpStatus.NoContent);
            return;
        }
        res.sendStatus(HttpStatus.InternalServerError)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
