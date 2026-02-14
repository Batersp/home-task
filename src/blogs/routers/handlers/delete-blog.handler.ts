import {Request, Response} from "express";
import {blogsRepository} from "../../repositories/blogs.repository";
import {HttpStatus} from "../../../core/types/http-statuses";

export async function deleteBlogHandler(req: Request<{id: string}>, res: Response) {
    try {
        const isSuccessful = await blogsRepository.delete(req.params.id)
        if (isSuccessful) {
            res.sendStatus(HttpStatus.NoContent);
            return
        }
        res.sendStatus(HttpStatus.NotFound)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
