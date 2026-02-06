import {Router} from "express";
import {getBlogsHandler} from "./handlers/get-blogs.handler";
import {idValidation} from "../../core/middlewares/validation/params-id.validation-middleware";
import {getBlogHandler} from "./handlers/get-blog.handler";
import {inputValidationResultMiddleware} from "../../core/middlewares/validation/input-validtion-result.middleware";
import {blogInputDtoValidation} from "../validation/blog.input-dto.validation-middlewares";
import {createBlogHandler} from "./handlers/create-blog.handler";
import {updateBlogHandler} from "./handlers/update-blog.handler";
import {deleteBlogHandler} from "./handlers/delete-blog.handler";
import {superAdminGuardMiddleware} from "../../auth/middlewares/super-admin.guard-middleware";

export const blogsRouter = Router({})

blogsRouter
    .get('', getBlogsHandler)
    .get('/:id', idValidation, inputValidationResultMiddleware, getBlogHandler)
    .post('', superAdminGuardMiddleware, blogInputDtoValidation, inputValidationResultMiddleware, createBlogHandler)
    .put('/:id', superAdminGuardMiddleware, idValidation, blogInputDtoValidation, inputValidationResultMiddleware, updateBlogHandler)
    .delete('/:id', superAdminGuardMiddleware, idValidation, inputValidationResultMiddleware, deleteBlogHandler)
