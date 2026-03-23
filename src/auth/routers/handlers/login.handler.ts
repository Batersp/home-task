import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {authService} from "../../aplication/auth.service";
import {LoginInputDto} from "../../dto/login.input-dto";
import {AuthResponse} from "../../types/auth";
import {jwtService} from "../../../core/services/jwt.service";

export async function loginHandler(req: Request<{}, {}, LoginInputDto>, res: Response<AuthResponse>): Promise<void> {
    try {
        const user = await authService.login(req.body)

        if (!user) {
            res.sendStatus(HttpStatus.Unauthorized)
            return;
        }
        const jwtToken = jwtService.createJwtToken(user._id.toString(), user.login, '1h')

        res.status(HttpStatus.Ok).send({accessToken: jwtToken})
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
