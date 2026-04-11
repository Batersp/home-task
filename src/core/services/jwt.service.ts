import jwt, {SignOptions} from "jsonwebtoken";

export const jwtService = {
    createAccessToken(userId: string, userLogin: string, expiresIn: SignOptions['expiresIn']): string {
        return jwt.sign(
            {userId, userLogin},
            process.env.ACCESS_TOKEN_SECRET as string,
            {expiresIn});
    },

    createRefreshToken(userId: string, userLogin: string): string {
        return jwt.sign({ userId, userLogin }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '20s' })
    },

    verifyAccessToken(token: string): { userId: string, userLogin: string } {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as { userId: string, userLogin: string }
    },

    verifyRefreshToken(token: string): { userId: string, userLogin: string } {
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string) as { userId: string, userLogin: string }
    },
}
