import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // using Gmail
      auth: {
        user: 'talhasifat321@gmail.com', // your Gmail address
        pass: 'uryi amtw gsnx zpss', // App password if 2FA is enabled
      },
    });
  }

  async sendRegistrationEmail(to: string, username: string) {
    const mailOptions = {
      from: '"Event Buddy" <talhasifat321@gmail.com>', // Sender info
      to: to, // Recipient doctor’s email
      subject: 'Registration Successful',
      text: `Dear ${username},

Welcome to the Event Buddy! Your registration has been successfully completed.

You can now log in and start using our services.

If you have any questions, feel free to reach out.

Best regards,
The Event buddy Team`,
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log('Registration email sent:', result.response);
      return result;
    } catch (error) {
      console.error('Error sending registration email:', error);
      throw new Error('Failed to send registration email');
    }
  }
}
