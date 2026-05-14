import {HydratedDocument, model, Model, Schema} from "mongoose";
import {Security, UpdateSessionDataType} from "../types/security";

const sessionSchema = new Schema<Security>({
    userId: {type: String, required: true, minlength: 1, maxlength: 100},
    deviceId: {type: String, required: true, minlength: 1, maxlength: 100},
    iat: {type: String, required: true, minlength: 1, maxlength: 100},
    deviceName: {type: String, required: true, minlength: 1, maxlength: 100},
    ip: {type: String, required: true, minlength: 1, maxlength: 100},
    exp: {type: String, required: true, minlength: 1, maxlength: 100}
})

export class SecurityEntity {
    private constructor(
        public userId: string,
        public deviceId: string,
        public iat: string,
        public deviceName: string,
        public ip: string,
        public exp: string,
    ) {}

    static createSession(sessionData: Security) {
        return new SecurityModel(sessionData)
    }

    update(dto: UpdateSessionDataType) {
        const {iat, exp, ip} = dto
        if(iat) {
            this.iat = iat
        }
        if(exp) {
            this.exp = exp
        }
        if(ip) {
            this.ip = ip
        }
    }
}

interface SecurityMethods {
    update: (dto: UpdateSessionDataType) => void
}

type SecurityStatics = typeof SecurityEntity;
type SecurityModel = Model<Security, {}, SecurityMethods> & SecurityStatics
export type SecurityDocument = HydratedDocument<Security, SecurityMethods>
sessionSchema.loadClass(SecurityEntity)
export const SecurityModel = model<Security, SecurityModel>('sessions', sessionSchema)
