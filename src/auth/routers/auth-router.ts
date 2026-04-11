import {Router} from "express";
import {loginHandler} from "./handlers/login.handler";
import {inputValidationResultMiddleware} from "../../core/middlewares/validation/input-validtion-result.middleware";
import {bearerAuthGuardMiddleware} from "../validation/bearer-auth.guard-middleware";
import {meHandler} from "./handlers/me.handler";
import {authInputLoginDtoValidation} from "../validation/auth.inputLogin-dto.validation-middlewares";
import {authInputRegistrationDtoValidation} from "../validation/auth.inputRegistration-dto.validation-middlewares";
import {registrationHandler} from "./handlers/registration.handler";
import {
    authInputConfirmationCodeDtoValidation
} from "../validation/auth.inputConfirmationCode-dto.validation.middleware";
import {confirmationHandler} from "./handlers/confirmation.handler";
import {authInputResendEmailDtoValidation} from "../validation/auth.inputResendEmail-dto.validation.middleware";
import {resendEmailHandler} from "./handlers/resendEmail.handler";
import {refreshTokenGuardMiddleware} from "../validation/refresh-token.guard-middleware";
import {updateTokensHandler} from "./handlers/updateTokens.handler";
import {logoutHandler} from "./handlers/logout.handler";

export const authRouter = Router({})

authRouter
    .post('/registration', authInputRegistrationDtoValidation, inputValidationResultMiddleware, registrationHandler)
    .post('/registration-confirmation', authInputConfirmationCodeDtoValidation, inputValidationResultMiddleware, confirmationHandler)
    .post('/registration-email-resending', authInputResendEmailDtoValidation, inputValidationResultMiddleware, resendEmailHandler)
    .post('/login', authInputLoginDtoValidation, inputValidationResultMiddleware, loginHandler)
    .post('/refresh-token', refreshTokenGuardMiddleware, updateTokensHandler)
    .post('/logout', refreshTokenGuardMiddleware, logoutHandler)
    .get('/me', bearerAuthGuardMiddleware, meHandler)
