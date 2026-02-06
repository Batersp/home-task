import {Request, Response} from "express";
import {Blog} from "../../types/blog";
import {db} from "../../../db/in-memory.db";
import {BlogInputDto} from "../../dto/blog.input-dto";
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsRepository} from "../../repositories/blogs.repository";

export function createBlogHandler(req: Request<{}, Blog, BlogInputDto>, res: Response) {
    const {name, description, websiteUrl} = req.body;
    const blog: Blog = {
        id: db.blogs.length ? (+db.blogs[db.blogs.length - 1].id + 1).toString() : '1',
        name,
        description,
        websiteUrl,
    }
    blogsRepository.create(blog);
    res.status(HttpStatus.Created).send(blog);
}