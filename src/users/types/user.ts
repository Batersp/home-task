export type User = {
    login: string;
    email: string;
    createdAt: string;
    passHash: string;
    emailConfirmation?: {
        confirmationCode: string;
        expirationDate: Date;
        isConfirmed: boolean;
    }
}
