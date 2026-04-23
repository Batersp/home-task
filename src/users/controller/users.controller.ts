import {inject, injectable} from "inversify";
import {Request, Response} from "express";
import {PaginatedResponse} from "../../core/types/paginatedResponse";
import {UserViewModel} from "../types/user-view-model";
import {matchedData} from "express-validator";
import {UsersQuery} from "../types/get-users-query";
import {UsersQwRepository} from "../repositories/usersQw.repository";
import {HttpStatus} from "../../core/types/http-statuses";
import {UserInputDto} from "../dto/user.input-dto";
import {UsersService} from "../aplication/users.service";
import {ObjectId} from "mongodb";

@injectable()
export class UsersController {

    constructor(
        @inject(UsersQwRepository) private usersQwRepository: UsersQwRepository,
        @inject(UsersService) private usersService: UsersService
    ) {}

    async getUsers(req: Request, res: Response<PaginatedResponse<UserViewModel>>) {
        try {
            const sanitizedQuery = matchedData<UsersQuery>(req, {
                locations: ['query'],
                includeOptionals: true,
            })
            const usersResponse = await this.usersQwRepository.findMany(sanitizedQuery)
            res.status(HttpStatus.Ok).send(usersResponse);
        } catch {
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }

    async createUser(req: Request<{}, UserViewModel, UserInputDto>, res: Response) {
        try {
            const createdUser = await this.usersService.create(req.body);
            if (!createdUser) {
                res.status(HttpStatus.BadRequest).send({
                    errorsMessages: [{field: 'login or email', message: 'User with this login or email already exists'}]
                })
                return
            }

            res.status(HttpStatus.Created).send(createdUser)
        } catch {
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }

    async deleteUser(req: Request<{ id: string }>, res: Response) {
        try {
            const isSuccessful = await this.usersService.delete(new ObjectId(req.params.id))
            if (isSuccessful) {
                res.sendStatus(HttpStatus.NoContent);
                return
            }
            res.sendStatus(HttpStatus.NotFound)
        } catch {
            res.sendStatus(HttpStatus.InternalServerError)
        }
    }
}
