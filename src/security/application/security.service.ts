import {securityRepository} from "../repositories/security.repository";
import {Result, ResultStatus} from "../../core/types/result";
import {Security, UpdateSessionDataType} from "../types/security";
import {injectable} from "inversify";

@injectable()
export class SecurityService {
    async deleteAllSessionsExcludeCurrent(userId: string, deviceId: string): Promise<void> {
        await securityRepository.deleteAllSessionsExcludeCurrent(userId, deviceId)
    }

    async deleteSession(userId: string, deviceId: string): Promise<Result> {
        const session = await securityRepository.findSessionByDeviceId(deviceId)
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

        await securityRepository.deleteSession(deviceId)
        result.status = ResultStatus.NoContent;
        return result
    }

    async createSession(sessionData: Security) {
        await securityRepository.createSession(sessionData)
    }

    async findCurrentSession(deviceId: string, iat: string): Promise<Security | null> {
        return securityRepository.findCurrentSession(deviceId, iat)
    }

    async updateSession(deviceId: string, oldIat: string, data: UpdateSessionDataType) {
        await securityRepository.updateSession(deviceId, oldIat, data)
    }
}
