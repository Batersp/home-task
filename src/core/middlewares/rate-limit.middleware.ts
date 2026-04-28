import {Request, Response, NextFunction} from "express";
import {HttpStatus} from "../types/http-statuses";
import {RateLimitModel} from "../../db/models/rateLimit.model";

export async function rateLimitMiddleware(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip!
    const url = req.originalUrl
    const tenSecondsAgo = new Date(Date.now() - 10 * 1000)

    await RateLimitModel.insertOne({ ip, url, date: new Date() })

    const count = await RateLimitModel.countDocuments({
        ip,
        url,
        date: { $gte: tenSecondsAgo }
    })

    if (count > 5) {
        res.sendStatus(HttpStatus.TooManyRequests)
        return
    }

    next()
}
