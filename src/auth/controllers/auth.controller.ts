import {inject, injectable} from "inversify";
import {Request, Response} from "express";
import {RegistrationInputDTO} from "../dto/registration.input-dto";
import {AuthService} from "../aplication/auth.service";
import {ResultStatus, resultStatusToHttpStatus} from "../../core/types/result";
import {HttpStatus} from "../../core/types/http-statuses";
import {ConfirmationInputDTO} from "../dto/confirmation.input-dto";
import {ResendEmailInputDTO} from "../dto/resendEmail.input-dto";
import {LoginInputDto} from "../dto/login.input-dto";
import {AuthResponse, MeResponse} from "../types/auth";
import {UsersQwRepository} from "../../users/repositories/usersQw.repository";
import {ObjectId} from "mongodb";
import {PasswordRecoveryInputDto} from "../dto/passwordRecovery.input-dto";
import {NewPasswordInputDto} from "../dto/newPassword.input-dto";

@injectable()
export class AuthController {

    constructor(@inject(AuthService) private authService: AuthService, @inject(UsersQwRepository) private usersQwRepository: UsersQwRepository) {}

    async registration(req: Request<{}, {}, RegistrationInputDTO>, res: Response) {
        try {
            const result = await this.authService.registration(req.body);
            if (result.status !== ResultStatus.NoContent) {
                res.status(resultStatusToHttpStatus[result.status]).send({errorsMessages: result.extensions})
                return
            }
            res.sendStatus(resultStatusToHttpStatus[result.status])
        } catch(e) {
            console.error(e)
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }

    async confirm(req: Request<{}, {}, ConfirmationInputDTO>, res: Response) {
        try {
            const result = await this.authService.confirmCode(req.body.code)
            if (result.status === ResultStatus.NoContent) {
                res.sendStatus(resultStatusToHttpStatus[result.status]);
                return
            }
            res.status(resultStatusToHttpStatus[result.status]).send({
                errorsMessages: result.extensions
            })
        } catch(e) {
            console.error(e)
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }

    async resendEmail(req: Request<{}, {}, ResendEmailInputDTO>, res: Response) {
        try {
            const isSuccessful = await this.authService.resendConfirmationEmail(req.body.email)
            if(isSuccessful) {
                res.sendStatus(HttpStatus.NoContent)
                return
            }
            res.status(HttpStatus.BadRequest).send({
                errorsMessages: [{
                    message: 'Email is already confirmed',
                    field: 'email'
                }]
            })

        } catch (e) {
            console.error(e)
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }

    async login(req: Request<{}, {}, LoginInputDto>, res: Response<AuthResponse>) {
        try {
            const result = await this.authService.login(req.body, req.ip!, req.headers["user-agent"])
            if (result.status !== ResultStatus.Success) {
                res.sendStatus(resultStatusToHttpStatus[result.status])
                return;
            }

            res.cookie('refreshToken', result.data!.refreshToken, {
                httpOnly: true,
                secure: true,
            })
            res.status(resultStatusToHttpStatus[result.status]).send({accessToken: result.data!.accessToken!})
        } catch {
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }

    async updateTokens(req: Request, res: Response<AuthResponse>) {
        try {
            const { userId, userLogin } = req.user!
            const refreshToken= req.cookies.refreshToken
            const result = await this.authService.updateTokens(userId, userLogin, refreshToken, req.ip!)

            if (result.status !== ResultStatus.Success) {
                res.sendStatus(resultStatusToHttpStatus[result.status])
                return;
            }

            res.cookie('refreshToken', result.data!.refreshToken, {
                httpOnly: true,
                secure: true,
            })

            res.status(resultStatusToHttpStatus[result.status]).send({accessToken: result.data!.accessToken!})
        } catch {
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }

    async logout(req: Request, res: Response) {
        try {
            const result = await this.authService.logout(req.user!.userId, req.user!.deviceId!)
            res.clearCookie('refreshToken')
            res.sendStatus(resultStatusToHttpStatus[result.status])
        } catch {
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }

    async me(req: Request, res: Response<MeResponse>) {
        try {
            const user = await this.usersQwRepository.findById(new ObjectId(req.user!.userId))
            if (user) {
                const {id: userId, login, email} = user
                res.status(HttpStatus.Ok).send({
                    userId,
                    login,
                    email
                })
            }
        } catch {
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }

    async passwordRecovery(req: Request<{}, {}, PasswordRecoveryInputDto>, res: Response) {
       try {
           await this.authService.passwordRecovery(req.body.email)
           res.sendStatus(HttpStatus.NoContent)
       } catch {
           res.sendStatus(HttpStatus.InternalServerError)
       }
    }

    async newPassword(req: Request<{}, {}, NewPasswordInputDto>, res: Response) {
        try {
            const result = await this.authService.confirmPasswordRecovery(
                req.body.recoveryCode,
                req.body.newPassword
            )
            if (result.status !== ResultStatus.NoContent) {
                res.status(resultStatusToHttpStatus[result.status]).send({errorsMessages: result.extensions})
                return
            }
            res.sendStatus(resultStatusToHttpStatus[result.status])
        } catch {
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }
}
