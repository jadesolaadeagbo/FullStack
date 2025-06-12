import { Request, Response } from 'express';
import { User } from '../../../models/user';
import { PasswordReset } from '../../../models/passwordReset';

export default async function verifyResetCode(req: Request, res: Response) {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        status: '404',
        message: 'User not found!',
      });
      return;
    }

    const resetRecord = await PasswordReset.findOne({
      userId: user._id,
      resetCode: code,
    });

    if (!resetRecord) {
      res.status(400).json({
        status: '400',
        message: 'Invalid reset code',
      });
      return;
    }

    if (resetRecord?.expiresAt < new Date()) {
      // await PasswordReset.deleteOne({ _id: resetRecord._id });
      res.status(400).json({
        status: '400',
        message: 'This verification code has expired! Kindly generate a new one.',
      });
      return;
    }

    res.status(200).json({
      status: '200',
      message: 'Reset code verified. You can now reset your password.',
    });
  } catch (error) {
    console.error('Error in verify-reset-code controller', error);

    res.status(500).json({
      status: '500',
      message: 'Internal server error',
    });
  }
}
