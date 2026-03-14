import { Request, Response } from 'express';
import {HttpStatus} from "../../../core/types/http-statuses";
import {matchedData} from "express-validator";
import {PostsQuery} from "../../../posts/types/get-posts-query";
import {blogsQwRepository} from "../../repositories/blogsQw.repository";
import {postsQwRepository} from "../../../posts/repositories/postsQw.repository";

export async function getBlogPostsHandler(req: Request<{id: string}, {}, {}>, res: Response): Promise<void> {
    try {
        const currentBlog = await blogsQwRepository.findById(req.params.id);
        if(!currentBlog) {
            res.sendStatus(HttpStatus.NotFound)
            return
        }
        const sanitizedQuery = matchedData<PostsQuery>(req, {
            locations: ['query'],
            includeOptionals: true,
        })
        const postsResponse = await postsQwRepository.findMany(sanitizedQuery, req.params.id);
        res.status(HttpStatus.Ok).send(postsResponse)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
