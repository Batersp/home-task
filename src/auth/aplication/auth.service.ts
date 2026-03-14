import {LoginInputDto} from "../dto/login.input-dto";
import {authRepositories} from "../repositories/auth.repositories";
import bcrypt from "bcrypt";
import {WithId} from "mongodb";
import {User} from "../../users/types/user";

export const authService = {
    async login(dto: LoginInputDto): Promise<WithId<User> | null> {
        const {loginOrEmail, password} = dto
        const user = await authRepositories.findByLoginOrEmail(loginOrEmail);
        if (!user) {
            return null
        }
        const isPasswordValid = bcrypt.compareSync(password, user.passHash)
        return isPasswordValid ? user : null
    }
}
