import { Request, Response } from 'express';

export default async function (req: Request, res: Response) {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).json({
          status: '500',
          message: 'Failed to log out',
        });
      }

      res.clearCookie('sessionId', {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });

      res.status(200).json({
        status: '200',
        message: 'Logout successful',
      });
    });
  } catch (error) {
    console.error('Error in logout controller', error);
    res.status(500).json({
      status: '500',
      message: 'Internal server error',
    });
  }
}
