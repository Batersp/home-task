import {Request, Response} from "express";
import {usersService} from "../../aplication/users.service";
import {UserInputDto} from "../../dto/user.input-dto";
import {UserViewModel} from "../../types/user-view-model";
import {HttpStatus} from "../../../core/types/http-statuses";

export async function createUsersHandler(req: Request<{}, UserViewModel, UserInputDto>, res: Response) {
    try {
        const createdUser = await usersService.create(req.body);
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
