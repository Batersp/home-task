import {Request, Response} from 'express'
import {postsService} from "../../aplication/posts.service";
import {HttpStatus} from "../../../core/types/http-statuses";
import {commentsService} from "../../../сomments/aplication/comments.service";
import {CommentViewModel} from "../../../сomments/types/comment-view-model";
import {commentsQwRepository} from "../../../сomments/repositories/commentsQw.repository";

export async function createCommentHandler(req: Request<{id: string}>, res: Response<CommentViewModel>) {
    try {
        const id = req.params.id;
        const post = await postsService.findById(id);
        if (!post) {
            res.sendStatus(HttpStatus.NotFound)
            return;
        }
        const createdCommentId = await commentsService.create(
            id,
            {userId: req.user!.userId, userLogin: req.user!.userLogin},
            req.body
        )
        if(createdCommentId) {
            const comment = await commentsQwRepository.findById(createdCommentId.toString())
            comment && res.status(HttpStatus.Created).send(comment)
            return
        }
        res.sendStatus(HttpStatus.InternalServerError)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
