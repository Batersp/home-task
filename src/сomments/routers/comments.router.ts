import {Router} from "express";
import {idValidation} from "../../core/middlewares/validation/params-id.validation-middleware";
import {inputValidationResultMiddleware} from "../../core/middlewares/validation/input-validtion-result.middleware";
import {getCommentHandler} from "./handlers/get-comment.handler";
import {updateCommentHandler} from "./handlers/update-comment.handler";
import {commentInputDtoValidation} from "../validation/comment.input-dto.validation-middlewares";
import {bearerAuthGuardMiddleware} from "../../auth/validation/bearer-auth.guard-middleware";
import {deleteCommentHandler} from "./handlers/delete-comment.handler";

export const commentsRouter = Router({});

commentsRouter
    .get('/:id', idValidation, inputValidationResultMiddleware, getCommentHandler)
    .put('/:id', bearerAuthGuardMiddleware, idValidation, commentInputDtoValidation, inputValidationResultMiddleware, updateCommentHandler)
    .delete('/:id', bearerAuthGuardMiddleware, idValidation, inputValidationResultMiddleware, deleteCommentHandler)
