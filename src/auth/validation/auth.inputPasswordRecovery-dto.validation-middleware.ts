import {body} from "express-validator";

const emailValidation = body('email')
    .exists()
    .withMessage('Email is required')
    .isString()
    .withMessage('Email should be string')
    .trim()
    .notEmpty()
    .withMessage('Email can not be empty')
    .matches('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')
    .withMessage('Should be valid email. example: example@example.dev')

export const authInputPasswordRecoveryDtoValidation = [
    emailValidation
]
