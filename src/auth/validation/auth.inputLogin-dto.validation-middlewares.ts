import {body} from "express-validator";

const loginOrEmailValidation = body('loginOrEmail')
    .exists()
    .withMessage('LoginOrEmail is required')
    .isString()
    .withMessage('LoginOrEmail should be string')
    .trim()
    .notEmpty()
    .withMessage('LoginOrEmail can not be empty')

const passwordValidation = body('password')
    .exists()
    .withMessage('Password is required')
    .isString()
    .withMessage('Password should be string')
    .trim()
    .notEmpty()
    .withMessage('Password can not be empty')

export const authInputLoginDtoValidation = [
    loginOrEmailValidation,
    passwordValidation
]
