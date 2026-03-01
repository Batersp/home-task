import {HttpStatus} from "../../../core/types/http-statuses";
import { Request, Response } from 'express';
import {mapToBlogViewModel} from "../mappers/map-to-blog-view-model.util";
import {blogsService} from "../../aplication/blogs.service";
import {BlogsQuery} from "../../types/get-blogs-query";
import {matchedData} from "express-validator";

export async function getBlogsHandler (req: Request, res: Response) {
    try {
        const sanitizedQuery = matchedData<BlogsQuery>(req, {
            locations: ['query'],
            includeOptionals: true,
        })
        const blogsResponse = await blogsService.findMany(sanitizedQuery)
        const blogsViewModel = {...blogsResponse, items: blogsResponse.items.map(mapToBlogViewModel)}
        res.status(HttpStatus.Ok).send(blogsViewModel);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
