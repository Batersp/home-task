import {Request, Response} from "express";
import {RegistrationInputDTO} from "../../dto/registration.input-dto";
import {HttpStatus} from "../../../core/types/http-statuses";
import {authService} from "../../aplication/auth.service";
import {ResultStatus, resultStatusToHttpStatus} from "../../../core/types/result";

export async function registrationHandler(req: Request<{}, {}, RegistrationInputDTO>, res: Response) {
    try {
        const result = await authService.registration(req.body);
        if (result.status !== ResultStatus.NoContent) {
            res.status(resultStatusToHttpStatus[result.status]).send({errorsMessages: result.extensions})
            return
        }
        res.sendStatus(resultStatusToHttpStatus[result.status])
    } catch(e) {
        console.error(e)
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
