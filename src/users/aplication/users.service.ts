import {UsersRepository} from "../repositories/users.repository";
import {ObjectId} from "mongodb";
import {UserInputDto} from "../dto/user.input-dto";
import {bcryptService} from "../../core/services/bcrypt.service";
import {UserViewModel} from "../types/user-view-model";
import {UsersQwRepository} from "../repositories/usersQw.repository";
import {inject, injectable} from "inversify";
import {UserModel} from "../domain/user.entity";

@injectable()
export class UsersService {

    constructor(
        @inject(UsersRepository) private usersRepository: UsersRepository,
        @inject(UsersQwRepository) private usersQwRepository: UsersQwRepository
    ) {}

    async create(dto: UserInputDto): Promise<UserViewModel | null> {
        const {login, password, email} = dto
        const existingUserByEmail = await this.usersRepository.findByEmail(email)
        const existingUserByLogin = await this.usersRepository.findByLogin(login)
        if (existingUserByEmail || existingUserByLogin) {
            return null
        }

        const hash = bcryptService.createHash(password);
        const user = UserModel.createUser({
            login,
            email,
            createdAt: new Date().toISOString(),
            passHash: hash,
        })
        const createdUserId = await this.usersRepository.save(user);
        return await this.usersQwRepository.findById(createdUserId)
    }

    async delete(id: ObjectId): Promise<boolean> {
        return this.usersRepository.delete(id)
    }
}
