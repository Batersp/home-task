import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {securityService} from "../../application/security.service";
import {resultStatusToHttpStatus} from "../../../core/types/result";

export async function deleteSessionHandler(req: Request<{deviceId: string}>, res: Response) {
    try {
        const result = await securityService.deleteSession(req.user!.userId, req.params.deviceId)
        res.sendStatus(resultStatusToHttpStatus[result.status]);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
