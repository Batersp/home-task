import {Post} from "../types/post";

export type PostInputDto = Omit<Post, 'id' | 'blogName'>