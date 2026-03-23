import nodemailer from "nodemailer";

export const nodemailerService = {
    async sendEmail(to: string, html: string, subject: string): Promise<void> {
        try {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "ismukovppavelp@gmail.com",
                    pass: process.env.GOOGLE_APP_PASSWORD,
                },
            });

            await transporter.sendMail({
                from: "Pavel <ismukovppavelp@gmail.com>",
                to,
                subject,
                html
            })

        } catch(e) {
            throw e
        }
    }
}
