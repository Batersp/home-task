import {injectable} from "inversify";
import {Request, Response} from "express";
import {HttpStatus} from "../../core/types/http-statuses";
import {BlogModel} from "../../db/models/blog.model";
import {PostModel} from "../../db/models/post.model";
import {CommentModel} from "../../db/models/comment.model";
import {UserModel} from "../../db/models/user.model";
import {SecurityModel} from "../../db/models/security.model";
import {RateLimitModel} from "../../db/models/rateLimit.model";

@injectable()
export class TestingController {
    async deleteAllData(req: Request, res: Response) {
        await Promise.all([
            BlogModel.deleteMany(),
            PostModel.deleteMany(),
            UserModel.deleteMany(),
            CommentModel.deleteMany(),
            SecurityModel.deleteMany(),
            RateLimitModel.deleteMany()
        ]);
        res.sendStatus(HttpStatus.NoContent)
    }
}
