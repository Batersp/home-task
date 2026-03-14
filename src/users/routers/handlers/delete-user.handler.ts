import {Request, Response} from "express";
import {HttpStatus} from "../../../core/types/http-statuses";
import {usersService} from "../../aplication/users.service";
import {ObjectId} from "mongodb";

export async function deleteUsersHandler(req: Request<{ id: string }>, res: Response) {
    try {
        const isSuccessful = await usersService.delete(new ObjectId(req.params.id))
        if (isSuccessful) {
            res.sendStatus(HttpStatus.NoContent);
            return
        }
        res.sendStatus(HttpStatus.NotFound)
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
