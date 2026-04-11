import {Security} from "../../types/security";
import {SecurityViewModel} from "../../types/security-view-model";
import {WithId} from "mongodb";

export function mapToSecurityViewModel(security: WithId<Security>): SecurityViewModel {
    const {ip, deviceName, iat, deviceId} = security;
    return {
     ip,
     title: deviceName,
     lastActiveDate: iat,
     deviceId
    }
}
