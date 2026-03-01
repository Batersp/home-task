import {Request, Response} from "express";
import {Blog} from "../../types/blog";
import {BlogInputDto} from "../../dto/blog.input-dto";
import {HttpStatus} from "../../../core/types/http-statuses";
import {mapToBlogViewModel} from "../mappers/map-to-blog-view-model.util";
import {blogsService} from "../../aplication/blogs.service";

export async function createBlogHandler(req: Request<{}, Blog, BlogInputDto>, res: Response) {
    try {
        const createdBlog = await blogsService.create(req.body);
        const viewBlog = mapToBlogViewModel(createdBlog)
        res.status(HttpStatus.Created).send(viewBlog);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
