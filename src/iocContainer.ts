import 'reflect-metadata';
import {Container} from "inversify";
import {AuthService} from "./auth/aplication/auth.service";
import {UsersRepository} from "./users/repositories/users.repository";
import {SecurityService} from "./security/application/security.service";
import {AuthController} from "./auth/controllers/auth.controller";
import {UsersQwRepository} from "./users/repositories/usersQw.repository";
import {BlogsService} from "./blogs/aplication/blogs.service";
import {BlogsRepository} from "./blogs/repositories/blogs.repository";
import {BlogsQwRepository} from "./blogs/repositories/blogsQw.repository";
import {BlogsController} from "./blogs/controllers/blogs.controller";
import {PostsQwRepository} from "./posts/repositories/postsQw.repository";
import {PostsService} from "./posts/aplication/posts.service";
import {PostsRepository} from "./posts/repositories/posts.repository";
import {PostsController} from "./posts/controllers/posts.controller";
import {CommentsService} from "./сomments/aplication/comments.service";
import {CommentsRepository} from "./сomments/repositories/comments.repository";
import {CommentsQwRepository} from "./сomments/repositories/commentsQw.repository";
import {SecurityController} from "./security/controllers/security.controller";
import {SecurityQwRepository} from "./security/repositories/securityQw.repository";
import {TestingController} from "./testing/controllers/testing.controller";
import {UsersService} from "./users/aplication/users.service";
import {UsersController} from "./users/controller/users.controller";
import {CommentsController} from "./сomments/controllers/comments.controller";

export const container = new Container();

container.bind(AuthService).to(AuthService);
container.bind(SecurityService).to(SecurityService);
container.bind(BlogsService).to(BlogsService);
container.bind(PostsService).to(PostsService);
container.bind(CommentsService).to(CommentsService);
container.bind(UsersService).to(UsersService);


container.bind(AuthController).to(AuthController);
container.bind(BlogsController).to(BlogsController);
container.bind(PostsController).to(PostsController);
container.bind(SecurityController).to(SecurityController);
container.bind(TestingController).to(TestingController);
container.bind(UsersController).to(UsersController);
container.bind(CommentsController).to(CommentsController);


container.bind(UsersRepository).to(UsersRepository);
container.bind(UsersQwRepository).to(UsersQwRepository);
container.bind(BlogsRepository).to(BlogsRepository);
container.bind(BlogsQwRepository).to(BlogsQwRepository);
container.bind(PostsRepository).to(PostsRepository);
container.bind(PostsQwRepository).to(PostsQwRepository);
container.bind(CommentsRepository).to(CommentsRepository);
container.bind(CommentsQwRepository).to(CommentsQwRepository);
container.bind(SecurityQwRepository).to(SecurityQwRepository);
