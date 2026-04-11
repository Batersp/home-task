import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {authService} from "../../aplication/auth.service";
import {resultStatusToHttpStatus} from "../../../core/types/result";

export async function logoutHandler(req: Request, res: Response) {
    try {
        const { userId } = req.user!
        const refreshToken= req.cookies.refreshToken
        const result = await authService.addTokenToBlackList(userId, refreshToken)
        res.sendStatus(resultStatusToHttpStatus[result.status])
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
