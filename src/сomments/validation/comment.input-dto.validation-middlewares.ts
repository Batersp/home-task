import {body} from "express-validator";

const contentValidation = body('content')
    .exists()
    .withMessage('Content is required')
    .isString()
    .withMessage('Content should be string')
    .trim()
    .notEmpty()
    .withMessage('Content can not be empty')
    .isLength({ min: 20, max: 300 })
    .withMessage('Content should be from 20 to 300 characters long')

export const commentInputDtoValidation = [
    contentValidation
]
