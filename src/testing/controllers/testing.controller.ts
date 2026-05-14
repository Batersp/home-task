import {injectable} from "inversify";
import {Request, Response} from "express";
import {HttpStatus} from "../../core/types/http-statuses";
import {RateLimitModel} from "../../db/models/rateLimit.model";
import {BlogModel} from "../../blogs/domain/blog.entity";
import {CommentModel} from "../../сomments/domain/comment.entity";
import {PostModel} from "../../posts/domain/post.entity";
import {SecurityModel} from "../../security/domain/security.entity";
import {UserModel} from "../../users/domain/user.entity";

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
