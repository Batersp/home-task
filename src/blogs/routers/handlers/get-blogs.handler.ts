import {HttpStatus} from "../../../core/types/http-statuses";
import { Request, Response } from 'express';
import {BlogsQuery} from "../../types/get-blogs-query";
import {matchedData} from "express-validator";
import {blogsQwRepository} from "../../repositories/blogsQw.repository";

export async function getBlogsHandler (req: Request, res: Response) {
    try {
        const sanitizedQuery = matchedData<BlogsQuery>(req, {
            locations: ['query'],
            includeOptionals: true,
        })
        const blogsResponse = await blogsQwRepository.findMany(sanitizedQuery);
        res.status(HttpStatus.Ok).send(blogsResponse);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
