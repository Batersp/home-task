import {LoginInputDto} from "../dto/login.input-dto";
import {authRepositories} from "../repositories/auth.repositories";
import bcrypt from "bcrypt";

export const authService = {
    async login(dto: LoginInputDto): Promise<boolean> {
        const {loginOrEmail, password} = dto
        const user = await authRepositories.findByLoginOrEmail(loginOrEmail);
        if (!user) {
            return false
        }
        return bcrypt.compareSync(password, user.passHash)
    }
}
