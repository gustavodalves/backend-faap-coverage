import nodemailer from 'nodemailer';
import { mailPassword, mailUsername } from '../env/config';

export async function sendMail({ message, name, email }: { message: string; name: string; email: string}) {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: mailUsername, // generated ethereal user
            pass: mailPassword, // generated ethereal password
        },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Faap Coverage" <gualves2001@hotmail.com>', // sender address
        to: 'gualves2001@icloud.com', // list of receivers
        subject: 'Nova mensagem', // Subject line
        text: message, // plain text body
        html: `<b>nova mensagem enviada de: ${name} email: ${email} - ${message}</b>`, // html body
    });
    console.log('Message sent: %s', info.messageId);
}
