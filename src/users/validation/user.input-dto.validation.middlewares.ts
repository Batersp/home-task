import {body} from "express-validator";

const loginValidation = body('login')
    .exists()
    .withMessage('Login is required')
    .isString()
    .withMessage('Login should be string')
    .trim()
    .notEmpty()
    .withMessage('Login can not be empty')
    .isLength({ min: 3, max: 10 })
    .withMessage('Login should be from 3 to 10 characters long')
    .matches('^[a-zA-Z0-9_-]*$')
    .withMessage('Only letters (a–z, A–Z), numbers, hyphens (-), and underscores (_) are allowed.')

const passwordValidation = body('password')
    .exists()
    .withMessage('Password is required')
    .isString()
    .withMessage('Password should be string')
    .trim()
    .notEmpty()
    .withMessage('Password can not be empty')
    .isLength({ min: 6, max: 20 })
    .withMessage('Password should be from 6 to 20 characters long')

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

export const userInputDtoValidation = [
    loginValidation,
    passwordValidation,
    emailValidation
]
