import {Request, Response} from "express";
import {blogsRepository} from "../../repositories/blogs.repository";
import {HttpStatus} from "../../../core/types/http-statuses";

export async function updateBlogHandler(req: Request<{id: string}>, res: Response) {
    const id = req.params.id;
    try {
        const blog = await blogsRepository.findById(id);
        if (blog) {
            await blogsRepository.update(id, req.body)
            res.sendStatus(HttpStatus.NoContent);
            return;
        }
        res.sendStatus(HttpStatus.NotFound)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
