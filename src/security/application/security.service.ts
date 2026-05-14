import {Result, ResultStatus} from "../../core/types/result";
import {Security, UpdateSessionDataType} from "../types/security";
import {inject, injectable} from "inversify";
import {SecurityModel} from "../domain/security.entity";
import {SecurityRepository} from "../repositories/security.repository";

@injectable()
export class SecurityService {

    constructor(@inject(SecurityRepository) private securityRepository: SecurityRepository) {}

    async deleteAllSessionsExcludeCurrent(userId: string, deviceId: string): Promise<void> {
        await this.securityRepository.deleteAllSessionsExcludeCurrent(userId, deviceId)
    }

    async deleteSession(userId: string, deviceId: string): Promise<Result> {
        const session = await this.securityRepository.findSessionByDeviceId(deviceId)
        const result: Result = {
            status: ResultStatus.NotFound,
            data: null,
            extensions: []
        }

        if (!session) return result

        if (session.userId !== userId) {
            result.status = ResultStatus.Forbidden;
            return result
        }

        await this.securityRepository.deleteSession(deviceId)
        result.status = ResultStatus.NoContent;
        return result
    }

    async createSession(sessionData: Security) {
        const session = SecurityModel.createSession(sessionData);
        await this.securityRepository.save(session)
    }

    async findCurrentSession(deviceId: string, iat: string): Promise<Security | null> {
        return this.securityRepository.findCurrentSession(deviceId, iat)
    }

    async updateSession(deviceId: string, oldIat: string, data: UpdateSessionDataType) {
        const session = await this.securityRepository.findCurrentSession(deviceId, oldIat)
        if(!session) {
            throw new Error('Session not found')
        }
        session.update(data)
        await this.securityRepository.save(session)
    }
}
