import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import fetch from 'node-fetch';
import { GoogleUser } from '../../types/googleuser';
import { User } from '../../models/user';

async function getUserDetails(access_token: string): Promise<GoogleUser> {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );
  const data = await response.json();
  return data as GoogleUser;
}

export default async function googleOauthCallback(req: Request, res: Response) {
  const code = req.query.code as string;

  try {
    const redirectUrl = process.env.REDIRECT_URL!;

    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );
    const tokenResponse = await oAuth2Client.getToken(code);

    await oAuth2Client.setCredentials(tokenResponse.tokens);

    const googleUser = await getUserDetails(oAuth2Client.credentials.access_token as string);

    const { email, name } = googleUser;

    const fullName = name || '';
    const nameParts = fullName.trim().split(' ');

    const firstName = nameParts[0] || '';
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';

    if (!email) {
      res.status(400).json({
        status: '400',
        message: 'Google account does not have an email',
      });
      return;
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        firstName,
        lastName,
        email,
        googleAuth: true,
      });
    }

    //@ts-ignore
    req.session.userId = user._id.toString();

    const frontendRedirect = process.env.FRONTEND_REDIRECT!;

    res.redirect(frontendRedirect);
  } catch (error) {
    console.error('Error in google oauth response controller', error);
    res.status(500).json({
      status: '500',
      message: 'Internal server error',
    });
  }
}
