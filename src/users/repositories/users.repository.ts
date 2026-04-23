import {User} from "../types/user";
import {userCollection} from "../../db/mongo.db";
import {ObjectId, WithId} from "mongodb";
import {injectable} from "inversify";

@injectable()
export class UsersRepository {

    async findByLoginOrEmail(login: string, email?: string): Promise<WithId<User> | null> {
        const conditions = email
            ? [{ login }, { email }]
            : [{ login }, { email: login }]

        return userCollection.findOne({ $or: conditions })
    }

    async findByEmail(email: string): Promise<WithId<User> | null> {
        return userCollection.findOne({ email })
    }

    async findByLogin(login: string): Promise<WithId<User> | null> {
        return userCollection.findOne({ login })
    }

    async findByConfirmationCode(code: string): Promise<WithId<User> | null> {
        return await userCollection.findOne({"emailConfirmation.confirmationCode": code})
    }

    async updateConfirmation(userId: ObjectId): Promise<boolean> {
        const res = await userCollection.updateOne({_id: userId}, {$set: {"emailConfirmation.isConfirmed": true}})
        return res.modifiedCount === 1
    }

    async updateConfirmationCode(id: ObjectId, code: string, expirationDate: string): Promise<boolean> {
        const res = await userCollection.updateOne(
            { _id: id },
            { $set: {
                    'emailConfirmation.confirmationCode': code,
                    'emailConfirmation.expirationDate': expirationDate
                }}
        )
        return res.modifiedCount > 1
    }

    async create(user: User): Promise<ObjectId> {
        const createResult = await userCollection.insertOne(user)
        return createResult.insertedId
    }

    async delete(id: ObjectId): Promise<boolean> {
        const deletedResult = await userCollection.deleteOne({_id: id})
        return deletedResult.deletedCount >= 1;
    }

    async savePasswordRecoveryCode(userId: ObjectId, code: string, expirationDate: Date) {
        await userCollection.updateOne(
            {_id: userId},
            {$set: {'passwordRecovery.recoveryCode': code, 'passwordRecovery.expirationDate': expirationDate}}
        )
    }

    async findByRecoveryCode(code: string): Promise<WithId<User> | null> {
        return userCollection.findOne({'passwordRecovery.recoveryCode': code})
    }

    async updatePassword(userId: ObjectId, passHash: string) {
        await userCollection.updateOne(
            {_id: userId},
            {$set: {passHash}, $unset: {passwordRecovery: ''}}
        )
    }
}
