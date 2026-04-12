import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {authService} from "../../aplication/auth.service";
import {resultStatusToHttpStatus} from "../../../core/types/result";

export async function logoutHandler(req: Request, res: Response) {
    try {
        const result = await authService.logout(req.user!.userId, req.user!.deviceId!)
        res.clearCookie('refreshToken')
        res.sendStatus(resultStatusToHttpStatus[result.status])
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
