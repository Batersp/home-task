import {LoginInputDto} from "../dto/login.input-dto";
import {User} from "../../users/types/user";
import {RegistrationInputDTO} from "../dto/registration.input-dto";
import {usersRepository} from "../../users/repositories/users.repository";
import {bcryptService} from "../../core/services/bcrypt.service";
import {randomUUID} from "node:crypto";
import {add} from "date-fns/add";
import {emailManagers} from "../../core/managers/email.manager";
import {Result, ResultStatus} from "../../core/types/result";
import {jwtService} from "../../core/services/jwt.service";

export const authService = {
    async login(dto: LoginInputDto): Promise<Result<null | {accessToken: string, refreshToken: string}>> {
        const errorResult: Result = {
            status: ResultStatus.Unauthorized,
            data: null,
            extensions: []
        }
        const {loginOrEmail, password} = dto
        const user = await usersRepository.findByLoginOrEmail(loginOrEmail);
        if (!user) return errorResult;
        const isPasswordValid = bcryptService.compareSync(password, user.passHash)
        if (!isPasswordValid) return errorResult


        const accessToken = jwtService.createAccessToken(user._id.toString(), user.login, '10s')
        const refreshToken = jwtService.createRefreshToken(user._id.toString(), user.login)
        return isPasswordValid ? {
            status: ResultStatus.Success,
            data: {accessToken, refreshToken},
            extensions: []
        } : errorResult
    },

    async registration(dto: RegistrationInputDTO): Promise<Result> {
        const {login, password, email} = dto
        const existingUserByEmail = await usersRepository.findByEmail(email)
        const existingUserByLogin = await usersRepository.findByLogin(login)

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

        await usersRepository.create(newUser);

        await emailManagers.sendConfirmationCode(newUser.email, newUser.emailConfirmation!.confirmationCode)
        return {
            status: ResultStatus.NoContent,
            data: null,
            extensions: []
        }
    },

    async confirmCode(code: string): Promise<Result> {
        const user = await usersRepository.findByConfirmationCode(code);
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

        const isUpdated = await usersRepository.updateConfirmation(user._id)
        if(!isUpdated) return resultError
        return {
            status: ResultStatus.NoContent,
            extensions: [],
            data: null
        }
    },

    async resendConfirmationEmail(email: string): Promise<boolean> {
        const user = await usersRepository.findByEmail(email)
        if(!user) return false
        if (user.emailConfirmation?.isConfirmed) return false

        const newCode = randomUUID()
        const newExpiration = add(new Date(), { hours: 1, minutes: 30 }).toISOString()
        await usersRepository.updateConfirmationCode(user._id, newCode, newExpiration)
        await emailManagers.sendConfirmationCode(email, newCode)
        return true
    },

    async updateTokens(userId: string, userLogin: string, oldRefreshToken: string): Promise<Result<null | {accessToken: string, refreshToken: string}>> {
        const isBlacklisted = await usersRepository.isTokenBlacklisted(oldRefreshToken)
        if (isBlacklisted) {
            return {
                status: ResultStatus.Unauthorized,
                extensions: [{
                    message: 'Invalid Refresh Token',
                    field: 'cookie'
                }],
                data: null
            }
        }

        const accessToken = jwtService.createAccessToken(userId, userLogin, '10s')
        const refreshToken = jwtService.createRefreshToken(userId, userLogin)

        await usersRepository.addTokenToBlackList(userId, oldRefreshToken)
        return {
            status: ResultStatus.Success,
            extensions: [],
            data: {accessToken, refreshToken}
        }
    },

    async addTokenToBlackList(userId: string, token: string): Promise<Result> {
        const isBlacklisted = await usersRepository.isTokenBlacklisted(token)
        if(isBlacklisted) {
            return {
                status: ResultStatus.Unauthorized,
                extensions: [],
                data: null
            }
        }

        await usersRepository.addTokenToBlackList(userId, token)
        return {
            status: ResultStatus.NoContent,
            extensions: [],
            data: null
        }
    }
}
