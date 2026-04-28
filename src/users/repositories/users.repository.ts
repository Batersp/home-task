import {User} from "../types/user";
import {ObjectId, WithId} from "mongodb";
import {injectable} from "inversify";
import {UserModel} from "../../db/models/user.model";

@injectable()
export class UsersRepository {

    async findByLoginOrEmail(login: string, email?: string): Promise<WithId<User> | null> {
        const conditions = email
            ? [{ login }, { email }]
            : [{ login }, { email: login }]

        return UserModel.findOne({ $or: conditions }).lean()
    }

    async findByEmail(email: string): Promise<WithId<User> | null> {
        return UserModel.findOne({ email }).lean()
    }

    async findByLogin(login: string): Promise<WithId<User> | null> {
        return UserModel.findOne({ login }).lean()
    }

    async findByConfirmationCode(code: string): Promise<WithId<User> | null> {
        return await UserModel.findOne({"emailConfirmation.confirmationCode": code}).lean()
    }

    async updateConfirmation(userId: ObjectId): Promise<boolean> {
        const res = await UserModel.updateOne({_id: userId}, {$set: {"emailConfirmation.isConfirmed": true}})
        return res.modifiedCount === 1
    }

    async updateConfirmationCode(id: ObjectId, code: string, expirationDate: string): Promise<boolean> {
        const res = await UserModel.updateOne(
            { _id: id },
            { $set: {
                    'emailConfirmation.confirmationCode': code,
                    'emailConfirmation.expirationDate': expirationDate
                }}
        )
        return res.modifiedCount > 1
    }

    async create(user: User): Promise<ObjectId> {
        const userInstance = new UserModel(user)
        await userInstance.save()
        return userInstance._id
    }

    async delete(id: ObjectId): Promise<boolean> {
        const deletedResult = await UserModel.deleteOne({_id: id})
        return deletedResult.deletedCount >= 1;
    }

    async savePasswordRecoveryCode(userId: ObjectId, code: string, expirationDate: Date) {
        await UserModel.updateOne(
            {_id: userId},
            {$set: {'passwordRecovery.recoveryCode': code, 'passwordRecovery.expirationDate': expirationDate}}
        )
    }

    async findByRecoveryCode(code: string): Promise<WithId<User> | null> {
        return UserModel.findOne({'passwordRecovery.recoveryCode': code}).lean()
    }

    async updatePassword(userId: ObjectId, passHash: string) {
        await UserModel.updateOne(
            {_id: userId},
            {$set: {passHash}, $unset: {passwordRecovery: ''}}
        )
    }
}
