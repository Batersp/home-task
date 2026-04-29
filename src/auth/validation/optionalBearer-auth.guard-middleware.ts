import {NextFunction, Request, Response} from "express";
import {jwtService} from "../../core/services/jwt.service";

export const optionalBearerAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization
    if (!auth) {
        next()
        return
    }

    const [type, token] = auth.split(' ')
    if (type !== 'Bearer') {
        next()
        return
    }

    try {
        const decodedToken = jwtService.verifyAccessToken(token);
        req.user = { userId: decodedToken.userId, userLogin: decodedToken.userLogin }
    } catch {

    }

    next()
}
