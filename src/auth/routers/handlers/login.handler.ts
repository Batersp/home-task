import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {authService} from "../../aplication/auth.service";
import {LoginInputDto} from "../../dto/login.input-dto";
import {AuthResponse} from "../../types/auth";
import {ResultStatus, resultStatusToHttpStatus} from "../../../core/types/result";

export async function loginHandler(req: Request<{}, {}, LoginInputDto>, res: Response<AuthResponse>): Promise<void> {
    try {
        const result = await authService.login(req.body)

        if (result.status !== ResultStatus.Success) {
            res.sendStatus(resultStatusToHttpStatus[result.status])
            return;
        }

        res.status(resultStatusToHttpStatus[result.status]).send({accessToken: result.data!})
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
