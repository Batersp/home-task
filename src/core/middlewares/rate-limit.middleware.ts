import {Request, Response, NextFunction} from "express";
import {rateLimitCollection} from "../../db/mongo.db";
import {HttpStatus} from "../types/http-statuses";

export async function rateLimitMiddleware(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip!
    const url = req.originalUrl
    const tenSecondsAgo = new Date(Date.now() - 10 * 1000)

    await rateLimitCollection.insertOne({ ip, url, date: new Date() })

    const count = await rateLimitCollection.countDocuments({
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
