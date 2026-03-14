import {Request, Response} from 'express'
import {HttpStatus} from "../../../core/types/http-statuses";
import {matchedData} from "express-validator";
import {PostsQuery} from "../../types/get-posts-query";
import {PostsResponse} from "../../types/post";
import {postsQwRepository} from "../../repositories/postsQw.repository";

export async function getPostsHandler(req: Request, res: Response<PostsResponse>) {
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
