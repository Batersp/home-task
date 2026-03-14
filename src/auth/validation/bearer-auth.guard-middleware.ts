import {NextFunction, Request, Response} from "express";
import {HttpStatus} from "../../core/types/http-statuses";
import jwt from "jsonwebtoken";

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
        const decodedToken = jwt.verify(token, process.env.SECRET as string) as { userId: string, userLogin: string };
        req.user = { userId: decodedToken.userId, userLogin: decodedToken.userLogin }
        next()
    } catch {
        res.sendStatus(HttpStatus.Unauthorized);
    }


}
