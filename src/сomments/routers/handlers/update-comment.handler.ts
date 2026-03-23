import {Request, Response} from 'express'
import {CommentInputDto} from "../../dto/comment.input-dto";
import {commentsService} from "../../aplication/comments.service";
import {HttpStatus} from "../../../core/types/http-statuses";
import {resultStatusToHttpStatus} from "../../../core/types/result";

export async function updateCommentHandler(req: Request<{id: string}, {}, CommentInputDto>, res: Response) {
    try {
        const result = await commentsService.update(req.params.id, req.body, req.user!.userId)
        res.sendStatus(resultStatusToHttpStatus[result.status]);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
