import {NextFunction, Request, Response} from "express";
import {HttpStatus} from "../../core/types/http-statuses";
import {jwtService} from "../../core/services/jwt.service";

export const bearerAuthGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization
    if(!auth) {
        res.sendStatus(HttpStatus.Unauthorized)
        return
    }

    const [type, token] = auth.split(' ')
    if(type !== 'Bearer') {
        res.sendStatus(HttpStatus.Unauthorized);
        return;
    }

    try {
        const decodedToken = jwtService.verifyAccessToken(token);
        req.user = { userId: decodedToken.userId, userLogin: decodedToken.userLogin }
        next()
    } catch(e) {
        res.sendStatus(HttpStatus.Unauthorized);
    }


}
