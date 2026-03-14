import {Router} from "express";
import {usersPaginationAndSortingValidation} from "../validation/user.paginationAndSorting.validation-middlewares";
import {getUsersHandler} from "./handlers/get-users.handler";
import {superAdminGuardMiddleware} from "../../auth/validation/super-admin.guard-middleware";
import {userInputDtoValidation} from "../validation/user.input-dto.validation.middlewares";
import {createUsersHandler} from "./handlers/create-user.handler";
import {inputValidationResultMiddleware} from "../../core/middlewares/validation/input-validtion-result.middleware";
import {idValidation} from "../../core/middlewares/validation/params-id.validation-middleware";
import {deleteUsersHandler} from "./handlers/delete-user.handler";

export const usersRouter = Router({});

usersRouter
    .get("", superAdminGuardMiddleware, usersPaginationAndSortingValidation, inputValidationResultMiddleware, getUsersHandler)
    .post("", superAdminGuardMiddleware, userInputDtoValidation, inputValidationResultMiddleware, createUsersHandler)
    .delete("/:id", superAdminGuardMiddleware, idValidation, inputValidationResultMiddleware, deleteUsersHandler);
