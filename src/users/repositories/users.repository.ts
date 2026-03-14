import {User} from "../types/user";
import {userCollection} from "../../db/mongo.db";
import {ObjectId, WithId} from "mongodb";

export const usersRepository = {

    async findByLoginOrEmail(login: string, email: string): Promise<WithId<User> | null> {
        return userCollection.findOne({
            $or: [{ login }, { email }]
        })
    },

    async create(user: User): Promise<ObjectId> {
        const createResult = await userCollection.insertOne(user)
        return createResult.insertedId
    },

    async delete(id: ObjectId): Promise<boolean> {
        const deletedResult = await userCollection.deleteOne({_id: id})
        return deletedResult.deletedCount >= 1;
    }
}
