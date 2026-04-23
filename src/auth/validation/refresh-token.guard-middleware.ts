import {Request, Response, NextFunction} from "express";
import {HttpStatus} from "../../core/types/http-statuses";
import {jwtService} from "../../core/services/jwt.service";
import {Utils} from "../../core/utils/utils";
import {SecurityService} from "../../security/application/security.service";
import {container} from "../../iocContainer";

const securityService = container.get(SecurityService)

export const refreshTokenGuardMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        res.sendStatus(HttpStatus.Unauthorized)
        return
    }

    try {
        const decoded = jwtService.verifyRefreshToken(refreshToken)
        const tokenInfo = jwtService.getRefreshTokenInfo(refreshToken)
        const session = await securityService.findCurrentSession(tokenInfo.deviceId, Utils.convertJwtDateToISO(tokenInfo.iat))

        if (!session) {
            res.sendStatus(HttpStatus.Unauthorized)
            return
        }

        req.user = {userId: decoded.userId, userLogin: decoded.userLogin, deviceId: decoded.deviceId}
        next()
    } catch {
        res.sendStatus(HttpStatus.Unauthorized)
    }
}
