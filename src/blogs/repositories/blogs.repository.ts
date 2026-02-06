import {Blog} from "../types/blog";
import {db} from "../../db/in-memory.db";
import {BlogInputDto} from "../dto/blog.input-dto";

export const blogsRepository = {
    getAll(): Blog[] {
        return db.blogs;
    },

    findById(id: string): Blog | null {
        return db.blogs.find(blog => blog.id === id) || null;
    },

    create(blog: Blog) {
        db.blogs.push(blog);
    },

    update(blog: Blog, dto: BlogInputDto) {
        const {name, description, websiteUrl} = dto;
        blog.name = name
        blog.description = description
        blog.websiteUrl = websiteUrl
    },

    delete(id: string): boolean {
        const index = db.blogs.findIndex((b) => b.id === id);

        if (index === -1) {
            return false;
        }

        db.blogs.splice(index, 1);
        return true;
    }
}