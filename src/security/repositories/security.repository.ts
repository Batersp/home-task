import {Security, UpdateSessionDataType} from "../types/security";
import {securityCollection} from "../../db/mongo.db";

export const securityRepository = {
    async createSession(sessionData: Security): Promise<boolean> {
        const result = await securityCollection.insertOne(sessionData)
        return !!result.insertedId
    },

    async findCurrentSession(deviceId: string, iat: string): Promise<Security | null> {
        return securityCollection.findOne({ deviceId, iat })
    },

    async findSessionByDeviceId(deviceId: string): Promise<Security | null> {
        return securityCollection.findOne({ deviceId })
    },

    async updateSession(deviceId: string, oldIat: string, data: UpdateSessionDataType): Promise<boolean> {
        const res = await securityCollection.updateOne(
            { deviceId, iat: oldIat },
            { $set: {
                    iat: data.iat,
                    exp: data.exp,
                    ip: data.ip,
                }}
        )
        return res.matchedCount === 1
    },

    async deleteSession(deviceId: string): Promise<void> {
        await securityCollection.deleteOne({ deviceId })
    },

    async deleteAllSessionsExcludeCurrent(userId: string, deviceId: string): Promise<boolean> {
        const res = await securityCollection.deleteMany({
            userId,
            deviceId: { $ne: deviceId }
        })
        return res.deletedCount >= 1
    }
}
