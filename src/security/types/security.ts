export type Security = {
    userId: string;
    deviceId: string;
    iat: string;
    deviceName: string;
    ip: string;
    exp: string
}

export type UpdateSessionDataType = {
    iat: string,
    exp: string,
    ip: string,
}
