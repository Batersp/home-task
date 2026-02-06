import {Router} from "express";
import {getPostsHandler} from "./handlers/get-posts.handler";
import {idValidation} from "../../core/middlewares/validation/params-id.validation-middleware";
import {inputValidationResultMiddleware} from "../../core/middlewares/validation/input-validtion-result.middleware";
import {getPostHandler} from "./handlers/get-post.handler";
import {postInputDtoValidation} from "../validation/post.input-dto.validation-middlewares";
import {createPostHandler} from "./handlers/create-post.handler";
import {updatePostHandler} from "./handlers/update-post.handler";
import {deletePostHandler} from "./handlers/delete-post.handler";

export const postsRouter = Router({})

postsRouter
    .get('', getPostsHandler)
    .get('/:id',idValidation, inputValidationResultMiddleware, getPostHandler)
    .post('', postInputDtoValidation, inputValidationResultMiddleware, createPostHandler)
    .put('/:id', idValidation, postInputDtoValidation, inputValidationResultMiddleware, updatePostHandler)
    .delete('/:id', idValidation, inputValidationResultMiddleware, deletePostHandler)