import {User, UsersResponse} from "../types/user";
import {UsersQuery} from "../types/get-users-query";
import {userCollection} from "../../db/mongo.db";
import {ObjectId, WithId} from "mongodb";

export const usersRepository = {
    async findMany(query: UsersQuery): Promise<UsersResponse> {
        const {
            pageNumber,
            sortBy,
            sortDirection,
            pageSize,
            searchLoginTerm,
            searchEmailTerm
        } = query;

        const skip = (pageNumber - 1) * pageSize;
        const filter: any = {};
        const orConditions = [];

        if (searchLoginTerm) {
            orConditions.push({ login: { $regex: searchLoginTerm, $options: 'i' } });
        }

        if (searchEmailTerm) {
            orConditions.push({ email: { $regex: searchEmailTerm, $options: 'i' } });
        }

        if (orConditions.length > 0) {
            filter.$or = orConditions;
        }

        const items = await userCollection
            .find(filter)
            .sort({[sortBy]: sortDirection, 'createdAt': sortDirection || -1})
            .skip(skip)
            .limit(pageSize)
            .toArray();

        const totalCount = await userCollection.countDocuments(filter);

        return {items, totalCount, pageSize, page: pageNumber, pagesCount: Math.ceil(totalCount / pageSize)};
    },

    async findById(id: ObjectId): Promise<WithId<User> | null> {
        return userCollection.findOne({_id: id})
    },

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
