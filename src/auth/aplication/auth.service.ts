import {LoginInputDto} from "../dto/login.input-dto";
import {User} from "../../users/types/user";
import {RegistrationInputDTO} from "../dto/registration.input-dto";
import {bcryptService} from "../../core/services/bcrypt.service";
import {randomUUID} from "node:crypto";
import {add} from "date-fns/add";
import {emailManagers} from "../../core/managers/email.manager";
import {Result, ResultStatus} from "../../core/types/result";
import {jwtService} from "../../core/services/jwt.service";
import {Utils} from "../../core/utils/utils";
import {SecurityService} from "../../security/application/security.service";
import {inject, injectable} from "inversify";
import {UsersRepository} from "../../users/repositories/users.repository";

@injectable()
export class AuthService {

    constructor(@inject(UsersRepository) private userRepository: UsersRepository, @inject(SecurityService) private securityService: SecurityService) {}

    async login(dto: LoginInputDto, ip: string, deviceName: string = 'commonName'): Promise<Result<null | {
        accessToken: string,
        refreshToken: string
    }>> {
        const errorResult: Result = {
            status: ResultStatus.Unauthorized,
            data: null,
            extensions: []
        }
        const {loginOrEmail, password} = dto
        const user = await this.userRepository.findByLoginOrEmail(loginOrEmail);
        if (!user) return errorResult;
        const isPasswordValid = bcryptService.compareSync(password, user.passHash)
        if (!isPasswordValid) return errorResult

        const deviceId = crypto.randomUUID()
        const accessToken = jwtService.createAccessToken({
            userId: user._id.toString(),
            userLogin: user.login,
            expiresIn: '10s'
        })
        const refreshToken = jwtService.createRefreshToken({
            userId: user._id.toString(),
            userLogin: user.login,
            deviceId
        })

        const decodedRefreshToken = jwtService.getRefreshTokenInfo(refreshToken)

        await this.securityService.createSession({
            userId: user._id.toString(),
            deviceId,
            iat: Utils.convertJwtDateToISO(decodedRefreshToken.iat),
            deviceName,
            ip,
            exp: Utils.convertJwtDateToISO(decodedRefreshToken.exp)
        })

        return {
            status: ResultStatus.Success,
            data: {accessToken, refreshToken},
            extensions: []
        }
    }

    async registration(dto: RegistrationInputDTO): Promise<Result> {
        const {login, password, email} = dto
        const existingUserByEmail = await this.userRepository.findByEmail(email)
        const existingUserByLogin = await this.userRepository.findByLogin(login)

        if (existingUserByEmail) return {
            status: ResultStatus.BadRequest,
            extensions: [{message: 'User with this email already exists', field: 'email'}],
            data: null
        }
        if (existingUserByLogin) return {
            status: ResultStatus.BadRequest,
            extensions: [{message: 'User with this login already exists', field: 'login'}],
            data: null
        }

        const passHash = bcryptService.createHash(password)

        const newUser: User = {
            login,
            email,
            passHash,
            createdAt: new Date().toISOString(),
            emailConfirmation: {
                confirmationCode: randomUUID(),
                expirationDate: add(new Date(), {
                    hours: 1,
                    minutes: 30,
                }),
                isConfirmed: false
            }
        };

        await this.userRepository.create(newUser);

        await emailManagers.sendConfirmationCode(newUser.email, newUser.emailConfirmation!.confirmationCode)
        return {
            status: ResultStatus.NoContent,
            data: null,
            extensions: []
        }
    }

    async confirmCode(code: string): Promise<Result> {
        const user = await this.userRepository.findByConfirmationCode(code);
        const resultError: Result = {
            status: ResultStatus.BadRequest,
            extensions: [{
                message: 'Invalid Code',
                field: 'code'
            }],
            data: null
        }
        if (!user) return resultError
        if (user.emailConfirmation?.confirmationCode !== code) return resultError
        if (user.emailConfirmation.expirationDate < new Date()) return resultError
        if (user.emailConfirmation.isConfirmed) return resultError

        const isUpdated = await this.userRepository.updateConfirmation(user._id)
        if (!isUpdated) return resultError
        return {
            status: ResultStatus.NoContent,
            extensions: [],
            data: null
        }
    }

    async resendConfirmationEmail(email: string): Promise<boolean> {
        const user = await this.userRepository.findByEmail(email)
        if (!user) return false
        if (user.emailConfirmation?.isConfirmed) return false

        const newCode = randomUUID()
        const newExpiration = add(new Date(), {hours: 1, minutes: 30}).toISOString()
        await this.userRepository.updateConfirmationCode(user._id, newCode, newExpiration)
        await emailManagers.sendConfirmationCode(email, newCode)
        return true
    }

    async updateTokens(userId: string, userLogin: string, oldRefreshToken: string, ip: string): Promise<Result<null | {
        accessToken: string,
        refreshToken: string
    }>> {
        const {deviceId, iat} = jwtService.getRefreshTokenInfo(oldRefreshToken)
        const oldIat = Utils.convertJwtDateToISO(iat)

        const accessToken = jwtService.createAccessToken({
            userId, userLogin, expiresIn: '10s'
        })
        const refreshToken = jwtService.createRefreshToken({
            userId, userLogin, deviceId
        })

        const decodedNewRefreshToken = jwtService.getRefreshTokenInfo(refreshToken)
        await this.securityService.updateSession(
            deviceId, oldIat,
            {
                iat: Utils.convertJwtDateToISO(decodedNewRefreshToken.iat),
                exp: Utils.convertJwtDateToISO(decodedNewRefreshToken.exp),
                ip
            })

        return {
            status: ResultStatus.Success,
            extensions: [],
            data: {accessToken, refreshToken}
        }
    }

    async logout(userId: string, deviceId: string): Promise<Result> {
        await this.securityService.deleteSession(userId, deviceId)
        return {
            status: ResultStatus.NoContent,
            extensions: [],
            data: null
        }
    }

    async passwordRecovery(email: string) {
        const user = await this.userRepository.findByEmail(email)
        if (!user) return

        const code = randomUUID()
        const expirationDate = add(new Date(), {hours: 1})

        await this.userRepository.savePasswordRecoveryCode(user._id, code, expirationDate)
        await emailManagers.sendPasswordRecovery(email, code)
    }

    async confirmPasswordRecovery(code: string, newPassword: string): Promise<Result> {
        const errorResult: Result = {
            status: ResultStatus.BadRequest,
            extensions: [{message: 'Invalid or expired recovery code', field: 'recoveryCode'}],
            data: null
        }

        const user = await this.userRepository.findByRecoveryCode(code)
        if (!user) return errorResult
        if (!user.passwordRecovery) return errorResult
        if (user.passwordRecovery.expirationDate < new Date()) return errorResult

        const passHash = bcryptService.createHash(newPassword)
        await this.userRepository.updatePassword(user._id, passHash)

        return {status: ResultStatus.NoContent, extensions: [], data: null}
    }
}
