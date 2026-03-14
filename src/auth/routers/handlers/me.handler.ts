import {Request, Response} from "express";
import {MeResponse} from "../../types/auth";
import {usersQwRepository} from "../../../users/repositories/usersQw.repository";
import {ObjectId} from "mongodb";
import {HttpStatus} from "../../../core/types/http-statuses";

export async function meHandler(req: Request, res: Response<MeResponse>) {
    try {
        const user = await usersQwRepository.findById(new ObjectId(req.user!.userId))
        if (user) {
            const {id: userId, login, email} = user
           res.status(HttpStatus.Ok).send({
               userId,
               login,
               email
           })
        }
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
