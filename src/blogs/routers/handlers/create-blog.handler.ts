import {Request, Response} from "express";
import {Blog} from "../../types/blog";
import {db} from "../../../db/in-memory.db";
import {BlogInputDto} from "../../dto/blog.input-dto";
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsRepository} from "../../repositories/blogs.repository";
import {mapToBlogViewModel} from "../mappers/map-to-blog-view-model.util";

export async function createBlogHandler(req: Request<{}, Blog, BlogInputDto>, res: Response) {
    try {
        const {name, description, websiteUrl} = req.body;
        const blog: Blog = {
            name,
            description,
            websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false,
        }
        const createdBlog = await blogsRepository.create(blog);
        const viewBlog = mapToBlogViewModel(createdBlog)
        res.status(HttpStatus.Created).send(viewBlog);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
