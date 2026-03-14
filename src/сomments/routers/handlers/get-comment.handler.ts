import {Request, Response} from "express";
import {CommentViewModel} from "../../types/comment-view-model";
import {commentsQwRepository} from "../../repositories/commentsQw.repository";
import {HttpStatus} from "../../../core/types/http-statuses";

export async function getCommentHandler(req: Request<{id: string}>, res: Response<CommentViewModel>) {
    try {
        const comment = await commentsQwRepository.findById(req.params.id);
        if (comment) {
            res.status(HttpStatus.Ok).send(comment);
            return;
        }
        res.sendStatus(HttpStatus.NotFound);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
