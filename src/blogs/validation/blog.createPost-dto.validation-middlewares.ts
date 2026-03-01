import {body} from "express-validator";

const titleValidation = body('title')
    .exists()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title should be string')
    .trim()
    .notEmpty()
    .withMessage('Title can not be empty')
    .isLength({max: 30})
    .withMessage('Title can not be more than 30 characters')

const shortDescriptionValidation = body('shortDescription')
    .exists()
    .withMessage('shortDescription is required')
    .isString()
    .withMessage('shortDescription should be string')
    .trim()
    .notEmpty()
    .withMessage('shortDescription can not be empty')
    .isLength({max: 100})
    .withMessage('shortDescription can not be more than 100 characters')

const contentValidation = body('content')
    .exists()
    .withMessage('content is required')
    .isString()
    .withMessage('content should be string')
    .trim()
    .notEmpty()
    .withMessage('content can not be empty')
    .isLength({max: 1000})
    .withMessage('content can not be more than 1000 characters')

export const blogCreatePostDtoValidationMiddlewares = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
]
