import {Request, Response} from "express";
import {ConfirmationInputDTO} from "../../dto/confirmation.input-dto";
import {authService} from "../../aplication/auth.service";
import {HttpStatus} from "../../../core/types/http-statuses";
import {ResultStatus, resultStatusToHttpStatus} from "../../../core/types/result";

export async function confirmationHandler(req: Request<{}, {}, ConfirmationInputDTO>, res: Response) {
    try {
        const result = await authService.confirmCode(req.body.code)
        if (result.status === ResultStatus.NoContent) {
            res.sendStatus(resultStatusToHttpStatus[result.status]);
            return
        }
        res.status(resultStatusToHttpStatus[result.status]).send({
            errorsMessages: result.extensions
        })
    } catch(e) {
        console.error(e)
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
