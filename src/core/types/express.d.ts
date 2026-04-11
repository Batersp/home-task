export declare global {
    namespace Express {
        interface Request {
            user?: { userId: string, userLogin: string, deviceId?: string };
        }
    }
}
