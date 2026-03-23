import {Request, Response} from "express";
import {commentsService} from "../../aplication/comments.service";
import {HttpStatus} from "../../../core/types/http-statuses";
import {resultStatusToHttpStatus} from "../../../core/types/result";

export async function deleteCommentHandler(req: Request<{id: string}>, res: Response) {
    try {
        const result = await commentsService.delete(req.params.id, req.user!.userId);
        res.sendStatus(resultStatusToHttpStatus[result.status]);

    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
