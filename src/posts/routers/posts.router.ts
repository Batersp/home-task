import {Router} from "express";
import {idValidation} from "../../core/middlewares/validation/params-id.validation-middleware";
import {inputValidationResultMiddleware} from "../../core/middlewares/validation/input-validtion-result.middleware";
import {postInputDtoValidation} from "../validation/post.input-dto.validation-middlewares";
import {superAdminGuardMiddleware} from "../../auth/validation/super-admin.guard-middleware";
import {postPaginationAndSortingValidation} from "../validation/post.paginationAndSorting.validation-middlewares";
import {bearerAuthGuardMiddleware} from "../../auth/validation/bearer-auth.guard-middleware";
import {commentInputDtoValidation} from "../../сomments/validation/comment.input-dto.validation-middlewares";
import {PostsController} from "../controllers/posts.controller";
import {container} from "../../iocContainer";
import {optionalBearerAuthMiddleware} from "../../auth/validation/optionalBearer-auth.guard-middleware";
import {
    likeStatusInputDtoValidation
} from "../../core/middlewares/validation/likeStatus.input-dto.validation-middlewares";

const postsController = container.get(PostsController);

export const postsRouter = Router({})

postsRouter
    .get('', optionalBearerAuthMiddleware, postPaginationAndSortingValidation, inputValidationResultMiddleware, postsController.getPosts.bind(postsController))
    .get('/:id', optionalBearerAuthMiddleware, idValidation, inputValidationResultMiddleware, postsController.getPost.bind(postsController))
    .get('/:id/comments',optionalBearerAuthMiddleware, idValidation, postPaginationAndSortingValidation, inputValidationResultMiddleware, postsController.getComments.bind(postsController))
    .post('', superAdminGuardMiddleware, postInputDtoValidation, inputValidationResultMiddleware, postsController.createPost.bind(postsController))
    .post('/:id/comments', bearerAuthGuardMiddleware, idValidation, commentInputDtoValidation, inputValidationResultMiddleware, postsController.createComment.bind(postsController))
    .put('/:id', superAdminGuardMiddleware, idValidation, postInputDtoValidation, inputValidationResultMiddleware, postsController.updatePost.bind(postsController))
    .put('/:id/like-status', bearerAuthGuardMiddleware, idValidation, likeStatusInputDtoValidation, inputValidationResultMiddleware, postsController.updateLikeStatus.bind(postsController))
    .delete('/:id', superAdminGuardMiddleware, idValidation, inputValidationResultMiddleware, postsController.deletePost.bind(postsController))
