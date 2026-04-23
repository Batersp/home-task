import {Router} from "express";
import {usersPaginationAndSortingValidation} from "../validation/user.paginationAndSorting.validation-middlewares";
import {superAdminGuardMiddleware} from "../../auth/validation/super-admin.guard-middleware";
import {userInputDtoValidation} from "../validation/user.input-dto.validation.middlewares";
import {inputValidationResultMiddleware} from "../../core/middlewares/validation/input-validtion-result.middleware";
import {idValidation} from "../../core/middlewares/validation/params-id.validation-middleware";
import {container} from "../../iocContainer";
import {UsersController} from "../controller/users.controller";

const usersController = container.get(UsersController);

export const usersRouter = Router({});

usersRouter
    .get("", superAdminGuardMiddleware, usersPaginationAndSortingValidation, inputValidationResultMiddleware, usersController.getUsers.bind(usersController))
    .post("", superAdminGuardMiddleware, userInputDtoValidation, inputValidationResultMiddleware, usersController.createUser.bind(usersController))
    .delete("/:id", superAdminGuardMiddleware, idValidation, inputValidationResultMiddleware, usersController.deleteUser.bind(usersController));
