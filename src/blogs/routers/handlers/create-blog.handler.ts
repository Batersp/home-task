import {Request, Response} from "express";
import {BlogInputDto} from "../../dto/blog.input-dto";
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsService} from "../../aplication/blogs.service";
import {BlogViewModel} from "../../types/blog-view-model";

export async function createBlogHandler(req: Request<{}, {}, BlogInputDto>, res: Response<BlogViewModel>) {
    try {
        const createdBlog = await blogsService.create(req.body);
        if (createdBlog) {
            res.status(HttpStatus.Created).send(createdBlog);
            return
        }
        res.sendStatus(HttpStatus.InternalServerError)

    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
