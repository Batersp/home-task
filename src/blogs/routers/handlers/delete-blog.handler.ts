import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsService} from "../../aplication/blogs.service";

export async function deleteBlogHandler(req: Request<{id: string}>, res: Response) {
    try {
        const isSuccessful = await blogsService.delete(req.params.id)
        if (isSuccessful) {
            res.sendStatus(HttpStatus.NoContent);
            return
        }
        res.sendStatus(HttpStatus.NotFound)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
