import jwt, {SignOptions} from "jsonwebtoken";
import {AccessTokenInfoType, RefreshTokenInfoType} from "../types/tokens";

export const jwtService = {
    createAccessToken(data: AccessTokenInfoType & {expiresIn: SignOptions['expiresIn']}): string {
        const {userId, userLogin, expiresIn} = data
        return jwt.sign(
            {userId, userLogin},
            process.env.ACCESS_TOKEN_SECRET as string,
            {expiresIn});
    },

    createRefreshToken(data: RefreshTokenInfoType): string {
        const {userId, userLogin, deviceId} = data
        return jwt.sign({ userId, userLogin, deviceId }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '20s' })
    },

    verifyAccessToken(token: string): AccessTokenInfoType {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as AccessTokenInfoType
    },

    verifyRefreshToken(token: string): RefreshTokenInfoType {
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string) as RefreshTokenInfoType
    },

    getRefreshTokenInfo(token: string): RefreshTokenInfoType & {iat: number, exp: number} {
        return jwt.decode(token) as RefreshTokenInfoType & {iat: number, exp: number}
    }
}
