import {Request, Response} from "express";
import {blogsRepository} from "../../repositories/blogs.repository";
import {HttpStatus} from "../../../core/types/http-statuses";

export function deleteBlogHandler(req: Request<{id: string}>, res: Response) {
    const isSuccessful = blogsRepository.delete(req.params.id)
    if (isSuccessful) {
        res.sendStatus(HttpStatus.NoContent);
        return
    }
    res.sendStatus(HttpStatus.NotFound)
}