import {injectable} from "inversify";
import {Request, Response} from "express";
import {blogCollection, commentCollection, postCollection, securityCollection, userCollection} from "../../db/mongo.db";
import {HttpStatus} from "../../core/types/http-statuses";

@injectable()
export class TestingController {
    async deleteAllData(req: Request, res: Response) {
        await Promise.all([blogCollection.deleteMany(), postCollection.deleteMany(), userCollection.deleteMany(), commentCollection.deleteMany(), securityCollection.deleteMany()])
        res.sendStatus(HttpStatus.NoContent)
    }
}
