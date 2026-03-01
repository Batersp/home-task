import { Request, Response } from 'express';
import {HttpStatus} from "../../../core/types/http-statuses";
import {matchedData} from "express-validator";
import {PostsQuery} from "../../../posts/types/get-posts-query";
import {postsService} from "../../../posts/aplication/posts.service";
import {mapToPostViewModel} from "../../../posts/routers/mappers/map-to-post-view-model.util";
import {blogsService} from "../../aplication/blogs.service";

export async function getBlogPostsHandler(req: Request<{id: string}, {}, {}>, res: Response): Promise<void> {
    try {
        const currentBlog = await blogsService.findById(req.params.id);
        if(!currentBlog) {
            res.sendStatus(HttpStatus.NotFound)
            return
        }
        const sanitizedQuery = matchedData<PostsQuery>(req, {
            locations: ['query'],
            includeOptionals: true,
        })
        const postsResponse = await postsService.findMany(sanitizedQuery, req.params.id);
        const postsViewModel = {...postsResponse, items: postsResponse.items.map(mapToPostViewModel)}
        res.status(HttpStatus.Ok).send(postsViewModel)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
