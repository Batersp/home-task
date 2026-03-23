import {Request, Response} from "express";
import {ResendEmailInputDTO} from "../../dto/resendEmail.input-dto";
import {HttpStatus} from "../../../core/types/http-statuses";
import {authService} from "../../aplication/auth.service";

export async function resendEmailHandler(req: Request<{}, {}, ResendEmailInputDTO>, res: Response) {
    try {
        const isSuccessful = await authService.resendConfirmationEmail(req.body.email)
        if(isSuccessful) {
            res.sendStatus(HttpStatus.NoContent)
            return
        }
        res.status(HttpStatus.BadRequest).send({
            errorsMessages: [{
                message: 'Email is already confirmed',
                field: 'email'
            }]
        })

    } catch (e) {
        console.error(e)
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
