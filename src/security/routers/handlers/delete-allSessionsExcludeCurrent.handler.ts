import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {securityService} from "../../application/security.service";

export async function deleteAllSessionsExcludeCurrentHandler(req: Request, res: Response) {
    try {
        await securityService.deleteAllSessionsExcludeCurrent(req.user!.userId, req.user!.deviceId!)
        res.sendStatus(HttpStatus.NoContent)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
