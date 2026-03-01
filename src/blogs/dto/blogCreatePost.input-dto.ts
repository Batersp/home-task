import {Post} from "../../posts/types/post";

export type BlogCreatePostInputDto = Omit<Post, 'blogName' | 'blogId'>
