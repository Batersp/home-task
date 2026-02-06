import {Post} from "../types/post";
import {db} from "../../db/in-memory.db";
import {PostInputDto} from "../dto/post.input-dto";

export const postsRepository = {
    getAll(): Post[] {
        return db.posts;
    },

    getById(id: string): Post | null {
        return db.posts.find(post => post.id === id) || null;
    },

    create(post: Post) {
        db.posts.push(post);
    },

    update(post: Post, dto: PostInputDto) {
        const {title, shortDescription, content, blogId} = dto
        post.title = title
        post.shortDescription = shortDescription
        post.content = content
        post.blogId = blogId
    },

    delete(id: string): boolean {
        const index = db.posts.findIndex((p) => p.id === id);

        if (index === -1) {
            return false;
        }

        db.posts.splice(index, 1);
        return true;
    }
}