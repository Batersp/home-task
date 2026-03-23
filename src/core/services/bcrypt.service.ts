import bcrypt from "bcrypt";

export const bcryptService = {
    createHash(value: string): string {
        return bcrypt.hashSync(value, 12);
    },

    compareSync(value1: string, value2: string): boolean {
        return bcrypt.compareSync(value1, value2);
    }

}
