import {Request, Response} from 'express'
import {HttpStatus} from "../../../core/types/http-statuses";
import {commentsService} from "../../../сomments/aplication/comments.service";
import {CommentViewModel} from "../../../сomments/types/comment-view-model";

export async function createCommentHandler(req: Request<{id: string}>, res: Response<CommentViewModel>) {
    try {
        const createdComment = await commentsService.create(
            req.params.id,
            {userId: req.user!.userId, userLogin: req.user!.userLogin},
            req.body
        )
        if(createdComment) {
            res.status(HttpStatus.Created).send(createdComment)
            return
        }
        res.sendStatus(HttpStatus.NotFound)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
