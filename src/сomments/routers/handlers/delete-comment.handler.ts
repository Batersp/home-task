import {Request, Response} from "express";
import {commentsService} from "../../aplication/comments.service";
import {HttpStatus} from "../../../core/types/http-statuses";

export async function deleteCommentHandler(req: Request<{id: string}>, res: Response) {
    try {
        const comment = await commentsService.findById(req.params.id);

        if(!comment) {
            res.sendStatus(HttpStatus.NotFound);
            return;
        }

        if (comment.commentatorInfo.userId !== req.user!.userId) {
            res.sendStatus(HttpStatus.Forbidden)
            return
        }

        const isDeleted = await commentsService.delete(req.params.id);
        if(isDeleted) {
            res.sendStatus(HttpStatus.NoContent)
            return
        }

        res.sendStatus(HttpStatus.InternalServerError)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
