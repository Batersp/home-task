import jwt, {SignOptions} from "jsonwebtoken";

export const jwtService = {
    createJwtToken(userId: string, userLogin: string, expiresIn: SignOptions['expiresIn']): string {
        return jwt.sign(
            {userId, userLogin},
            process.env.SECRET as string,
            {expiresIn});
    },

    verify(token: string): { userId: string, userLogin: string } {
        return jwt.verify(token, process.env.SECRET as string) as { userId: string, userLogin: string }
    }
}
