import mongoose, {Schema} from "mongoose";
import {User} from "../../users/types/user";

const userSchema = new Schema<User>({
    login: {type: String, required: true, unique: true, minlength: 1, maxlength: 100},
    email: {type: String, required: true, unique: true, minlength: 1, maxlength: 100},
    createdAt: {type: String, required: true},
    passHash: {type: String, required: true, minlength: 1, maxlength: 1000},
    emailConfirmation: {
        type: {
            confirmationCode: {type: String, required: true, minlength: 1, maxlength: 1000},
            expirationDate: {type: Date, required: true},
            isConfirmed: {type: Boolean, required: true},
        },
        required: false,
        default: undefined
    },
    passwordRecovery: {
        type: {
            recoveryCode: {type: String, required: true, minlength: 1, maxlength: 1000},
            expirationDate: {type: Date, required: true},
        },
        required: false,
        default: undefined
    }
})

export const UserModel = mongoose.model('users', userSchema)
