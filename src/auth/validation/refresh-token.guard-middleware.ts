import {Request, Response, NextFunction} from "express";
import {HttpStatus} from "../../core/types/http-statuses";
import {jwtService} from "../../core/services/jwt.service";

export const refreshTokenGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        res.sendStatus(HttpStatus.Unauthorized)
        return
    }

    try {
        const decoded = jwtService.verifyRefreshToken(refreshToken)
        req.user = { userId: decoded.userId, userLogin: decoded.userLogin }
        next()
    } catch {
        res.sendStatus(HttpStatus.Unauthorized)
    }
}
