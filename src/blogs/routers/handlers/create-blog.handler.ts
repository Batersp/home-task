import {Request, Response} from "express";
import {BlogInputDto} from "../../dto/blog.input-dto";
import {HttpStatus} from "../../../core/types/http-statuses";
import {mapToBlogViewModel} from "../mappers/map-to-blog-view-model.util";
import {blogsService} from "../../aplication/blogs.service";
import {BlogViewModel} from "../../types/blog-view-model";

export async function createBlogHandler(req: Request<{}, {}, BlogInputDto>, res: Response<BlogViewModel>) {
    try {
        const createdBlog = await blogsService.create(req.body);
        const viewBlog = mapToBlogViewModel(createdBlog)
        res.status(HttpStatus.Created).send(viewBlog);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
