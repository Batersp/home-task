import {SecurityViewModel} from "../types/security-view-model";
import {mapToSecurityViewModel} from "../routers/mappers/map-to-security-view-model.util";
import {injectable} from "inversify";
import {SecurityModel} from "../domain/security.entity";

@injectable()
export class SecurityQwRepository {
    async findActiveSessionsById(userId: string): Promise<SecurityViewModel[]> {
        const sessions = await SecurityModel.find(
            { userId, exp: { $gt: new Date().toISOString() } }
        ).lean()
        return sessions.map(mapToSecurityViewModel)
    }
}
