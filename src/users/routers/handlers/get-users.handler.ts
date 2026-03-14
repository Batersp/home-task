import { Request, Response } from 'express';
import {matchedData} from "express-validator";
import {UsersQuery} from "../../types/get-users-query";
import {usersService} from "../../aplication/users.service";
import {HttpStatus} from "../../../core/types/http-statuses";
import {mapToUserViewModel} from "../mappers/map-to-user-view-model.util";

export async function getUsersHandler(req: Request, res: Response) {
    try {
        const sanitizedQuery = matchedData<UsersQuery>(req, {
            locations: ['query'],
            includeOptionals: true,
        })
        console.log('sanitizedQuery:', sanitizedQuery)
        const usersResponse = await usersService.findMany(sanitizedQuery)
        const usersViewModel = {...usersResponse, items: usersResponse.items.map(mapToUserViewModel)}
        res.status(HttpStatus.Ok).send(usersViewModel);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
