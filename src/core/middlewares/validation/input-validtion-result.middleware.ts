import {FieldValidationError, ValidationError, validationResult} from "express-validator";
import {NextFunction} from "express";
import {HttpStatus} from "../../types/http-statuses";
import { Request, Response } from 'express';

const formatErrors = (error: ValidationError) => {
    const {path, msg} = error as unknown as FieldValidationError;
    return {
        field: path,
        message: msg
    }
}

export const inputValidationResultMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).formatWith(formatErrors).array({onlyFirstError: true});

    if(errors.length) {
        res.status(HttpStatus.BadRequest).send(errors)
        return
    }

    next()
}