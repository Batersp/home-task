import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {authService} from "../../aplication/auth.service";
import {ResultStatus, resultStatusToHttpStatus} from "../../../core/types/result";
import {AuthResponse} from "../../types/auth";

export async function updateTokensHandler(req: Request, res: Response<AuthResponse>): Promise<void> {
    try {
        const { userId, userLogin } = req.user!
        const refreshToken= req.cookies.refreshToken
        const result = await authService.updateTokens(userId, userLogin, refreshToken, req.ip!)

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
