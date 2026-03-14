import {Request, Response} from "express";
import {usersService} from "../../aplication/users.service";
import {UserInputDto} from "../../dto/user.input-dto";
import {UserViewModel} from "../../types/user-view-model";
import {HttpStatus} from "../../../core/types/http-statuses";
import {usersQwRepository} from "../../repositories/usersQw.repository";

export async function createUsersHandler(req: Request<{}, UserViewModel, UserInputDto>, res: Response) {
    try {
        const createdUserId = await usersService.create(req.body);
        if (!createdUserId) {
            res.status(HttpStatus.BadRequest).send({
                errorsMessages: [{field: 'login or email', message: 'User with this login or email already exists'}]
            })
            return
        }

        const createdUser = await usersQwRepository.findById(createdUserId)
        if(createdUser) {
            res.status(HttpStatus.Created).send(createdUser)
            return
        }
        res.sendStatus(HttpStatus.InternalServerError)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
