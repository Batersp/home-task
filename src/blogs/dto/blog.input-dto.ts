import {Blog} from "../types/blog";

export type BlogInputDto = Omit<Blog, 'id'>