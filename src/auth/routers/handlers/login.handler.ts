import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {authService} from "../../aplication/auth.service";
import {LoginInputDto} from "../../dto/login.input-dto";

export async function loginHandler(req: Request<{}, {}, LoginInputDto>, res: Response): Promise<void> {
    try {
        const isSuccessful = await authService.login(req.body)

        if (!isSuccessful) {
            res.sendStatus(HttpStatus.Unauthorized)
            return;
        }

        res.sendStatus(HttpStatus.NoContent)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
