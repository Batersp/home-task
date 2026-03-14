import {Request, Response} from "express";
import {matchedData} from "express-validator";
import {CommentsQuery} from "../../../blogs/types/get-comments-query";
import {PaginatedResponse} from "../../../core/types/paginatedResponse";
import {CommentViewModel} from "../../../сomments/types/comment-view-model";
import {commentsQwRepository} from "../../../сomments/repositories/commentsQw.repository";
import {HttpStatus} from "../../../core/types/http-statuses";
import {postsRepository} from "../../repositories/posts.repository";

export async function getCommentsHandler(req: Request<{id: string}>, res: Response<PaginatedResponse<CommentViewModel>>) {
    try {
        const post = await postsRepository.findById(req.params.id);
        if(!post) {
            res.sendStatus(HttpStatus.NotFound);
            return
        }
        const sanitizedQuery = matchedData<CommentsQuery>(req, {
            locations: ['query'],
            includeOptionals: true,
        })
        const commentsResponse = await commentsQwRepository.findMany(sanitizedQuery, req.params.id);
        res.status(HttpStatus.Ok).send(commentsResponse);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
