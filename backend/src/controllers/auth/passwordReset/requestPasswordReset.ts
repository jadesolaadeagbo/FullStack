import { Request, Response } from 'express';
import { User } from '../../../models/user';
import { PasswordReset } from '../../../models/passwordReset';
import nodemailer from 'nodemailer';

export default async function requestPasswordReset(req: Request, res: Response) {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        status: '404',
        message: 'User not found!',
      });
      return;
    }

    const existingResetCode = await PasswordReset.findOne({
      userId: user._id,
      expiresAt: { $gt: new Date() },
    });

    if (existingResetCode) {
      res.status(429).json({
        status: '429',
        message: 'A reset code has already been sent. Please try again later.',
      });

      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await PasswordReset.create({
      userId: user._id,
      resetCode: code,
      expiresAt,
      used: false,
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });

    const mailOptions = {
      from: `"FullStack" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Code',
      text: `Hi ${user.firstName},\n\nWe received a request to reset your password. Use the following code to proceed:\n\n${code}\n\nIf you did not request this, please ignore this message.\n\nThanks,\nThe FullStack Team`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      status: '200',
      message:
        'A password reset code has been sent to your email address. Please check your inbox. It will expire in 5 minutes',
    });
  } catch (error) {
    console.error('Error in request-password-reset controller', error);

    res.status(500).json({
      status: '500',
      message: 'Internal server error',
    });
  }
}
