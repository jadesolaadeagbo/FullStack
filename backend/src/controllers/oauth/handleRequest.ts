import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";

export default async function handleRequest(req: Request, res: Response){
    try {
       res.header("Access-Control-Allow-Origin", "http://localhost:5173");
       res.header("Referral-Policy", "no-referral-when-downgrade");

       const redirectUrl = "http://localhost:8000/auth/google/callback";

       const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectUrl
       )

       const authoriseUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile  openid",
        prompt: "consent"
       });

       res.json({url: authoriseUrl})
        
    } catch (error) {
        console.error("Error in google oauth controller", error)
        res.status(500).json({
            status: "500",
            message: "Internal server error"
        })
    }

} 