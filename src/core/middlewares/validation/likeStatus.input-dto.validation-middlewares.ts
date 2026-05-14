import {body} from "express-validator";
import {LIKE_STATUS} from "../../enums/like.enum";

const allowedStatuses = Object.values(LIKE_STATUS);

const likeStatusValidation = body('likeStatus')
    .exists()
    .withMessage('likeStatus is required')
    .isString()
    .withMessage('likeStatus should be string')
    .trim()
    .notEmpty()
    .withMessage('likeStatus can not be empty')
    .isIn(allowedStatuses)
    .withMessage(`likeStatus must be one of: ${allowedStatuses.join(', ')}`)

export const likeStatusInputDtoValidation = [
    likeStatusValidation
]
