import {User} from "../types/user";
import {ObjectId, WithId} from "mongodb";
import {injectable} from "inversify";
import {UserDocument, UserModel} from "../domain/user.entity";

@injectable()
export class UsersRepository {

    async findByLoginOrEmail(login: string, email?: string) {
        const conditions = email
            ? [{ login }, { email }]
            : [{ login }, { email: login }]

        return UserModel.findOne({ $or: conditions })
    }

    async findByEmail(email: string) {
        return UserModel.findOne({ email })
    }

    async findByLogin(login: string): Promise<WithId<User> | null> {
        return UserModel.findOne({ login }).lean()
    }

    async findByConfirmationCode(code: string) {
        return await UserModel.findOne({"emailConfirmation.confirmationCode": code})
    }

    async save(user: UserDocument): Promise<ObjectId> {
        const saved = await user.save()
        return saved._id
    }

    async delete(id: ObjectId): Promise<boolean> {
        const deletedResult = await UserModel.deleteOne({_id: id})
        return deletedResult.deletedCount >= 1;
    }

    async findByRecoveryCode(code: string) {
        return UserModel.findOne({'passwordRecovery.recoveryCode': code})
    }
}
