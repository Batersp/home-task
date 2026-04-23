import {inject, injectable} from "inversify";
import {Request, Response} from "express";
import {SecurityViewModel} from "../types/security-view-model";
import {SecurityQwRepository} from "../repositories/securityQw.repository";
import {HttpStatus} from "../../core/types/http-statuses";
import {SecurityService} from "../application/security.service";
import {resultStatusToHttpStatus} from "../../core/types/result";

@injectable()
export class SecurityController {

    constructor(
        @inject(SecurityQwRepository) private securityQwRepository: SecurityQwRepository,
        @inject(SecurityService) private securityService: SecurityService
    ) {}

    async getActiveSessions(req: Request, res: Response<SecurityViewModel[]>) {
        try {
            const sessions = await this.securityQwRepository.findActiveSessionsById(req.user!.userId)
            res.status(HttpStatus.Ok).send(sessions);
        } catch {
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }

    async deleteAllSessionsExcludeCurrent(req: Request, res: Response) {
        try {
            await this.securityService.deleteAllSessionsExcludeCurrent(req.user!.userId, req.user!.deviceId!)
            res.sendStatus(HttpStatus.NoContent)
        } catch {
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }

    async deleteSession(req: Request<{deviceId: string}>, res: Response) {
        try {
            const result = await this.securityService.deleteSession(req.user!.userId, req.params.deviceId)
            res.sendStatus(resultStatusToHttpStatus[result.status]);
        } catch {
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }
}
