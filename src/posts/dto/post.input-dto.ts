import {Post} from "../types/post";

export type PostInputDto = Omit<Post, 'blogName' | 'createdAt'>
