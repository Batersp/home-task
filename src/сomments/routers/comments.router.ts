import {Router} from "express";
import {idValidation} from "../../core/middlewares/validation/params-id.validation-middleware";
import {inputValidationResultMiddleware} from "../../core/middlewares/validation/input-validtion-result.middleware";
import {commentInputDtoValidation} from "../validation/comment.input-dto.validation-middlewares";
import {bearerAuthGuardMiddleware} from "../../auth/validation/bearer-auth.guard-middleware";
import {container} from "../../iocContainer";
import {CommentsController} from "../controllers/comments.controller";
import {likeStatusInputDtoValidation} from "../../core/middlewares/validation/likeStatus.input-dto.validation-middlewares";
import {optionalBearerAuthMiddleware} from "../../auth/validation/optionalBearer-auth.guard-middleware";

const commentsController = container.get(CommentsController);

export const commentsRouter = Router({});

commentsRouter
    .get('/:id', optionalBearerAuthMiddleware, idValidation, inputValidationResultMiddleware, commentsController.getComment.bind(commentsController))
    .put('/:id', bearerAuthGuardMiddleware, idValidation, commentInputDtoValidation, inputValidationResultMiddleware, commentsController.updateComment.bind(commentsController))
    .put('/:id/like-status', bearerAuthGuardMiddleware, idValidation, likeStatusInputDtoValidation, inputValidationResultMiddleware, commentsController.updateLikeStatus.bind(commentsController))
    .delete('/:id', bearerAuthGuardMiddleware, idValidation, inputValidationResultMiddleware, commentsController.deleteComment.bind(commentsController))
