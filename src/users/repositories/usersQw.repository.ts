import {UsersQuery} from "../types/get-users-query";
import {userCollection} from "../../db/mongo.db";
import {mapToUserViewModel} from "../routers/mappers/map-to-user-view-model.util";
import {ObjectId} from "mongodb";
import {UserViewModel} from "../types/user-view-model";
import {PaginatedResponse} from "../../core/types/paginatedResponse";

export const usersQwRepository = {
    async findMany(query: UsersQuery): Promise<PaginatedResponse<UserViewModel>> {
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

        return {items: items.map(mapToUserViewModel), totalCount, pageSize, page: pageNumber, pagesCount: Math.ceil(totalCount / pageSize)};
    },

    async findById(id: ObjectId): Promise<UserViewModel | null> {
        const user = await userCollection.findOne({_id: id})
        if(!user) return null;
        return mapToUserViewModel(user)
    },
}
