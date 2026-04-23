import {nodemailerService} from "../services/nodemailer.service";

export const emailManagers = {
    async sendConfirmationCode(email: string, code: string): Promise<void> {
        const html = `<h1>Thank for your registration</h1>
    <p>To finish registration please follow the link below:
        <a href="https://somesite.com/confirm-email?code=${code}">complete registration</a>
    </p>`
        await nodemailerService.sendEmail(email, html, 'Confirmation code')
    },

    async sendPasswordRecovery(email: string, code: string) {
        const html = `
            <h1>Password recovery</h1>
            <p>To finish password recovery please follow the link below:
                <a href='https://somesite.com/password-recovery?recoveryCode=${code}'>recovery password</a>
            </p>
        `
        await nodemailerService.sendEmail(email, html, 'Password recovery')
    }
}
