import {model, Schema} from "mongoose";
import {RateLimit} from "../../core/types/rateLimitCollection";

const rateLimitSchema = new Schema<RateLimit>({
    ip: {type: String, required: true, minlength: 1, maxlength: 1000},
    url: {type: String, required: true, minlength: 1, maxlength: 1000},
    date: {type: Date, required: true, expires: 10}
})

export const RateLimitModel = model('rate_limit', rateLimitSchema)
