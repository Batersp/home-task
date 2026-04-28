import {Security, UpdateSessionDataType} from "../types/security";
import {SecurityModel} from "../../db/models/security.model";

export const securityRepository = {
    async createSession(sessionData: Security): Promise<boolean> {
        const sessionInstance = new SecurityModel(sessionData)
        await sessionInstance.save()
        return !!sessionInstance._id
    },

    async findCurrentSession(deviceId: string, iat: string): Promise<Security | null> {
        return SecurityModel.findOne({ deviceId, iat }).lean()
    },

    async findSessionByDeviceId(deviceId: string): Promise<Security | null> {
        return SecurityModel.findOne({ deviceId }).lean()
    },

    async updateSession(deviceId: string, oldIat: string, data: UpdateSessionDataType): Promise<boolean> {
        const res = await SecurityModel.updateOne(
            { deviceId, iat: oldIat },
            {iat: data.iat, exp: data.exp, ip: data.ip}
        )
        return res.matchedCount === 1
    },

    async deleteSession(deviceId: string): Promise<void> {
        await SecurityModel.deleteOne({ deviceId })
    },

    async deleteAllSessionsExcludeCurrent(userId: string, deviceId: string): Promise<boolean> {
        const res = await SecurityModel.deleteMany({
            userId,
            deviceId: { $ne: deviceId }
        })
        return res.deletedCount >= 1
    }
}
