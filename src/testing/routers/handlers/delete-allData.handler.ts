import {Request, Response} from 'express'
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogCollection, postCollection} from "../../../db/mongo.db";

export async function deleteAllData(req: Request, res: Response) {
    await Promise.all([blogCollection.deleteMany(), postCollection.deleteMany()])
    res.sendStatus(HttpStatus.NoContent)
}
