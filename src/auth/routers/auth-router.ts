import {Router} from "express";
import {loginHandler} from "./handlers/login.handler";
import {authInputDtoValidation} from "../validation/auth.input-dto.validation-middlewares";
import {inputValidationResultMiddleware} from "../../core/middlewares/validation/input-validtion-result.middleware";

export const authRouter = Router({})

authRouter.post('/login', authInputDtoValidation, inputValidationResultMiddleware, loginHandler)
