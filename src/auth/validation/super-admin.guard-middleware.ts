import {Request, Response, NextFunction} from "express";
import {HttpStatus} from "../../core/types/http-statuses";
import {SETTINGS} from "../../core/settings/settings";

export const superAdminGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    if (!auth) {
        res.sendStatus(HttpStatus.Unauthorized);
        return;
    }

    const [type, token] = auth.split(' ')

    if(type !== 'Basic') {
        res.sendStatus(HttpStatus.Unauthorized);
        return;
    }

    const decodedToken = Buffer.from(token, 'base64').toString('utf-8');
    const [userName, password] = decodedToken.split(':')

    if(userName !== SETTINGS.ADMIN_USERNAME || password !== SETTINGS.ADMIN_PASSWORD) {
        res.sendStatus(HttpStatus.Unauthorized);
        return;
    }

    next()
}
