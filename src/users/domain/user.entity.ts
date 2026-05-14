import {HydratedDocument, model, Model, Schema} from "mongoose";
import {User} from "../types/user";

const userSchema = new Schema<User>({
    login: {type: String, required: true, unique: true, minlength: 1, maxlength: 100},
    email: {type: String, required: true, unique: true, minlength: 1, maxlength: 100},
    createdAt: {type: String, required: true, default: new Date().toISOString()},
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

export class UserEntity {
    private constructor(
        public login: string,
        public email: string,
        public createdAt: string,
        public passHash: string,
        public emailConfirmation?: {
            confirmationCode: string,
            expirationDate: Date,
            isConfirmed: boolean,
        },
        public passwordRecovery?: {
            recoveryCode: string,
            expirationDate: Date
        }
    ) {}

    static createUser(user: User) {
        return new UserModel(user);
    }

    confirmCode() {
        if (this.emailConfirmation) {
            this.emailConfirmation.isConfirmed = true
        }
    }

    updateConfirmationEmail(code: string, expirationDate: string) {
        this.emailConfirmation = {
            confirmationCode: code,
            expirationDate: new Date(expirationDate),
            isConfirmed: false
        }
    }

    savePasswordRecoveryCode(code: string, expirationDate: Date) {
        this.passwordRecovery = {
            recoveryCode: code,
            expirationDate: expirationDate
        }
    }

    updatePassword(passHash: string) {
        this.passHash = passHash
        this.passwordRecovery = undefined
    }

}

interface UserMethods {
    confirmCode: () => void
    updateConfirmationEmail: (code: string, expirationDate: string) => void
    savePasswordRecoveryCode: (code: string, expirationDate: Date) => void
    updatePassword: (passHash: string) => void
}

type UserStatics = typeof UserEntity;
type UserModel = Model<User, {}, UserMethods> & UserStatics
export type UserDocument = HydratedDocument<User, UserMethods>
userSchema.loadClass(UserEntity)
export const UserModel = model<User, UserModel>('users', userSchema)
