import {SecurityDocument, SecurityModel} from "../domain/security.entity";
import {injectable} from "inversify";

@injectable()
export class SecurityRepository {
    async save(session: SecurityDocument): Promise<boolean> {
        const saved = await session.save();
        return !!saved._id;
    }

    async findCurrentSession(deviceId: string, iat: string) {
        return SecurityModel.findOne({ deviceId, iat })
    }

    async findSessionByDeviceId(deviceId: string) {
        return SecurityModel.findOne({ deviceId })
    }

    async deleteSession(deviceId: string): Promise<void> {
        await SecurityModel.deleteOne({ deviceId })
    }

    async deleteAllSessionsExcludeCurrent(userId: string, deviceId: string): Promise<boolean> {
        const res = await SecurityModel.deleteMany({
            userId,
            deviceId: { $ne: deviceId }
        })
        return res.deletedCount >= 1
    }
}
