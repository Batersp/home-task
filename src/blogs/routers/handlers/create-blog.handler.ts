import {Request, Response} from "express";
import {BlogInputDto} from "../../dto/blog.input-dto";
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsService} from "../../aplication/blogs.service";
import {BlogViewModel} from "../../types/blog-view-model";
import {blogsQwRepository} from "../../repositories/blogsQw.repository";

export async function createBlogHandler(req: Request<{}, {}, BlogInputDto>, res: Response<BlogViewModel>) {
    try {
        const createdBlogId = await blogsService.create(req.body);
        const createdBlog = await blogsQwRepository.findById(createdBlogId.toString());
        if (createdBlog) {
            res.status(HttpStatus.Created).send(createdBlog);
            return
        }
        res.sendStatus(HttpStatus.InternalServerError)

    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
