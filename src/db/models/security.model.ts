import mongoose, {Schema} from "mongoose";
import {Security} from "../../security/types/security";

const sessionSchema = new Schema<Security>({
    userId: {type: String, required: true, minlength: 1, maxlength: 100},
    deviceId: {type: String, required: true, minlength: 1, maxlength: 100},
    iat: {type: String, required: true, minlength: 1, maxlength: 100},
    deviceName: {type: String, required: true, minlength: 1, maxlength: 100},
    ip: {type: String, required: true, minlength: 1, maxlength: 100},
    exp: {type: String, required: true, minlength: 1, maxlength: 100}
})

export const SecurityModel = mongoose.model('sessions', sessionSchema)
