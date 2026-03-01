import {Request, Response} from 'express'
import {HttpStatus} from "../../../core/types/http-statuses";
import {mapToPostViewModel} from "../mappers/map-to-post-view-model.util";
import {postsService} from "../../aplication/posts.service";
import {matchedData} from "express-validator";
import {PostsQuery} from "../../types/get-posts-query";

export async function getPostsHandler(req: Request, res: Response) {
    try {
        const sanitizedQuery = matchedData<PostsQuery>(req, {
            locations: ['query'],
            includeOptionals: true,
        })
        const postsResponse = await postsService.findMany(sanitizedQuery)
        const postsViewModel = {...postsResponse, items: postsResponse.items.map(mapToPostViewModel)}
        res.status(HttpStatus.Ok).send(postsViewModel)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
