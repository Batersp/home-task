import {Request, Response} from 'express'
import {PostInputDto} from "../../dto/post.input-dto";
import {Post} from "../../types/post";
import {db} from "../../../db/in-memory.db";
import {postsRepository} from "../../repositories/posts.repository";
import {HttpStatus} from "../../../core/types/http-statuses";

export function createPostHandler(req: Request<{}, Post, PostInputDto>, res: Response) {
    const {title, shortDescription, content, blogId} = req.body;
    const post: Post = {
        id: db.posts.length ? (+db.posts[db.posts.length - 1].id + 1).toString() : '1',
        title,
        shortDescription,
        content,
        blogId,
        blogName: '1'
    }
    postsRepository.create(post)
    res.status(HttpStatus.Created).send(post)
}