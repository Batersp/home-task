import {Request, Response} from "express";
import {usersService} from "../../aplication/users.service";
import {UserInputDto} from "../../dto/user.input-dto";
import {UserViewModel} from "../../types/user-view-model";
import {HttpStatus} from "../../../core/types/http-statuses";
import {mapToUserViewModel} from "../mappers/map-to-user-view-model.util";

export async function createUsersHandler(req: Request<{}, UserViewModel, UserInputDto>, res: Response) {
    try {
        const createdUserId = await usersService.create(req.body);
        if (!createdUserId) {
            res.status(HttpStatus.BadRequest).send({
                errorsMessages: [{field: 'login or email', message: 'User with this login or email already exists'}]
            })
            return
        }

        const createdUser = await usersService.findById(createdUserId)
        const userViewModel = mapToUserViewModel(createdUser!)
        res.status(HttpStatus.Created).send(userViewModel)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
