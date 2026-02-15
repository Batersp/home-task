import {Request, Response} from 'express'
import {PostInputDto} from "../../dto/post.input-dto";
import {Post} from "../../types/post";
import {postsRepository} from "../../repositories/posts.repository";
import {HttpStatus} from "../../../core/types/http-statuses";
import {mapToPostViewModel} from "../mappers/map-to-post-view-model.util";

export async function createPostHandler(req: Request<{}, Post, PostInputDto>, res: Response) {
    try {
        const {title, shortDescription, content, blogId} = req.body;
        const post: Post = {
            title,
            shortDescription,
            content,
            blogId,
            blogName: '1',
            createdAt: new Date().toISOString()
        }
        const createdPost = await postsRepository.create(post)
        const postViewModel = mapToPostViewModel(createdPost)
        res.status(HttpStatus.Created).send(postViewModel)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
