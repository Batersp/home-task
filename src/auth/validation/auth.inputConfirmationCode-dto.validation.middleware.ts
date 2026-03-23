import {body} from "express-validator";

const codeValidation = body('code')
    .exists()
    .withMessage('Code is required')
    .isString()
    .withMessage('Code should be string')
    .trim()
    .notEmpty()
    .withMessage('Code can not be empty')

export const authInputConfirmationCodeDtoValidation = [
    codeValidation
]
