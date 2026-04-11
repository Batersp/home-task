import {securityCollection} from "../../db/mongo.db";
import {SecurityViewModel} from "../types/security-view-model";
import {mapToSecurityViewModel} from "../routers/mappers/map-to-security-view-model.util";

export const securityQwRepository = {
    async findActiveSessionsById(userId: string): Promise<SecurityViewModel[]> {
        const sessions = await securityCollection.find(
            { userId, exp: { $gt: new Date().toISOString() } }
        ).toArray()
        return sessions.map(mapToSecurityViewModel)
    }
}
