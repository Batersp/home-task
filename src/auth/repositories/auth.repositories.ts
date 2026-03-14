import {User} from "../../users/types/user";
import {WithId} from "mongodb";
import {userCollection} from "../../db/mongo.db";

export const authRepositories = {
    async findByLoginOrEmail(loginOrEmail: string):  Promise<WithId<User> | null> {
        return userCollection.findOne({
            $or: [
                { login: loginOrEmail },
                { email: loginOrEmail }
            ]
        })
    }
}
