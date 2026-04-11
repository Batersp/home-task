import {Request, Response} from "express";
import {SecurityViewModel} from "../../types/security-view-model";
import {securityQwRepository} from "../../repositories/securityQw.repository";
import {HttpStatus} from "../../../core/types/http-statuses";

export async function getActiveSessionsHandler(req: Request, res: Response<SecurityViewModel[]>) {
    try {
        const sessions = await securityQwRepository.findActiveSessionsById(req.user!.userId)
        res.status(HttpStatus.Ok).send(sessions);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
