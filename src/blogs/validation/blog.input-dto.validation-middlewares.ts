import {body} from "express-validator";

const nameValidation = body('name')
    .exists()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name should be string')
    .trim()
    .notEmpty()
    .withMessage('Name can not be empty')
    .isLength({ max: 15 })
    .withMessage('Name can not be more than 15 characters long')

const descriptionValidation = body('description')
    .exists()
    .withMessage('Description is required')
    .isString()
    .withMessage('Description should be string')
    .trim()
    .notEmpty()
    .withMessage('Description can not be empty')
    .isLength({ max: 500})
    .withMessage('Description can not be more than 500 characters')

const websiteUrlValidation = body('websiteUrl')
    .exists()
    .withMessage('WebsiteUrl is required')
    .isString()
    .withMessage('WebsiteUrl should be string')
    .trim()
    .notEmpty()
    .withMessage('WebsiteUrl can not be empty')
    .isLength({ max: 100})
    .withMessage('WebsiteUrl can not be more than 100 characters')
    .matches('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$')
    .withMessage('WebsiteUrl must be like url adress')

export const blogInputDtoValidation = [
    nameValidation,
    descriptionValidation,
    websiteUrlValidation
]