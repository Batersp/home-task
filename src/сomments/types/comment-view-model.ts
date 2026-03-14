import {Comment} from "./comment";

export type CommentViewModel = Omit<Comment & {id: string}, 'postId'> ;
