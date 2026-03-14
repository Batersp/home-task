import { Request, Response } from 'express';
import {matchedData} from "express-validator";
import {UsersQuery} from "../../types/get-users-query";
import {HttpStatus} from "../../../core/types/http-statuses";
import {usersQwRepository} from "../../repositories/usersQw.repository";
import {PaginatedResponse} from "../../../core/types/paginatedResponse";
import {UserViewModel} from "../../types/user-view-model";

export async function getUsersHandler(req: Request, res: Response<PaginatedResponse<UserViewModel>>) {
    try {
        const sanitizedQuery = matchedData<UsersQuery>(req, {
            locations: ['query'],
            includeOptionals: true,
        })
        const usersResponse = await usersQwRepository.findMany(sanitizedQuery)
        res.status(HttpStatus.Ok).send(usersResponse);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError)
    }
}
