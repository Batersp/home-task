import {Router} from "express";
import {getPostsHandler} from "./handlers/get-posts.handler";
import {idValidation} from "../../core/middlewares/validation/params-id.validation-middleware";
import {inputValidationResultMiddleware} from "../../core/middlewares/validation/input-validtion-result.middleware";
import {getPostHandler} from "./handlers/get-post.handler";
import {postInputDtoValidation} from "../validation/post.input-dto.validation-middlewares";
import {createPostHandler} from "./handlers/create-post.handler";
import {updatePostHandler} from "./handlers/update-post.handler";
import {deletePostHandler} from "./handlers/delete-post.handler";
import {superAdminGuardMiddleware} from "../../auth/validation/super-admin.guard-middleware";
import {postPaginationAndSortingValidation} from "../validation/post.paginationAndSorting.validation-middlewares";
import {getCommentsHandler} from "./handlers/get-comments.handler";
import {bearerAuthGuardMiddleware} from "../../auth/validation/bearer-auth.guard-middleware";
import {commentInputDtoValidation} from "../../сomments/validation/comment.input-dto.validation-middlewares";
import {createCommentHandler} from "./handlers/create-comment.handler";

export const postsRouter = Router({})

postsRouter
    .get('', postPaginationAndSortingValidation, inputValidationResultMiddleware, getPostsHandler)
    .get('/:id', idValidation, inputValidationResultMiddleware, getPostHandler)
    .get('/:id/comments', idValidation, postPaginationAndSortingValidation, inputValidationResultMiddleware, getCommentsHandler)
    .post('', superAdminGuardMiddleware, postInputDtoValidation, inputValidationResultMiddleware, createPostHandler)
    .post('/:id/comments', bearerAuthGuardMiddleware, idValidation, commentInputDtoValidation, inputValidationResultMiddleware, createCommentHandler)
    .put('/:id', superAdminGuardMiddleware, idValidation, postInputDtoValidation, inputValidationResultMiddleware, updatePostHandler)
    .delete('/:id', superAdminGuardMiddleware, idValidation, inputValidationResultMiddleware, deletePostHandler)
