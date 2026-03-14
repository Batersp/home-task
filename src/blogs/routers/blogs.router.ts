import {Router} from "express";
import {getBlogsHandler} from "./handlers/get-blogs.handler";
import {idValidation} from "../../core/middlewares/validation/params-id.validation-middleware";
import {getBlogHandler} from "./handlers/get-blog.handler";
import {inputValidationResultMiddleware} from "../../core/middlewares/validation/input-validtion-result.middleware";
import {blogInputDtoValidation} from "../validation/blog.input-dto.validation-middlewares";
import {createBlogHandler} from "./handlers/create-blog.handler";
import {updateBlogHandler} from "./handlers/update-blog.handler";
import {deleteBlogHandler} from "./handlers/delete-blog.handler";
import {superAdminGuardMiddleware} from "../../auth/validation/super-admin.guard-middleware";
import {blogsPaginationAndSortingValidation} from "../validation/blog.paginationAndSorting.validation-middlewares";
import {createPostForBlogHandler} from "./handlers/create-post-for-blog.handler";
import {blogCreatePostDtoValidationMiddlewares} from "../validation/blog.createPost-dto.validation-middlewares";
import {getBlogPostsHandler} from "./handlers/get-blogPosts.handler";
import {
    postPaginationAndSortingValidation
} from "../../posts/validation/post.paginationAndSorting.validation-middlewares";

export const blogsRouter = Router({})

blogsRouter
    .get('', blogsPaginationAndSortingValidation, inputValidationResultMiddleware, getBlogsHandler)
    .get('/:id', idValidation, inputValidationResultMiddleware, getBlogHandler)
    .get('/:id/posts', idValidation, postPaginationAndSortingValidation, inputValidationResultMiddleware, getBlogPostsHandler)
    .post('', superAdminGuardMiddleware, blogInputDtoValidation, inputValidationResultMiddleware, createBlogHandler)
    .post('/:id/posts', superAdminGuardMiddleware, blogCreatePostDtoValidationMiddlewares, inputValidationResultMiddleware, createPostForBlogHandler)
    .put('/:id', superAdminGuardMiddleware, idValidation, blogInputDtoValidation, inputValidationResultMiddleware, updateBlogHandler)
    .delete('/:id', superAdminGuardMiddleware, idValidation, inputValidationResultMiddleware, deleteBlogHandler)
