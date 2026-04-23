import {Router} from "express";
import {idValidation} from "../../core/middlewares/validation/params-id.validation-middleware";
import {inputValidationResultMiddleware} from "../../core/middlewares/validation/input-validtion-result.middleware";
import {blogInputDtoValidation} from "../validation/blog.input-dto.validation-middlewares";
import {superAdminGuardMiddleware} from "../../auth/validation/super-admin.guard-middleware";
import {blogsPaginationAndSortingValidation} from "../validation/blog.paginationAndSorting.validation-middlewares";
import {blogCreatePostDtoValidationMiddlewares} from "../validation/blog.createPost-dto.validation-middlewares";
import {
    postPaginationAndSortingValidation
} from "../../posts/validation/post.paginationAndSorting.validation-middlewares";
import {container} from "../../iocContainer";
import {BlogsController} from "../controllers/blogs.controller";

const blogsController = container.get(BlogsController);

export const blogsRouter = Router({})

blogsRouter
    .get('', blogsPaginationAndSortingValidation, inputValidationResultMiddleware, blogsController.getBlogs.bind(blogsController))
    .get('/:id', idValidation, inputValidationResultMiddleware, blogsController.getBlog.bind(blogsController))
    .get('/:id/posts', idValidation, postPaginationAndSortingValidation, inputValidationResultMiddleware, blogsController.getBlogPosts.bind(blogsController))
    .post('', superAdminGuardMiddleware, blogInputDtoValidation, inputValidationResultMiddleware, blogsController.createBlog.bind(blogsController))
    .post('/:id/posts', superAdminGuardMiddleware, blogCreatePostDtoValidationMiddlewares, inputValidationResultMiddleware, blogsController.createPostForBlog.bind(blogsController))
    .put('/:id', superAdminGuardMiddleware, idValidation, blogInputDtoValidation, inputValidationResultMiddleware, blogsController.updateBlog.bind(blogsController))
    .delete('/:id', superAdminGuardMiddleware, idValidation, inputValidationResultMiddleware, blogsController.deleteBlog.bind(blogsController))
