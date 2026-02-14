import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsRepository} from "../../repositories/blogs.repository";
import { Request, Response } from 'express';
import {mapToBlogViewModel} from "../mappers/map-to-blog-view-model.util";

export async function getBlogsHandler (req: Request, res: Response) {
    try {
        const blogs = await blogsRepository.getAll()
        const blogsViewModel = blogs.map(mapToBlogViewModel)
        res.status(HttpStatus.Ok).send(blogsViewModel);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
