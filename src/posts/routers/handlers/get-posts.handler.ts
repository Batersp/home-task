import {Request, Response} from 'express'
import {HttpStatus} from "../../../core/types/http-statuses";
import {matchedData} from "express-validator";
import {PostsQuery} from "../../types/get-posts-query";
import {postsQwRepository} from "../../repositories/postsQw.repository";
import {PaginatedResponse} from "../../../core/types/paginatedResponse";
import {PostViewModel} from "../../types/post-view-model";

export async function getPostsHandler(req: Request, res: Response<PaginatedResponse<PostViewModel>>) {
    try {
        const sanitizedQuery = matchedData<PostsQuery>(req, {
            locations: ['query'],
            includeOptionals: true,
        })
        const postsResponse = await postsQwRepository.findMany(sanitizedQuery)
        res.status(HttpStatus.Ok).send(postsResponse)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
