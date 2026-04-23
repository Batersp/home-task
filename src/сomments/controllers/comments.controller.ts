import {inject, injectable} from "inversify";
import {CommentsQwRepository} from "../repositories/commentsQw.repository";
import {HttpStatus} from "../../core/types/http-statuses";
import {Request, Response} from "express";
import {CommentViewModel} from "../types/comment-view-model";
import {CommentInputDto} from "../dto/comment.input-dto";
import {CommentsService} from "../aplication/comments.service";
import {resultStatusToHttpStatus} from "../../core/types/result";

@injectable()
export class CommentsController {

    constructor(
        @inject(CommentsQwRepository) private commentsQwRepository: CommentsQwRepository,
        @inject(CommentsService) private commentsService: CommentsService
    ) {}

    async getComment(req: Request<{id: string}>, res: Response<CommentViewModel>) {
        try {
            const comment = await this.commentsQwRepository.findById(req.params.id);
            if (comment) {
                res.status(HttpStatus.Ok).send(comment);
                return;
            }
            res.sendStatus(HttpStatus.NotFound);
        } catch {
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }

    async updateComment(req: Request<{id: string}, {}, CommentInputDto>, res: Response) {
        try {
            const result = await this.commentsService.update(req.params.id, req.body, req.user!.userId)
            res.sendStatus(resultStatusToHttpStatus[result.status]);
        } catch {
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }

    async deleteComment(req: Request<{id: string}>, res: Response) {
        try {
            const result = await this.commentsService.delete(req.params.id, req.user!.userId);
            res.sendStatus(resultStatusToHttpStatus[result.status]);

        } catch {
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }
}
