import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsRepository} from "../../repositories/blogs.repository";
import { Request, Response } from 'express';

export function getBlogsHandler(req: Request, res: Response) {
    res.status(HttpStatus.Ok).send(blogsRepository.getAll());
}