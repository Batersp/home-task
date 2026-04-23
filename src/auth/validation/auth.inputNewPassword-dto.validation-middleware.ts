import {body} from "express-validator";

const newPassword = body('newPassword')
    .exists()
    .withMessage('newPassword is required')
    .isString()
    .withMessage('newPassword should be string')
    .trim()
    .notEmpty()
    .withMessage('newPassword can not be empty')
    .isLength({ min: 6, max: 20 })
    .withMessage('Password should be from 6 to 20 characters long')

const recoveryCode = body('recoveryCode')
    .exists()
    .withMessage('recoveryCode is required')
    .isString()
    .withMessage('recoveryCode should be string')
    .trim()
    .notEmpty()
    .withMessage('recoveryCode can not be empty')

export const authInputNewPasswordDtoValidation = [
    newPassword, recoveryCode
]
