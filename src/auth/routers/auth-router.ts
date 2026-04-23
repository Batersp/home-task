import {Router} from "express";
import {inputValidationResultMiddleware} from "../../core/middlewares/validation/input-validtion-result.middleware";
import {bearerAuthGuardMiddleware} from "../validation/bearer-auth.guard-middleware";
import {authInputLoginDtoValidation} from "../validation/auth.inputLogin-dto.validation-middlewares";
import {authInputRegistrationDtoValidation} from "../validation/auth.inputRegistration-dto.validation-middlewares";
import {
    authInputConfirmationCodeDtoValidation
} from "../validation/auth.inputConfirmationCode-dto.validation.middleware";
import {authInputResendEmailDtoValidation} from "../validation/auth.inputResendEmail-dto.validation.middleware";
import {refreshTokenGuardMiddleware} from "../validation/refresh-token.guard-middleware";
import {rateLimitMiddleware} from "../../core/middlewares/rate-limit.middleware";
import {AuthController} from "../controllers/auth.controller";
import {container} from "../../iocContainer";
import {
    authInputPasswordRecoveryDtoValidation
} from "../validation/auth.inputPasswordRecovery-dto.validation-middleware";
import {authInputNewPasswordDtoValidation} from "../validation/auth.inputNewPassword-dto.validation-middleware";

const authController = container.get(AuthController);

export const authRouter = Router({})

authRouter
    .post('/registration', rateLimitMiddleware, authInputRegistrationDtoValidation, inputValidationResultMiddleware, authController.registration.bind(authController))
    .post('/registration-confirmation', rateLimitMiddleware, authInputConfirmationCodeDtoValidation, inputValidationResultMiddleware, authController.confirm.bind(authController))
    .post('/registration-email-resending', rateLimitMiddleware, authInputResendEmailDtoValidation, inputValidationResultMiddleware, authController.resendEmail.bind(authController))
    .post('/login', rateLimitMiddleware, authInputLoginDtoValidation, inputValidationResultMiddleware, authController.login.bind(authController))
    .post('/refresh-token', refreshTokenGuardMiddleware, authController.updateTokens.bind(authController))
    .post('/logout', refreshTokenGuardMiddleware, authController.logout.bind(authController))
    .post('/password-recovery', rateLimitMiddleware, authInputPasswordRecoveryDtoValidation, inputValidationResultMiddleware, authController.passwordRecovery.bind(authController))
    .post('/new-password', rateLimitMiddleware, authInputNewPasswordDtoValidation, inputValidationResultMiddleware, authController.newPassword.bind(authController))
    .get('/me', bearerAuthGuardMiddleware, authController.me.bind(authController))
