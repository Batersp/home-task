import {User, UsersResponse} from "../types/user";
import {usersRepository} from "../repositories/users.repository";
import {UsersQuery} from "../types/get-users-query";
import {ObjectId, WithId} from "mongodb";
import {UserInputDto} from "../dto/user.input-dto";
import bcrypt from "bcrypt";

export const usersService = {
    async findMany(query: UsersQuery): Promise<UsersResponse> {
        return usersRepository.findMany(query);
    },

    async findById(id: ObjectId): Promise<WithId<User> | null> {
        return usersRepository.findById(id)
    },

    async create(dto: UserInputDto): Promise<ObjectId | null> {
        const {login, password, email} = dto
        const existingUser = await usersRepository.findByLoginOrEmail(login, email)
        if (existingUser) {
            return null
        }

        const hash = bcrypt.hashSync(password, 12);
        const user: User = {
            login,
            email,
            createdAt: new Date().toISOString(),
            passHash: hash,
        }
        return usersRepository.create(user);
    },

    async delete(id: ObjectId): Promise<boolean> {
        return usersRepository.delete(id)
    }
}
