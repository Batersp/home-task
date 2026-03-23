import {User} from "../types/user";
import {usersRepository} from "../repositories/users.repository";
import {ObjectId} from "mongodb";
import {UserInputDto} from "../dto/user.input-dto";
import {bcryptService} from "../../core/services/bcrypt.service";

export const usersService = {

    async create(dto: UserInputDto): Promise<ObjectId | null> {
        const {login, password, email} = dto
        const existingUserByEmail = await usersRepository.findByEmail(email)
        const existingUserByLogin = await usersRepository.findByLogin(login)
        if (existingUserByEmail || existingUserByLogin) {
            return null
        }

        const hash = bcryptService.createHash(password);
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
