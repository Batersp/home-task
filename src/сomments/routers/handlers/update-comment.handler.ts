import {Request, Response} from 'express'
import {CommentInputDto} from "../../dto/comment.input-dto";
import {commentsService} from "../../aplication/comments.service";
import {HttpStatus} from "../../../core/types/http-statuses";

export async function updateCommentHandler(req: Request<{id: string}, {}, CommentInputDto>, res: Response) {
    try {
        const comment = await commentsService.findById(req.params.id)
        if (!comment) {
            res.sendStatus(HttpStatus.NotFound)
            return
        }

        if (comment.commentatorInfo.userId !== req.user!.userId) {
            res.sendStatus(HttpStatus.Forbidden)
            return
        }

        const isUpdated = await commentsService.update(req.params.id, req.body)
        if(isUpdated) {
            res.sendStatus(HttpStatus.NoContent)
            return
        }
        res.sendStatus(HttpStatus.InternalServerError)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
