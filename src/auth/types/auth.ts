export type AuthResponse = {
    accessToken: string;
}

export type MeResponse = {
    email: string,
    login: string,
    userId: string
}

export type TokenBlackList = {
    token: string,
    userId: string
}

