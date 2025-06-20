import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { IUser, User } from '../../models/user';

export default async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        status: '400', 
        message: 'Both email and password are required!',
      });
      return;
    }

    const user = (await User.findOne({ email })) as IUser;

    if (!user) {
      res.status(400).json({
        status: '404',
        message: 'User not found',
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(400).json({
        status: '400',
        message: 'Incorrect login details!',
      });
      return;
    }

    //@ts-ignore
    req.session.userId = user._id.toString();

    // @ts-ignore
    req.session.userRole = user.role;

    res.status(200).json({
      status: '200',
      message: 'Login Successful',
      data: {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role
      },
    });
  } catch (error) {
    console.error('Error in login controller', error);
    res.status(500).json({
      status: '500',
      message: 'Internal server error',
    });
  }
}
