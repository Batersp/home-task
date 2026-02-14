import {param} from "express-validator";

export const idValidation = param('id')
    .exists()
    .withMessage('ID is required')
    .trim()
    .isLength({ min: 1 })
    .withMessage('ID must not be empty')
    .isString()
    .withMessage('ID must be a string')
    .isMongoId()
    .withMessage('Incorrect format of ObjectId');
